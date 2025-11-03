from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from data_preprocessor import DataPreprocessor
from model_trainer import ModelTrainer

app = FastAPI(title="Neural Network Classifier API")

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables
preprocessor = DataPreprocessor('birds.csv')
current_trainer = None

# Pydantic models
class TrainRequest(BaseModel):
    feature1: str
    feature2: str
    class1: str
    class2: str
    learning_rate: float
    epochs: int
    mse_threshold: Optional[float] = 0.01
    use_bias: bool
    algorithm: str

class PredictRequest(BaseModel):
    sample: List[float]

class TestRequest(BaseModel):
    test_X: List[List[float]]
    test_y: List[int]

@app.get("/")
def read_root():
    return {"message": "Neural Network Classifier API"}

@app.get("/features")
def get_features():
    """Get available features from dataset"""
    return {"features": preprocessor.get_features()}

@app.get("/classes")
def get_classes():
    """Get available classes from dataset"""
    return {"classes": preprocessor.get_classes()}

@app.post("/prepare-data")
def prepare_data(request: TrainRequest):
    """Prepare and split data for training"""
    try:
        data = preprocessor.get_data(
            request.feature1,
            request.feature2,
            request.class1,
            request.class2
        )
        return data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/train")
def train_model(request: TrainRequest):
    """Train the model with given parameters"""
    global current_trainer
    
    try:
        # Get data
        data = preprocessor.get_data(
            request.feature1,
            request.feature2,
            request.class1,
            request.class2
        )
        
        # Initialize trainer
        current_trainer = ModelTrainer(
            algorithm=request.algorithm,
            learning_rate=request.learning_rate,
            epochs=request.epochs,
            mse_threshold=request.mse_threshold,
            use_bias=request.use_bias
        )
        
        # Train model
        training_results = current_trainer.train(data['train_X'], data['train_y'])
        
        # Get decision boundary
        decision_boundary = current_trainer.get_decision_boundary()
        
        return {
            "training_results": training_results,
            "decision_boundary": decision_boundary,
            "data": data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/test")
def test_model(request: TestRequest):
    """Test the trained model"""
    global current_trainer
    
    if current_trainer is None:
        raise HTTPException(status_code=400, detail="Model not trained yet")
    
    try:
        # Make predictions
        predictions = current_trainer.predict(request.test_X)
        
        # Compute confusion matrix
        confusion_matrix = current_trainer.compute_confusion_matrix(
            request.test_y,
            predictions
        )
        
        # Compute accuracy
        accuracy = current_trainer.compute_accuracy(request.test_y, predictions)
        
        return {
            "predictions": predictions,
            "confusion_matrix": confusion_matrix,
            "accuracy": accuracy
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/classify")
def classify_sample(request: PredictRequest):
    """Classify a single sample"""
    global current_trainer
    
    if current_trainer is None:
        raise HTTPException(status_code=400, detail="Model not trained yet")
    
    try:
        prediction = current_trainer.classify_single_sample(request.sample)
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
