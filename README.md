# 🧠 Neural Network Classifier - Perceptron & Adaline

A modern, full-stack web application implementing Perceptron and Adaline learning algorithms for binary classification of bird species data.

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![React](https://img.shields.io/badge/React-19.1-61DAFB.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.121-009688.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

## 📋 Project Structure

```
neural_network_project/
├── backend/                    # FastAPI backend
│   ├── main.py                # API endpoints
│   ├── data_preprocessor.py   # Data handling and preprocessing
│   ├── model_trainer.py       # Model training and evaluation
│   ├── perceptron.py          # Perceptron implementation
│   ├── adaline.py             # Adaline implementation
│   ├── birds.csv              # Dataset
│   └── requirements.txt       # Python dependencies
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ConfigPanel.jsx
│   │   │   ├── VisualizationPanel.jsx
│   │   │   ├── ResultsPanel.jsx
│   │   │   └── ClassifyPanel.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json           # Node dependencies
├── perceptron.py              # Standalone Perceptron class
├── adaline.py                 # Standalone Adaline class
├── birds.csv                  # Dataset (copy)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On Mac/Linux
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Start the FastAPI server:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📊 Features

### User Interface
- **Feature Selection**: Choose any two features from the dataset
- **Class Selection**: Select two classes to classify (C1 & C2, C1 & C3, or C2 & C3)
- **Hyperparameter Configuration**:
  - Learning rate (η)
  - Number of epochs
  - MSE threshold (for Adaline)
  - Bias option (checkbox)
  - Algorithm selection (Perceptron/Adaline radio button)

### Training & Testing
- **Data Split**: 30 samples per class for training, 20 for testing
- **Random Selection**: Non-repeated random sampling
- **Gender Preprocessing**: Automatic encoding of gender feature

### Visualization
- **Training Progress**: Line chart showing errors/MSE per epoch
- **Decision Boundary**: Scatter plot with decision boundary line
- **Model Parameters**: Display weights, bias, and final error/MSE

### Evaluation
- **Confusion Matrix**: Manual implementation (no sklearn)
- **Overall Accuracy**: Computed from test set
- **Single Sample Classification**: Test individual samples

## 🎯 Usage

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Configure the model:
   - Select two features
   - Select two classes
   - Set learning rate, epochs, MSE threshold
   - Choose whether to use bias
   - Select algorithm (Perceptron or Adaline)
4. Click "Train Model"
5. View:
   - Training progress chart
   - Decision boundary visualization
   - Confusion matrix
   - Overall accuracy
6. Test single samples using the classify panel

## 📝 Dataset

The `birds.csv` dataset contains the following features:
- gender (preprocessed to numerical)
- body_mass
- beak_length
- beak_depth
- fin_length
- bird category (A, B, C)

## 🔬 Algorithms

### Perceptron
- Step activation function
- Updates weights when misclassification occurs
- Tracks errors per epoch

### Adaline
- Linear activation function
- Updates weights using gradient descent
- Minimizes Mean Squared Error (MSE)
- Early stopping when MSE < threshold

## 📈 Analysis Requirements

For the report, test at least **5 combinations** for each algorithm showing:
- Good and bad performance examples
- Variety of feature combinations
- Variety of class combinations
- Which features achieve highest accuracy

## 🛠️ Technologies Used

### Backend
- FastAPI - Modern Python web framework
- NumPy - Numerical computations
- Pandas - Data manipulation
- Uvicorn - ASGI server

### Frontend
- React - UI framework
- Vite - Build tool
- Recharts - Data visualization
- Axios - HTTP client

## 📦 API Endpoints

- `GET /features` - Get available features
- `GET /classes` - Get available classes
- `POST /train` - Train model
- `POST /test` - Test model
- `POST /classify` - Classify single sample

## 🎨 Features Highlights

✅ Clean separation of logic and UI
✅ Well-documented, maintainable code
✅ Manual confusion matrix implementation
✅ Gender preprocessing
✅ No data dropped from dataset
✅ Responsive design
✅ Real-time visualization

## 📄 License

Educational project for Deep Learning course

## 👥 Authors

[Your Name/Team Names]

## 🙏 Acknowledgments

Deep Learning Course - Level 4, Semester 1
