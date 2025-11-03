#!/bin/bash

# Azure VM Deployment Script for Neural Network Classifier
# Make executable: chmod +x deploy_to_azure.sh

echo "========================================="
echo "Neural Network Classifier - Azure Deploy"
echo "========================================="
echo ""

# Configuration
read -p "Enter VM IP address: " VM_IP
read -p "Enter SSH username: " VM_USER
read -p "Backend port (default 8001): " BACKEND_PORT
BACKEND_PORT=${BACKEND_PORT:-8001}
read -p "Frontend port (default 5174): " FRONTEND_PORT
FRONTEND_PORT=${FRONTEND_PORT:-5174}

echo ""
echo "Deployment Configuration:"
echo "VM IP: $VM_IP"
echo "User: $VM_USER"
echo "Backend Port: $BACKEND_PORT"
echo "Frontend Port: $FRONTEND_PORT"
echo ""

read -p "Continue with deployment? (y/n): " CONFIRM
if [ "$CONFIRM" != "y" ]; then
    echo "Deployment cancelled."
    exit 0
fi

# Create deployment package
echo ""
echo "Step 1: Creating deployment package..."
PROJECT_DIR=$(pwd)
DEPLOY_DIR="/tmp/neural_deploy"
mkdir -p $DEPLOY_DIR

# Copy backend files
echo "Copying backend files..."
cp -r backend $DEPLOY_DIR/
cp birds.csv $DEPLOY_DIR/backend/
cp perceptron.py $DEPLOY_DIR/backend/
cp adaline.py $DEPLOY_DIR/backend/

# Copy frontend files
echo "Copying frontend files..."
cp -r frontend $DEPLOY_DIR/

# Update backend port
echo ""
echo "Step 2: Updating backend port to $BACKEND_PORT..."
sed -i "s/port=8000/port=$BACKEND_PORT/g" $DEPLOY_DIR/backend/main.py

# Update frontend API URL
echo "Step 3: Updating frontend API URL..."
sed -i "s|http://localhost:8000|http://$VM_IP:$BACKEND_PORT|g" $DEPLOY_DIR/frontend/src/App.jsx

# Update frontend port in package.json
echo "Step 4: Updating frontend port to $FRONTEND_PORT..."
sed -i "s|\"dev\": \"vite\"|\"dev\": \"vite --port $FRONTEND_PORT --host 0.0.0.0\"|g" $DEPLOY_DIR/frontend/package.json

# Create remote setup script
echo ""
echo "Step 5: Creating remote setup script..."
cat > $DEPLOY_DIR/setup_vm.sh << 'EOFSETUP'
#!/bin/bash

echo "Setting up Neural Network Classifier on VM..."

# Install system dependencies
echo "Installing system dependencies..."
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm screen

# Setup backend
echo "Setting up backend..."
cd ~/neural_network_project/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Setup frontend
echo "Setting up frontend..."
cd ~/neural_network_project/frontend
npm install --include=dev

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: cd ~/neural_network_project/backend && source venv/bin/activate && python main.py"
echo "2. Frontend: cd ~/neural_network_project/frontend && npm run dev"
EOFSETUP

chmod +x $DEPLOY_DIR/setup_vm.sh

# Upload to VM
echo ""
echo "Step 6: Uploading files to VM..."
ssh $VM_USER@$VM_IP "mkdir -p ~/neural_network_project"
scp -r $DEPLOY_DIR/* $VM_USER@$VM_IP:~/neural_network_project/

# Run setup on VM
echo ""
echo "Step 7: Running setup on VM..."
ssh $VM_USER@$VM_IP "bash ~/neural_network_project/setup_vm.sh"

# Clean up
rm -rf $DEPLOY_DIR

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "Access your application at:"
echo "Frontend: http://$VM_IP:$FRONTEND_PORT"
echo "Backend API: http://$VM_IP:$BACKEND_PORT"
echo ""
echo "To start the servers:"
echo "1. SSH into VM: ssh $VM_USER@$VM_IP"
echo "2. Start backend: cd ~/neural_network_project/backend && source venv/bin/activate && python main.py"
echo "3. Start frontend (new terminal): cd ~/neural_network_project/frontend && npm run dev"
echo ""
echo "Don't forget to open ports $BACKEND_PORT and $FRONTEND_PORT in Azure Portal!"
echo ""
