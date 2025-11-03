# 🚀 GitHub to Azure VM Deployment Guide

Perfect! Using GitHub is the best way to deploy. Here's the complete guide.

---

## 📋 Part 1: Push to GitHub

### **Step 1: Initialize Git Repository**

Open PowerShell in your project folder:

```powershell
cd "D:\University\Level - 4\Semester - 1\Deep Learning\Task\neural_network_project"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Neural Network Classifier"
```

### **Step 2: Create GitHub Repository**

1. Go to **https://github.com**
2. Click **"New repository"** (green button)
3. Repository name: `neural-network-classifier`
4. Description: `Perceptron & Adaline Neural Network Classifier`
5. Choose: **Public** or **Private**
6. **DON'T** initialize with README (we already have files)
7. Click **"Create repository"**

### **Step 3: Push to GitHub**

```powershell
# Link to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/neural-network-classifier.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Enter your GitHub username and password (or token) when prompted.**

---

## 📁 Part 2: Configure for Azure VM

Before deploying, we need to update some settings for production.

### **Update Backend Port**

Edit `backend/main.py` - change the last line:

```python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)  # Changed from 8000 to 8001
```

### **Update Frontend API URL**

Create a new file `frontend/.env.production`:

```bash
VITE_API_URL=http://YOUR_VM_IP:8001
```

Then update `frontend/src/App.jsx`:

```javascript
// Change line 9:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
```

### **Commit and Push Changes**

```powershell
git add .
git commit -m "Configure for Azure VM deployment"
git push
```

---

## 🔧 Part 3: Deploy to Azure VM

### **Step 1: SSH into Your VM**

```bash
ssh your-username@your-vm-ip
```

### **Step 2: Install Prerequisites (if not installed)**

**For Ubuntu/Debian:**

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install -y python3 python3-pip python3-venv

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install screen (to keep processes running)
sudo apt install -y screen

# Install git (if not installed)
sudo apt install -y git

# Verify installations
python3 --version
node --version
npm --version
git --version
```

### **Step 3: Clone Your Repository**

```bash
# Navigate to home directory
cd ~

# Clone your repo (replace YOUR_USERNAME)
git clone https://github.com/YOUR_USERNAME/neural-network-classifier.git

# Rename folder
mv neural-network-classifier neural_network_project

# Navigate to project
cd neural_network_project
```

### **Step 4: Setup Backend**

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Test backend
python main.py
# Press Ctrl+C to stop

# Deactivate virtual environment
deactivate

# Go back to project root
cd ..
```

### **Step 5: Setup Frontend**

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install --include=dev

# Update .env.production with your VM IP
echo "VITE_API_URL=http://$(curl -s ifconfig.me):8001" > .env.production

# Test frontend
npm run dev
# Press Ctrl+C to stop

# Go back to project root
cd ..
```

---

## 🚀 Part 4: Open Azure Firewall Ports

### **In Azure Portal:**

