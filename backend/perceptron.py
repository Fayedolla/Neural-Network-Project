import numpy as np

class Perceptron:
    def __init__(self, learning_rate=0.01, epochs=100, use_bias=True):
        """
        Initialize Perceptron classifier
        
        Parameters:
        -----------
        learning_rate : float
            Learning rate (eta) for weight updates
        epochs : int
            Number of training iterations
        use_bias : bool
            Whether to use bias term
        """
        self.learning_rate = learning_rate
        self.epochs = epochs
        self.use_bias = use_bias
        self.weights = None
        self.bias = None
        self.errors_per_epoch = []
    
    def initialize_weights(self, n_features):
        """Initialize weights and bias with small random numbers"""
        np.random.seed(42)
        self.weights = np.random.uniform(-0.5, 0.5, n_features)
        if self.use_bias:
            self.bias = np.random.uniform(-0.5, 0.5)
        else:
            self.bias = 0
    
    def activation_function(self, z):
        """Step activation function"""
        return np.where(z >= 0, 1, -1)
    
    def predict(self, X):
        """Predict class labels for samples in X"""
        z = np.dot(X, self.weights) + self.bias
        return self.activation_function(z)
    
    def fit(self, X, y):
        """
        Train the perceptron
        
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
            errors = 0
            for xi, target in zip(X, y):
                prediction = self.predict(xi.reshape(1, -1))[0]
                update = self.learning_rate * (target - prediction)
                
                self.weights += update * xi
                if self.use_bias:
                    self.bias += update
                
                errors += int(update != 0.0)
            
            self.errors_per_epoch.append(errors)
        
        return self
    
    def get_decision_boundary(self):
        """Calculate decision boundary parameters for visualization"""
        if self.weights is None:
            return None
        return self.weights, self.bias
