import numpy as np
from perceptron import Perceptron
from adaline import Adaline

class ModelTrainer:
    def __init__(self, algorithm, learning_rate, epochs, mse_threshold=None, use_bias=True):
        self.algorithm = algorithm
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.mse_threshold = mse_threshold
        self.use_bias = use_bias
        self.model = None
        
    def train(self, train_X, train_y):
        """Train the model"""
        train_X = np.array(train_X)
        train_y = np.array(train_y)
        
        if self.algorithm == 'perceptron':
            self.model = Perceptron(
                learning_rate=self.learning_rate,
                epochs=self.epochs,
                use_bias=self.use_bias
            )
        else:  # adaline
            self.model = Adaline(
                learning_rate=self.learning_rate,
                epochs=self.epochs,
                mse_threshold=self.mse_threshold,
                use_bias=self.use_bias
            )
        
        self.model.fit(train_X, train_y)
        
        return {
            'weights': self.model.weights.tolist(),
            'bias': float(self.model.bias),
            'training_progress': (
                self.model.errors_per_epoch if self.algorithm == 'perceptron' 
                else self.model.mse_per_epoch
            )
        }
    
    def predict(self, X):
        """Predict classes for given samples"""
        X = np.array(X)
        predictions = self.model.predict(X)
        return predictions.tolist()
    
    def compute_confusion_matrix(self, y_true, y_pred):
        """Compute confusion matrix manually"""
        y_true = np.array(y_true)
        y_pred = np.array(y_pred)
        
        # TP: True Positive (predicted 1, actual 1)
        # TN: True Negative (predicted -1, actual -1)
        # FP: False Positive (predicted 1, actual -1)
        # FN: False Negative (predicted -1, actual 1)
        
        tp = np.sum((y_pred == 1) & (y_true == 1))
        tn = np.sum((y_pred == -1) & (y_true == -1))
        fp = np.sum((y_pred == 1) & (y_true == -1))
        fn = np.sum((y_pred == -1) & (y_true == 1))
        
        return {
            'TP': int(tp),
            'TN': int(tn),
            'FP': int(fp),
            'FN': int(fn)
        }
    
    def compute_accuracy(self, y_true, y_pred):
        """Compute overall accuracy"""
        y_true = np.array(y_true)
        y_pred = np.array(y_pred)
        
        correct = np.sum(y_true == y_pred)
        total = len(y_true)
        
        return float(correct / total)
    
    def get_decision_boundary(self):
        """Get decision boundary parameters"""
        weights, bias = self.model.get_decision_boundary()
        return {
            'weights': weights.tolist(),
            'bias': float(bias)
        }
    
    def classify_single_sample(self, sample):
        """Classify a single sample"""
        sample = np.array(sample).reshape(1, -1)
        prediction = self.model.predict(sample)[0]
        return int(prediction)
