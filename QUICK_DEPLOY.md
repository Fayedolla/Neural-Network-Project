# ⚡ Quick Deploy to Azure VM

## 🚀 Super Fast Deployment (5 Steps)

### **Step 1: Push to GitHub** (On Your Local Machine)

```bash
cd "D:\University\Level - 4\Semester - 1\Deep Learning\Task\neural_network_project"

git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/neural-network-classifier.git
git push -u origin main
```

---

### **Step 2: SSH into Your Azure VM**

```bash
ssh your-username@your-vm-ip
```

---

### **Step 3: Run One-Line Setup** (On VM)

```bash
# Clone and setup everything
git clone https://github.com/YOUR_USERNAME/neural-network-classifier.git ~/neural_network_project && \
cd ~/neural_network_project && \
sudo apt update && sudo apt install -y python3 python3-pip python3-venv nodejs npm screen && \
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && deactivate && cd .. && \
cd frontend && npm install --include=dev && cd ..
```

---

### **Step 4: Open Ports in Azure Portal**

1. Azure Portal → Your VM → **Networking**
2. Add inbound rule: Port **8001** (Backend)
3. Add inbound rule: Port **5174** (Frontend)

---

### **Step 5: Start Servers** (On VM)

```bash
# Start backend
screen -dmS neural-backend bash -c "cd ~/neural_network_project/backend && source venv/bin/activate && python main.py"

# Start frontend
screen -dmS neural-frontend bash -c "cd ~/neural_network_project/frontend && npm run dev"

# Check if running
screen -ls
```

---

## 🌐 **Access Your App:**

```
http://YOUR_VM_IP:5174
```

---

## 🛑 **Stop Servers:**

```bash
screen -X -S neural-backend quit
screen -X -S neural-frontend quit
```

---

## 🔄 **Update Your App:**

```bash
# On VM
cd ~/neural_network_project
git pull
screen -X -S neural-backend quit
screen -X -S neural-frontend quit
screen -dmS neural-backend bash -c "cd ~/neural_network_project/backend && source venv/bin/activate && python main.py"
screen -dmS neural-frontend bash -c "cd ~/neural_network_project/frontend && npm run dev"
```

---

## 📋 **Useful Commands:**

```bash
# Check running screens
screen -ls

# Attach to backend screen
screen -r neural-backend

# Attach to frontend screen
screen -r neural-frontend

# Detach from screen
# Press: Ctrl+A then D

# Check if ports are open
sudo netstat -tulpn | grep 8001
sudo netstat -tulpn | grep 5174

# Test backend
curl http://localhost:8001

# Get your VM IP
curl ifconfig.me
```

---

## ✅ **That's it!**

Your app is now running on Azure VM at:
- **Frontend**: `http://YOUR_VM_IP:5174`
- **Backend**: `http://YOUR_VM_IP:8001`

---

## 📖 **Need More Details?**

Check `GITHUB_DEPLOYMENT.md` for complete guide with:
- Production setup with systemd
- SSL/HTTPS configuration
- Monitoring and logging
- Troubleshooting tips

---

**Happy Deploying! 🎉**
