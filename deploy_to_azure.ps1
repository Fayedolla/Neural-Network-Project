# Azure VM Deployment Script for Neural Network Classifier (PowerShell)
# Run as: .\deploy_to_azure.ps1

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Neural Network Classifier - Azure Deploy" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$VM_IP = Read-Host "Enter VM IP address"
$VM_USER = Read-Host "Enter SSH username"
$BACKEND_PORT = Read-Host "Backend port (default 8001, press Enter for default)"
if ([string]::IsNullOrWhiteSpace($BACKEND_PORT)) { $BACKEND_PORT = "8001" }
$FRONTEND_PORT = Read-Host "Frontend port (default 5174, press Enter for default)"
if ([string]::IsNullOrWhiteSpace($FRONTEND_PORT)) { $FRONTEND_PORT = "5174" }

Write-Host ""
Write-Host "Deployment Configuration:" -ForegroundColor Yellow
Write-Host "VM IP: $VM_IP"
Write-Host "User: $VM_USER"
Write-Host "Backend Port: $BACKEND_PORT"
Write-Host "Frontend Port: $FRONTEND_PORT"
Write-Host ""

$CONFIRM = Read-Host "Continue with deployment? (y/n)"
if ($CONFIRM -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Manual Deployment Steps:" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Update Backend Port" -ForegroundColor Cyan
Write-Host "Edit backend\main.py and change port to $BACKEND_PORT" -ForegroundColor Yellow
Write-Host "Line to change: uvicorn.run(app, host='0.0.0.0', port=$BACKEND_PORT)" -ForegroundColor Gray
Write-Host ""

Write-Host "Step 2: Update Frontend API URL" -ForegroundColor Cyan
Write-Host "Edit frontend\src\App.jsx" -ForegroundColor Yellow
Write-Host "Change: const API_URL = 'http://${VM_IP}:${BACKEND_PORT}'" -ForegroundColor Gray
Write-Host ""

Write-Host "Step 3: Update Frontend Port" -ForegroundColor Cyan
Write-Host "Edit frontend\package.json" -ForegroundColor Yellow
Write-Host "Change dev script to: 'vite --port $FRONTEND_PORT --host 0.0.0.0'" -ForegroundColor Gray
Write-Host ""

Write-Host "Step 4: Upload to VM using FileZilla/WinSCP" -ForegroundColor Cyan
Write-Host "Upload entire project folder to: /home/$VM_USER/neural_network_project" -ForegroundColor Yellow
Write-Host ""

Write-Host "Step 5: SSH into VM and run:" -ForegroundColor Cyan
Write-Host @"
# Install dependencies
cd ~/neural_network_project/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

cd ~/neural_network_project/frontend
npm install --include=dev

# Start backend (in screen)
screen -S neural-backend
cd ~/neural_network_project/backend
source venv/bin/activate
python main.py
# Press Ctrl+A then D to detach

# Start frontend (in new screen)
screen -S neural-frontend
cd ~/neural_network_project/frontend
npm run dev
# Press Ctrl+A then D to detach
"@ -ForegroundColor Gray

Write-Host ""
Write-Host "Step 6: Open Ports in Azure Portal" -ForegroundColor Cyan
Write-Host "1. Go to your VM in Azure Portal" -ForegroundColor Yellow
Write-Host "2. Click 'Networking' -> 'Add inbound port rule'" -ForegroundColor Yellow
Write-Host "3. Add rule for port $BACKEND_PORT (Backend)" -ForegroundColor Yellow
Write-Host "4. Add rule for port $FRONTEND_PORT (Frontend)" -ForegroundColor Yellow
Write-Host ""

Write-Host "=========================================" -ForegroundColor Green
Write-Host "After deployment, access at:" -ForegroundColor Green
Write-Host "Frontend: http://${VM_IP}:${FRONTEND_PORT}" -ForegroundColor Cyan
Write-Host "Backend: http://${VM_IP}:${BACKEND_PORT}" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Need automatic deployment? Use WinSCP or install WSL and use the .sh script" -ForegroundColor Yellow