1. Go to **Azure Portal** (https://portal.azure.com)
2. Navigate to **Virtual Machines**
3. Click on **your VM**
4. Click **Networking** (left menu)
5. Click **Add inbound port rule**

**Add Backend Port (8001):**
- **Source**: Any
- **Source port ranges**: *
- **Destination**: Any
- **Service**: Custom
- **Destination port ranges**: 8001
- **Protocol**: TCP
- **Action**: Allow
- **Priority**: 1001
- **Name**: Backend-8001
- Click **Add**

**Add Frontend Port (5174):**
- **Source**: Any
- **Source port ranges**: *
- **Destination**: Any
- **Service**: Custom
- **Destination port ranges**: 5174
- **Protocol**: TCP
- **Action**: Allow
- **Priority**: 1002
- **Name**: Frontend-5174
- Click **Add**

---

## 🎯 Part 5: Run the Application

### **Method 1: Using Screen (Recommended)**

**Start Backend:**

```bash
# SSH into your VM
ssh your-username@your-vm-ip

# Start screen session for backend
screen -S neural-backend

# Navigate and start backend
cd ~/neural_network_project/backend
source venv/bin/activate
python main.py

# Detach from screen: Press Ctrl+A then D
```

**Start Frontend:**

```bash
# Start screen session for frontend
screen -S neural-frontend

# Navigate and start frontend
cd ~/neural_network_project/frontend
npm run dev

# Detach from screen: Press Ctrl+A then D
```

**Check Running Screens:**

```bash
screen -ls
```

**Reattach to Screens:**

```bash
# Reattach to backend
screen -r neural-backend

# Reattach to frontend
screen -r neural-frontend
```

---

### **Method 2: Using systemd (Production - Recommended)**

**Create Backend Service:**

```bash
sudo nano /etc/systemd/system/neural-backend.service
```

Paste this (replace `your-username`):

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
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Enable and Start Backend:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable neural-backend
sudo systemctl start neural-backend
sudo systemctl status neural-backend
```

**Build and Serve Frontend (Production):**

```bash
# Build frontend
cd ~/neural_network_project/frontend
npm run build

# Install serve
sudo npm install -g serve

# Create frontend service
sudo nano /etc/systemd/system/neural-frontend.service
```

Paste this (replace `your-username`):

```ini
[Unit]
Description=Neural Network Frontend
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/neural_network_project/frontend
ExecStart=/usr/bin/serve -s dist -l 5174
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Enable and Start Frontend:**

```bash
sudo systemctl daemon-reload
sudo systemctl enable neural-frontend
sudo systemctl start neural-frontend
sudo systemctl status neural-frontend
```

---

## 🌐 Part 6: Access Your Application

Get your VM's public IP:

```bash
curl ifconfig.me
```

Access your application:

- **Frontend**: `http://YOUR_VM_IP:5174`
- **Backend API**: `http://YOUR_VM_IP:8001`
- **API Docs**: `http://YOUR_VM_IP:8001/docs`

---

## 🔄 Part 7: Update Your Application

When you make changes locally:

```bash
# Commit changes locally
git add .
git commit -m "Update feature"
git push

# SSH into VM
ssh your-username@your-vm-ip

# Pull updates
cd ~/neural_network_project
git pull

# Restart backend
sudo systemctl restart neural-backend

# Rebuild and restart frontend
cd frontend
npm run build
sudo systemctl restart neural-frontend
```

---

## 🛠️ Useful Commands

### **Check Status:**

```bash
# Backend status
sudo systemctl status neural-backend

# Frontend status
sudo systemctl status neural-frontend

# View backend logs
sudo journalctl -u neural-backend -f

# View frontend logs
sudo journalctl -u neural-frontend -f
```

### **Stop Services:**

```bash
sudo systemctl stop neural-backend
sudo systemctl stop neural-frontend
```

### **Restart Services:**

```bash
sudo systemctl restart neural-backend
sudo systemctl restart neural-frontend
```

### **Check Ports:**

```bash
# Check if ports are listening
sudo netstat -tulpn | grep 8001
sudo netstat -tulpn | grep 5174
```

---

## 📊 Monitoring

### **Check Backend Health:**

```bash
curl http://localhost:8001
# Should return: {"message":"Neural Network Classifier API"}
```

### **Check Frontend:**

```bash
curl http://localhost:5174
# Should return HTML content
```

---

## 🔒 Security Tips (Optional)

### **1. Use Environment Variables for Secrets**

Create `.env` file (don't commit to git):

```bash
cd ~/neural_network_project
nano .env
```

### **2. Setup Firewall (UFW)**

```bash
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 8001/tcp    # Backend
sudo ufw allow 5174/tcp    # Frontend
sudo ufw enable
```

### **3. Use HTTPS (with Let's Encrypt)**

See `AZURE_DEPLOYMENT.md` for SSL setup instructions.

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Repository cloned to VM
- [ ] Python and Node.js installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Azure firewall ports opened (8001, 5174)
- [ ] Backend service running
- [ ] Frontend service running
- [ ] Can access frontend in browser
- [ ] Can access backend API
- [ ] Training and testing works

---

## 🎉 Success!

Your Neural Network Classifier is now deployed on Azure VM!

- Users can access it from anywhere
- Runs 24/7
- Auto-restarts on failure
- Easy to update via git

---

## 📞 Troubleshooting

### **Problem: Can't access from browser**

```bash
# Check if services are running
sudo systemctl status neural-backend
sudo systemctl status neural-frontend

# Check firewall
sudo ufw status

# Check Azure Network Security Group
# Make sure ports 8001 and 5174 are open
```

### **Problem: Backend not starting**

```bash
# Check logs
sudo journalctl -u neural-backend -n 50

# Check Python version
python3 --version

# Reinstall dependencies
cd ~/neural_network_project/backend
source venv/bin/activate
pip install -r requirements.txt
```

### **Problem: Frontend not building**

```bash
# Check Node version
node --version  # Should be 16+

# Clear cache and reinstall
cd ~/neural_network_project/frontend
rm -rf node_modules package-lock.json
npm install --include=dev
npm run build
```

---

## 🚀 Next Steps

- Add custom domain
- Setup SSL/HTTPS
- Configure CI/CD with GitHub Actions
- Add monitoring with PM2 or supervisor
- Setup database if needed

---

**Need help? Let me know what step you're on!** 💪
