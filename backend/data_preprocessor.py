import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

class DataPreprocessor:
    def __init__(self, csv_path='birds.csv'):
        self.df = pd.read_csv(csv_path)
        self.label_encoder = LabelEncoder()
        self.scaler = None
        self._preprocess_gender()
        
    def _preprocess_gender(self):
        """Encode gender as numerical values"""
        self.df['gender'] = self.label_encoder.fit_transform(self.df['gender'])
    
    def get_features(self):
        """Get list of available features"""
        return [col for col in self.df.columns if col != 'bird category']
    
    def get_classes(self):
        """Get list of unique classes"""
        return sorted(self.df['bird category'].unique().tolist())
    
    def get_data(self, feature1, feature2, class1, class2, normalize=True):
        """
        Get filtered and split data for training and testing
        
        Parameters:
        -----------
        normalize : bool
            Whether to normalize features using StandardScaler
        
        Returns:
        --------
        dict with train_X, train_y, test_X, test_y, and full data for visualization
        """
        # Filter data for selected classes
        filtered_df = self.df[self.df['bird category'].isin([class1, class2])].copy()
        
        # Extract features
        X = filtered_df[[feature1, feature2]].values
        
        # Convert classes to binary labels (1 and -1)
        y = filtered_df['bird category'].apply(lambda x: 1 if x == class1 else -1).values
        
        # Split data: 30 samples per class for training, 20 for testing
        class1_indices = np.where(y == 1)[0]
        class2_indices = np.where(y == -1)[0]
        
        # Randomly select 30 samples for training from each class
        np.random.seed(42)
        train_indices_c1 = np.random.choice(class1_indices, size=30, replace=False)
        train_indices_c2 = np.random.choice(class2_indices, size=30, replace=False)
        
        # Remaining samples for testing
        test_indices_c1 = np.setdiff1d(class1_indices, train_indices_c1)
        test_indices_c2 = np.setdiff1d(class2_indices, train_indices_c2)
        
        # Combine training and testing indices
        train_indices = np.concatenate([train_indices_c1, train_indices_c2])
        test_indices = np.concatenate([test_indices_c1, test_indices_c2])
        
        # Shuffle
        np.random.shuffle(train_indices)
        np.random.shuffle(test_indices)
        
        # Normalize features if requested
        if normalize:
            self.scaler = StandardScaler()
            X_normalized = self.scaler.fit_transform(X)
        else:
            X_normalized = X
        
        return {
            'train_X': X_normalized[train_indices].tolist(),
            'train_y': y[train_indices].tolist(),
            'test_X': X_normalized[test_indices].tolist(),
            'test_y': y[test_indices].tolist(),
            'all_X': X_normalized.tolist(),
            'all_y': y.tolist(),
            'feature_names': [feature1, feature2],
            'class_names': [class1, class2]
        }
