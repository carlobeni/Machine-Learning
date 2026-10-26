import numpy as np
from sklearn.base import BaseEstimator, ClassifierMixin

class SVDSubspaceClassifier(BaseEstimator, ClassifierMixin):
    """
    Clasificador de Subespacios SVD (Subspace Method).
    
    1. Construye dos matrices normalizadas de entrenamiento:
       X_cat (gatos) y X_dog (perros).
    2. Centra cada matriz restando la media correspondiente: mu_cat y mu_dog.
    3. Aplica SVD para obtener las bases ortonormales de cada subespacio:
       U_cat[:, :k] y U_dog[:, :k].
    4. Para cada vector de prueba 'z', proyecta sobre ambos subespacios y calcula
       la muestra reconstruida:
           z_rec_cat = U_cat @ (U_cat^T @ (z - mu_cat)) + mu_cat
           z_rec_dog = U_dog @ (U_dog^T @ (z - mu_dog)) + mu_dog
    5. Resta el vector de prueba de la proyeccion calculando las normas euclidianas (residuos):
           ||e_cat|| = ||z - z_rec_cat||_2
           ||e_dog|| = ||z - z_rec_dog||_2
    6. Asigna la clase que produce la MENOR NORMA.
    """
    def __init__(self, k_components=20, temperature=0.25):
        self.k_components = k_components
        self.temperature = temperature
        self.classes_ = np.array(['gatos', 'perros'])
        
    def fit(self, X, y):
        X = np.asarray(X, dtype=np.float64)
        y = np.asarray(y)
        
        X_cat = X[y == 'gatos'] if isinstance(y[0], str) else X[y == 0]
        X_dog = X[y == 'perros'] if isinstance(y[0], str) else X[y == 1]
        
        self.mu_cat_ = np.mean(X_cat, axis=0)
        self.mu_dog_ = np.mean(X_dog, axis=0)
        
        X_cat_centered = X_cat - self.mu_cat_
        X_dog_centered = X_dog - self.mu_dog_
        
        U_c, S_c, _ = np.linalg.svd(X_cat_centered.T, full_matrices=False)
        U_d, S_d, _ = np.linalg.svd(X_dog_centered.T, full_matrices=False)
        
        k = min(self.k_components, U_c.shape[1], U_d.shape[1])
        self.U_cat_ = U_c[:, :k]
        self.U_dog_ = U_d[:, :k]
        self.k_ = k
        return self
        
    def compute_residuals(self, X):
        X = np.asarray(X, dtype=np.float64)
        norms_cat = []
        norms_dog = []
        for z in X:
            diff_cat = z - self.mu_cat_
            z_rec_cat = self.U_cat_ @ (self.U_cat_.T @ diff_cat) + self.mu_cat_
            norm_cat = np.linalg.norm(z - z_rec_cat)
            
            diff_dog = z - self.mu_dog_
            z_rec_dog = self.U_dog_ @ (self.U_dog_.T @ diff_dog) + self.mu_dog_
            norm_dog = np.linalg.norm(z - z_rec_dog)
            
            norms_cat.append(norm_cat)
            norms_dog.append(norm_dog)
        return np.array(norms_cat), np.array(norms_dog)
        
    def predict(self, X):
        norms_cat, norms_dog = self.compute_residuals(X)
        return np.where(norms_cat < norms_dog, 0, 1)
        
    def predict_proba(self, X):
        norms_cat, norms_dog = self.compute_residuals(X)
        scale = (np.mean(norms_cat) + np.mean(norms_dog)) / 2.0 + 1e-6
        d_cat = norms_cat / scale
        d_dog = norms_dog / scale
        
        exp_cat = np.exp(-d_cat / self.temperature)
        exp_dog = np.exp(-d_dog / self.temperature)
        sum_exp = exp_cat + exp_dog
        
        p_cat = (exp_cat / sum_exp).reshape(-1, 1)
        p_dog = (exp_dog / sum_exp).reshape(-1, 1)
        return np.hstack([p_cat, p_dog])
