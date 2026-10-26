# Modelos Entrenados de Machine Learning 🧠

Este directorio almacena los artefactos y clasificadores entrenados para distinguir entre perros y gatos:

## Modelos Serializados
1. **`xgboost_forest.joblib`**: Clasificador ensemble de árboles potenciados por gradiente (**XGBoost Forest**). Top desempeño con 66.7% Accuracy y 65.7% F1 en Test Set.
2. **`svm_rbf.joblib`**: Support Vector Machine con kernel radial gaussiano ($C=2.0$, $\gamma=\text{scale}$).
3. **`svd_pipeline.joblib`**: Pipeline espectral compuesto por `TruncatedSVD(n_components=20)` sobre imágenes planas de $64 \times 64$ y un clasificador lineal (`Linear SVC`).
4. **`logistic_regression.joblib`**: Modelo lineal discriminante regularizado ($L_2$).

## Transformadores y Métricas
- **`scaler.joblib`**: `StandardScaler` ajustado sobre las características tabulares de entrenamiento.
- **`label_encoder.joblib`**: Mapeo entre clases string (`gatos`, `perros`) e índices numéricos.
- **`metrics.json`**: Resumen en formato JSON con métricas de Exactitud, Precisión, Recall, F1 y matrices de confusión.
- **`confusion_matrices.png`**: Gráfico comparativo de matrices de confusión en el conjunto de prueba.
- **`svd_eigen_animals.png`**: Proyección gráfica de los vectores singulares morfológicos (Eigen-Animals).

## CLI de Predicción
```bash
python models/predict.py --image "data/raw/gatos/gato_000.jpg" --model xgb
```
