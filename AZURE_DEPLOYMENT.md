# 🚀 Azure VM Deployment Guide

## 📋 Prerequisites

Before deploying, make sure you have:
- ✅ Azure VM running (Linux/Windows)
- ✅ SSH access to your VM
- ✅ Port access (we'll use different ports to avoid conflicts)
- ✅ Your VM's public IP address

---

## 🎯 Deployment Strategy

Since you already have a backend running on your VM, we'll:
1. Use **different ports** (e.g., 8001 for backend, 5174 for frontend)
2. Keep your existing backend running
3. Deploy this project alongside it

---

## 🔧 Step 1: Prepare Your VM

### **Option A: Linux VM (Ubuntu/Debian)**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python 3 and pip (if not installed)
sudo apt install python3 python3-pip python3-venv -y

# Install Node.js and npm (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
python3 --version
node --version
npm --version
```

### **Option B: Windows VM**

1. Install Python from: https://www.python.org/downloads/
2. Install Node.js from: https://nodejs.org/
3. Open PowerShell as Administrator

---

## 📁 Step 2: Upload Project to VM

### **Method 1: Using SCP (Linux/Mac)**

```bash
# From your local machine
scp -r "D:\University\Level - 4\Semester - 1\Deep Learning\Task\neural_network_project" username@your-vm-ip:/home/username/
```

### **Method 2: Using Git (Recommended)**

```bash
# On your VM
cd ~
git clone <your-repo-url>
# OR manually upload via FileZilla/WinSCP
```

### **Method 3: Manual Upload**
- Use FileZilla, WinSCP, or Azure Portal file upload
- Upload the entire `neural_network_project` folder

---

## ⚙️ Step 3: Configure Different Ports

### **Update Backend Port (Port 8001 instead of 8000)**

Edit `backend/main.py`:

```python
# At the bottom of main.py, change:
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed from 8000 to 8001
```

### **Update Frontend to Use New Backend Port**

Edit `frontend/src/App.jsx`:

```javascript
// Change line 9:
const API_URL = 'http://your-vm-ip:8001'  // Use your actual VM IP
```

### **Update Frontend Port (Port 5174 instead of 5173)**

Edit `frontend/package.json`:

```json
{
  "scripts": {
    "dev": "vite --port 5174 --host 0.0.0.0",
    "build": "vite build",
    "preview": "vite preview --port 5174 --host 0.0.0.0"
  }
}
```

---

## 🔐 Step 4: Configure Azure VM Firewall

### **Open Required Ports in Azure:**

1. Go to **Azure Portal**
2. Navigate to your **Virtual Machine**
3. Click **Networking** → **Add inbound port rule**

Add these rules:

**Backend Port:**
- **Port**: 8001
- **Protocol**: TCP
- **Priority**: 1001
- **Name**: Backend-8001

**Frontend Port:**
- **Port**: 5174
- **Protocol**: TCP
- **Priority**: 1002
- **Name**: Frontend-5174

---

## 📦 Step 5: Install Dependencies on VM

### **SSH into your VM:**

```bash
ssh username@your-vm-ip
```

### **Navigate to project:**

```bash
cd ~/neural_network_project
```

### **Backend Dependencies:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```

### **Frontend Dependencies:**

```bash
cd frontend
npm install --include=dev
cd ..
```

---

## 🚀 Step 6: Run Backend (Production)

### **Option 1: Using Screen (Keeps running after logout)**

```bash
# Install screen
sudo apt install screen -y  # Linux
# On Windows, use Task Scheduler instead

# Start screen session
screen -S neural-backend

# Navigate and run
cd ~/neural_network_project/backend
source venv/bin/activate
python main.py

# Detach: Press Ctrl+A then D
# Reattach later: screen -r neural-backend
```

### **Option 2: Using nohup**

```bash
cd ~/neural_network_project/backend
source venv/bin/activate
nohup python main.py > backend.log 2>&1 &
```

### **Option 3: Using systemd (Best for Linux)**

Create service file:

```bash
sudo nano /etc/systemd/system/neural-backend.service
```

Paste this:

```ini
[Unit]
Description=Neural Network Backend
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/neural_network_project/backend
Environment="PATH=/home/your-username/neural_network_project/backend/venv/bin"
ExecStart=/home/your-username/neural_network_project/backend/venv/bin/python main.py
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable neural-backend
sudo systemctl start neural-backend
sudo systemctl status neural-backend
```

---

## 🌐 Step 7: Run Frontend (Production)

### **Option 1: Development Mode (Quick Test)**

```bash
screen -S neural-frontend
cd ~/neural_network_project/frontend
npm run dev

# Detach: Ctrl+A then D
```

### **Option 2: Build and Serve (Production)**

```bash
cd ~/neural_network_project/frontend

# Build for production
npm run build

# Install serve globally
sudo npm install -g serve

# Serve the built files
screen -S neural-frontend
serve -s dist -l 5174

# Or use nginx (recommended)
```

### **Option 3: Using Nginx (Best Practice)**

```bash
# Install nginx
sudo apt install nginx -y

# Build frontend
cd ~/neural_network_project/frontend
npm run build

# Copy built files
sudo cp -r dist/* /var/www/neural-network/

# Create nginx config
sudo nano /etc/nginx/sites-available/neural-network
```

Paste this:

```nginx
server {
    listen 5174;
    server_name your-vm-ip;

    root /var/www/neural-network;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:

```bash
sudo ln -s /etc/nginx/sites-available/neural-network /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔍 Step 8: Verify Deployment

### **Test Backend:**

```bash
curl http://your-vm-ip:8001
# Should return: {"message":"Neural Network Classifier API"}
```

### **Test Frontend:**

Open browser:
```
http://your-vm-ip:5174
```

---

## 🌐 Step 9: Domain Setup (Optional)

If you have a domain:

1. **Add DNS A Record:**
   - Point `neural.yourdomain.com` to your VM IP

2. **Update Frontend API URL:**
   ```javascript
   const API_URL = 'http://neural.yourdomain.com:8001'
   ```

3. **Update CORS in Backend:**
   ```python
   allow_origins=["http://neural.yourdomain.com:5174"]
   ```

---

## 🔒 Step 10: SSL/HTTPS (Optional but Recommended)

### **Using Let's Encrypt:**

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d neural.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 🛠️ Troubleshooting

### **Backend not starting:**

```bash
# Check logs
cd ~/neural_network_project/backend
tail -f backend.log

# Check if port is in use
sudo netstat -tulpn | grep 8001
```

### **Frontend not accessible:**

```bash
# Check if port is open
sudo netstat -tulpn | grep 5174

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

### **CORS errors:**

Update `backend/main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://your-vm-ip:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 Monitoring

### **Check Backend Status:**

```bash
# If using systemd
sudo systemctl status neural-backend

# If using screen
screen -r neural-backend

# Check logs
tail -f ~/neural_network_project/backend/backend.log
```

### **Check Frontend Status:**

```bash
# If using nginx
sudo systemctl status nginx

# If using screen
screen -r neural-frontend
```

---

## 🔄 Updating the Application

```bash
# Pull latest changes
cd ~/neural_network_project
git pull

# Restart backend
sudo systemctl restart neural-backend

# Rebuild frontend
cd frontend
npm run build
sudo cp -r dist/* /var/www/neural-network/
```

---

## 📝 Quick Start Commands

### **Start Everything:**

```bash
# Backend
sudo systemctl start neural-backend

# Frontend (if using nginx)
sudo systemctl start nginx

# Or if using screen:
screen -S neural-backend
cd ~/neural_network_project/backend && source venv/bin/activate && python main.py

# New terminal/screen
screen -S neural-frontend
cd ~/neural_network_project/frontend && npm run dev
```

### **Stop Everything:**

```bash
# Backend
sudo systemctl stop neural-backend

# Frontend
sudo systemctl stop nginx

# Or if using screen:
screen -X -S neural-backend quit
screen -X -S neural-frontend quit
```

---

## 🎯 Access Your App

- **Frontend**: `http://your-vm-ip:5174`
- **Backend API**: `http://your-vm-ip:8001`
- **API Docs**: `http://your-vm-ip:8001/docs`

---

## ✅ Checklist

- [ ] VM ports 8001 and 5174 opened in Azure
- [ ] Python and Node.js installed
- [ ] Dependencies installed
- [ ] Ports changed in code (8001, 5174)
- [ ] Backend running on port 8001
- [ ] Frontend running on port 5174
- [ ] Can access frontend in browser
- [ ] Backend API responds
- [ ] Training works correctly

---

## 📞 Need Help?

Tell me:
1. Your VM OS (Linux/Windows)
2. Any error messages
3. What step you're stuck on

I'll help you deploy! 🚀
