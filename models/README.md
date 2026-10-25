# Modelos Entrenados de Machine Learning

Este directorio almacena los 4 clasificadores serializados entrenados sobre el dataset de cítricos (Naranjas, Pomelos y Limones):

## Modelos Disponibles
1. **`logistic_regression.joblib` (Regresión Logística Multiclase):**
   - Clasificador lineal probabilístico multinomial (`solver='lbfgs'`).
   - Excelente interpretabilidad mediante los pesos asignados a cada descriptor de color y forma.
   - **Rendimiento:** Accuracy: 100% | Latencia de Inferencia: ~0.03 ms.

2. **`svm_rbf.joblib` (Support Vector Machine):**
   - Modelo no lineal con Kernel RBF de base radial ($C=5.0$, $\gamma='scale'$).
   - Genera hiperplanos de separación de margen óptimo en espacios de alta dimensión.
   - **Rendimiento:** Accuracy: 100% | Latencia de Inferencia: ~0.03 ms.

3. **`svd_pipeline.joblib` (Descomposición en Valores Singulares - Eigen-Citrus):**
   - Pipeline de reducción de dimensionalidad con `TruncatedSVD(n_components=15)` seguido de un clasificador lineal.
   - Proyecta imágenes en escala de grises sobre los modos espaciales de máxima varianza (*Eigen-Citrus*), emulando la técnica clásica de *Eigenfaces*.
   - **Rendimiento:** Accuracy: 93.33% | Latencia de Inferencia: ~0.12 ms.

4. **`xgboost_forest.joblib` (XGBoost Forest Ensemble):**
   - Ensamble de 100 árboles de decisión acelerados por gradiente con submuestreo de características y muestras.
   - Extraordinaria robustez frente a no-linealidades y correlaciones espaciales.
   - **Rendimiento:** Accuracy: 100% | Latencia de Inferencia: ~0.08 ms.

## Artefactos Complementarios
- `scaler.joblib`: Estandarizador `StandardScaler` ajustado sobre el conjunto de entrenamiento.
- `label_encoder.joblib`: Mapeo biyectivo de etiquetas (`0: limon`, `1: naranja`, `2: pomelo`).
- `metrics.json`: Registro de métricas de exactitud, F1 ponderado, matrices de confusión y tiempos.
- `confusion_matrices.png`: Gráfico con las matrices de confusión de los cuatro modelos.
- `svd_eigen_citrus.png`: Visualización de los primeros 8 modos propios (*Eigen-Citrus*).

## Cómo ejecutar una predicción desde la línea de comandos (CLI)
```bash
# Probar todos los modelos sobre una imagen de prueba:
python models/predict.py --image data/raw/naranjas/naranja_01.jpg --model all

# Probar específicamente el modelo SVD:
python models/predict.py --image data/raw/limones/limon_05.jpg --model svd
```
