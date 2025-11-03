# 🚀 Quick Start Guide

## ✅ Current Status
Both servers are **RUNNING** and ready to use!

- **Backend API**: http://localhost:8000
- **Frontend UI**: http://localhost:5173

Open your browser and go to **http://localhost:5173** to use the application!

---

## 🔄 To Start the Application (Next Time)

### 1. Start Backend (Terminal 1)
```bash
cd "D:\University\Level - 4\Semester - 1\Deep Learning\Task\neural_network_project\backend"
python main.py
```

Wait until you see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### 2. Start Frontend (Terminal 2)
```bash
cd "D:\University\Level - 4\Semester - 1\Deep Learning\Task\neural_network_project\frontend"
npm run dev
```

Wait until you see:
```
VITE v7.1.12  ready in XXX ms
➜  Local:   http://localhost:5173/
```

### 3. Open Browser
Navigate to: **http://localhost:5173**

---

## 🎯 How to Use the Application

### Step 1: Configure Your Model
1. **Select Feature 1 & Feature 2** from dropdowns (e.g., body_mass, beak_length)
2. **Select Class 1 & Class 2** from dropdowns (e.g., A and B)
3. **Set Learning Rate** (default: 0.01)
4. **Set Number of Epochs** (default: 100)
5. **Set MSE Threshold** for Adaline (default: 0.01)
6. **Check/Uncheck "Use Bias"** checkbox
7. **Select Algorithm**: Perceptron or Adaline (radio button)

### Step 2: Train the Model
Click **"Train Model"** button

### Step 3: View Results
After training completes, you'll see:
- ✅ **Training Progress Chart**: Errors/MSE per epoch
- ✅ **Decision Boundary Visualization**: Scatter plot with decision line
- ✅ **Model Parameters**: Weights, bias, final error
- ✅ **Confusion Matrix**: TP, TN, FP, FN
- ✅ **Overall Accuracy**: Test set accuracy percentage

### Step 4: Classify Single Samples
Use the **"Classify Single Sample"** panel:
1. Enter values for Feature 1 and Feature 2
2. Click **"Classify Sample"**
3. View the predicted class

---

## 📊 Testing Combinations for Report

You need to test **at least 5 combinations per algorithm** (10 total):

### Example Combinations to Test:

#### Perceptron:
1. **body_mass vs beak_length** | Classes A vs B | η=0.01, epochs=100
2. **beak_depth vs fin_length** | Classes A vs C | η=0.05, epochs=50
3. **gender vs body_mass** | Classes B vs C | η=0.01, epochs=100
4. **beak_length vs beak_depth** | Classes A vs B | η=0.1, epochs=200
5. **fin_length vs body_mass** | Classes A vs C | η=0.01, epochs=100

#### Adaline:
1. **body_mass vs beak_length** | Classes A vs B | η=0.001, MSE=0.01
2. **beak_depth vs fin_length** | Classes A vs C | η=0.001, MSE=0.05
3. **gender vs body_mass** | Classes B vs C | η=0.0001, MSE=0.01
4. **beak_length vs beak_depth** | Classes A vs B | η=0.001, MSE=0.1
5. **fin_length vs body_mass** | Classes A vs C | η=0.0005, MSE=0.01

### For Each Combination:
1. Take **screenshot** of the visualization
2. Take **screenshot** of the confusion matrix and accuracy
3. **Document** in your report:
   - Feature combination used
   - Classes selected
   - Hyperparameters (learning rate, epochs, MSE threshold, bias)
   - Final accuracy achieved
   - Analysis: How well did the features discriminate? Why?

---

## 🛑 To Stop the Servers

### Stop Frontend:
- In the frontend terminal: Press `Ctrl + C`

### Stop Backend:
- In the backend terminal: Press `Ctrl + C`

---

## 📝 Project Files Overview

### Backend Files:
- `main.py` - FastAPI server with endpoints
- `data_preprocessor.py` - Data loading and preprocessing
- `model_trainer.py` - Training and evaluation logic
- `perceptron.py` - Perceptron algorithm implementation
- `adaline.py` - Adaline algorithm implementation
- `birds.csv` - Dataset with 150 samples (50 per class)

### Frontend Files:
- `App.jsx` - Main application component
- `ConfigPanel.jsx` - Configuration form
- `VisualizationPanel.jsx` - Charts and decision boundary
- `ResultsPanel.jsx` - Confusion matrix and accuracy
- `ClassifyPanel.jsx` - Single sample classification

---

## ✨ Key Features Implemented

✅ Feature selection (2 features)
✅ Class selection (2 classes)
✅ Learning rate configuration
✅ Epochs configuration
✅ MSE threshold for Adaline
✅ Bias option (checkbox)
✅ Algorithm selection (Perceptron/Adaline radio buttons)
✅ 30/20 train/test split per class
✅ Random non-repeated sampling
✅ Gender preprocessing
✅ Training progress visualization
✅ Decision boundary plot
✅ Manual confusion matrix (no sklearn)
✅ Overall accuracy calculation
✅ Single sample classification

---

## 🎓 For Your Report

### Screenshots to Include:
1. Configuration panel with settings
2. Training progress chart
3. Decision boundary visualization
4. Confusion matrix table
5. Accuracy results

### Analysis to Write:
- Which feature combinations work best?
- Which combinations work poorly? Why?
- How does learning rate affect performance?
- Differences between Perceptron and Adaline?
- Which features achieve highest accuracy?

---

## 🐛 Troubleshooting

### Backend won't start:
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend won't start:
```bash
cd frontend
npm install --include=dev
npm run dev
```

### Port already in use:
- Backend (8000): Check if another app is using port 8000
- Frontend (5173): Check if another app is using port 5173

---

## 📞 Need Help?

Check the README.md for more detailed information.

**Good luck with your project! 🎉**
