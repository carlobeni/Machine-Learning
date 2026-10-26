# Dashboard Interactivo de Clasificación (Streamlit) 🐾

Aplicación web desarrollada con **Streamlit** para interactuar con los 4 modelos de Machine Learning entrenados sobre el clasificador de perros y gatos.

## Características
1. **Inferencia en Tiempo Real:** Carga de imágenes locales o selección directa desde la galería del repositorio.
2. **Visualización de Matriz Negra:** Muestra lado a lado la imagen original y su inserción centrada con letterbox padding ($256 \times 256$).
3. **Comparador Multi-Modelo:** Evaluación simultánea de Regresión Logística, SVM RBF, SVD + Linear SVC y XGBoost Forest.
4. **Métricas y Matrices de Confusión:** Panel con tabla de evaluación en Test Set y componentes singulares de SVD.

## Ejecución
```bash
streamlit run dashboard/app.py
```
