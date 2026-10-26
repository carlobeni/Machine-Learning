# Clasificador de Perros y Gatos (Dogs vs Cats) 🐕 🐱

Proyecto integral de Machine Learning y Visión por Computador para la clasificación binaria de fotografías reales de **perros** y **gatos**.

---

## 📌 Aspectos Destacados
- **Imágenes Reales del Repositorio:** 120 fotografías fotográficas auténticas de gatos y perros descargadas desde un repositorio público en GitHub (derivado de Kaggle Dogs vs Cats).
- **Preservación de Aspect Ratio mediante Matriz Negra:** Inserción de imágenes con dimensiones heterogéneas en un canvas neutro de ceros ($256 \times 256$) evitando la distorsión del `resize` tradicional.
- **4 Modelos de Machine Learning Implementados:**
  1. **Regresión Logística:** Línea base lineal regularizada.
  2. **SVM (RBF Kernel):** Clasificador de vectores de soporte con hiperplano no lineal.
  3. **SVD + Linear SVC:** Descomposición espectral en valores singulares ($k=20$ componentes / Eigen-Animals) sobre la matriz de imagen plana.
  4. **XGBoost Forest:** Ensemble de árboles de decisión potenciados por gradiente (**Top Desempeño: 66.7% Accuracy / 65.7% F1**).
- **Dashboard Streamlit Interactivo:** Aplicación web para inferencia en tiempo real, comparación de modelos y análisis visual.
- **Herramienta CLI:** Script de línea de comandos para inferencia rápida (`models/predict.py`).

---

## 🗂️ Estructura del Proyecto
```
├── dashboard/
│   ├── app.py                  # Dashboard interactivo en Streamlit
│   ├── requirements.txt
│   └── Dockerfile
├── data/
│   ├── raw/
│   │   ├── gatos/              # 60 fotografías reales de gatos
│   │   ├── perros/             # 60 fotografías reales de perros
│   │   └── dataset_info.json   # Metadatos de procedencia
│   └── processed/
│       ├── preprocessor.py     # Inserción en matriz negra y extracción
│       ├── features_animales.csv
│       └── dataset_animales.npz
├── models/
│   ├── logistic_regression.joblib
│   ├── svm_rbf.joblib
│   ├── svd_pipeline.joblib     # Pipeline SVD + Linear SVC
│   ├── xgboost_forest.joblib
│   ├── scaler.joblib
│   ├── label_encoder.joblib
│   ├── metrics.json
│   ├── confusion_matrices.png  # Comparativa gráfica de matrices
│   ├── svd_eigen_animals.png   # Visualización de Eigen-Animals
│   └── predict.py              # Inferencia por consola (CLI)
├── docs/
│   ├── index.html              # Documentación web interactiva
│   └── arquitectura_tecnica.md # Arquitectura detallada del sistema
├── reports/
│   ├── informe_clasificacion.md# Informe técnico del experimento
│   └── metricas_resumen.csv    # Tabla cuantitativa de métricas
├── presentation/
│   └── index.html              # Diapositivas interactivas en HTML5
└── README.md
```

---

## 🚀 Guía de Inicio Rápido

### 1. Requisitos Previos
Asegúrate de contar con Python 3.10+ y las dependencias instaladas:
```bash
pip install streamlit scikit-learn xgboost opencv-python pillow pandas numpy matplotlib seaborn joblib
```

### 2. Ejecución del Dashboard Interactivo
```bash
streamlit run dashboard/app.py
```

### 3. Inferencia por Consola (CLI)
Puedes predecir cualquier imagen individual pasando la ruta y el modelo deseado (`xgb`, `svm`, `svd`, `lr`):
```bash
# Ejemplo con imagen de gato usando XGBoost:
python models/predict.py --image "data/raw/gatos/gato_000.jpg" --model xgb

# Ejemplo con imagen de perro usando SVD Eigen-Animals:
python models/predict.py --image "data/raw/perros/perro_000.jpg" --model svd
```

---

## 📊 Resumen de Desempeño (Test Set 20%)

| Modelo | Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **XGBoost Forest** | **66.67%** | **68.75%** | **66.67%** | **65.71%** |
| **SVM (RBF Kernel)** | **62.50%** | **65.13%** | **62.50%** | **60.80%** |
| **SVD + Linear SVC** | **58.33%** | **61.11%** | **58.33%** | **55.56%** |
| **Regresión Logística** | **58.33%** | **61.11%** | **58.33%** | **55.56%** |

---

## 🔬 Inserción en Matriz Negra (Letterbox Zero-Padding)
Para salvaguardar la relación de aspecto original de cada animal sin deformación morfológica:
1. Se determina el factor de escala homogéneo: $s = \min(256/W, 256/H)$.
2. Se redimensiona la imagen proporcionalmente manteniendo la curvatura de orejas y hocicos.
3. Se crea un canvas neutro de ceros de $256 \times 256 \times 3$.
4. Se posiciona la imagen escalada en el centro geométrico del canvas.

---

## 📄 Licencia y Créditos
Dataset derivado de colecciones de código abierto de Kaggle Dogs vs Cats compiladas en GitHub (`niruhan/CNN-Image-Classifier-with-Keras-by-deeplizard`).
Desarrollado para el curso de Machine Learning 1.
