import numpy as np

class Adaline:
    def __init__(self, learning_rate=0.01, epochs=100, mse_threshold=0.01, use_bias=True):
        """
        Initialize Adaline classifier
        
        Parameters:
        -----------
        learning_rate : float
            Learning rate (eta) for weight updates
        epochs : int
            Maximum number of training iterations
        mse_threshold : float
            MSE threshold for early stopping
        use_bias : bool
            Whether to use bias term
        """
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.mse_threshold = mse_threshold
        self.use_bias = use_bias
        self.weights = None
        self.bias = None
        self.mse_per_epoch = []
    
    def initialize_weights(self, n_features):
        """Initialize weights and bias with small random numbers"""
        np.random.seed(42)
        self.weights = np.random.uniform(-0.5, 0.5, n_features)
        if self.use_bias:
            self.bias = np.random.uniform(-0.5, 0.5)
        else:
            self.bias = 0
    
    def activation_function(self, z):
        """Linear activation function (identity)"""
        return z
    
    def predict_activation(self, X):
        """Calculate net input (before sign function)"""
        return np.dot(X, self.weights) + self.bias
    
    def predict(self, X):
        """Predict class labels for samples in X"""
        return np.where(self.predict_activation(X) >= 0, 1, -1)
    
    def compute_mse(self, y_true, y_pred):
        """Compute Mean Squared Error"""
        return np.mean((y_true - y_pred) ** 2)
    
    def fit(self, X, y):
        """
        Train the Adaline classifier
        
        Parameters:
        -----------
        X : array-like, shape = [n_samples, n_features]
            Training vectors
        y : array-like, shape = [n_samples]
            Target values (1 or -1)
        
        Returns:
        --------
        self : object
        """
        self.initialize_weights(X.shape[1])
        
        for epoch in range(self.epochs):
            # Calculate net input for all samples
            net_input = self.predict_activation(X)
            
            # Calculate errors
            errors = y - net_input
            
            # Calculate weight updates
            weight_update = self.learning_rate * X.T.dot(errors)
            bias_update = self.learning_rate * errors.sum() if self.use_bias else 0
            
            # Clip gradients to prevent overflow
            weight_update = np.clip(weight_update, -1e10, 1e10)
            bias_update = np.clip(bias_update, -1e10, 1e10)
            
            # Update weights and bias using gradient descent
            self.weights += weight_update
            if self.use_bias:
                self.bias += bias_update
            
            # Check for NaN/Inf in weights
            if np.any(np.isnan(self.weights)) or np.any(np.isinf(self.weights)):
                raise ValueError("Training diverged: weights contain NaN or Inf. Try reducing learning rate or normalizing input data.")
            
            # Calculate MSE
            mse = self.compute_mse(y, net_input)
            self.mse_per_epoch.append(float(mse))
            
            # Early stopping if MSE below threshold
            if mse < self.mse_threshold:
                break
        
        return self
    
    def get_decision_boundary(self):
        """Calculate decision boundary parameters for visualization"""
        if self.weights is None:
            return None
        return self.weights, self.bias
