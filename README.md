# Clasificador de Perros y Gatos (Dogs vs Cats ML) 🐕 🐱

Proyecto integral de Machine Learning y Visión por Computador para la clasificación binaria de fotografías reales de **perros** y **gatos**, optimizado para alcanzar más del **80% de Exactitud**.

---

## 📌 Aspectos Destacados
- **Dataset Ampliado de Imágenes Reales (360 Fotos):** Descargadas del repositorio público de GitHub ([niruhan/CNN-Image-Classifier-with-Keras-by-deeplizard](https://github.com/niruhan/CNN-Image-Classifier-with-Keras-by-deeplizard)) derivado de Kaggle Dogs vs Cats.
- **Inserción en Matriz Negra (Letterbox Zero-Padding):** Todas las imágenes están estandarizadas a $256 \times 256 \times 3$ preservando la relación de aspecto espacial original sin deformación de orejas ni hocicos.
- **Ingeniería de Rasgos Avanzada:**
  - **HOG (Histogram of Oriented Gradients):** Captura contornos morfoscópicos (orejas puntiagudas en gatos vs caídas/anchas en perros).
  - **Pirámides de Color Espaciales (Cuadrantes 2x2):** Diferenciación cromática entre región craneal y corporal.
  - **Histogramas HSV:** Distribución de matiz, saturación y brillo.
  - **SVD Espectral:** Reducción latente de dimensionalidad ($k=35$ componentes singulares / Eigen-Animals).
- **Dashboard Streamlit Interactivo:** Exploración de imágenes procesadas en matriz negra, predicción en tiempo real con barras de confianza y comparación multi-modelo.
- **CLI de Inferencia (`models/predict.py`):** Detección rápida por línea de comandos.

---

## 📊 Tabla Comparativa de Rendimiento (Test Set 72 Muestras)

| Modelo | Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **SVM (Kernel RBF Calibrado)** | **80.56%** | **80.94%** | **80.56%** | **80.50%** |
| **SVD + Clasificador Espectral** | **79.17%** | **79.19%** | **79.17%** | **79.16%** |
| **XGBoost Forest (150 Estimadores)** | **76.39%** | **76.91%** | **76.39%** | **76.27%** |
| **Regresión Logística ($L_2$)** | **75.00%** | **75.71%** | **75.00%** | **74.83%** |

---

## 🚀 Guía de Uso

### 1. Iniciar el Dashboard
```bash
streamlit run dashboard/app.py
```

### 2. Inferencia por Consola (CLI)
```bash
# Ejemplo gato:
python models/predict.py --image "data/processed/gatos/gato_000.jpg" --model svm

# Ejemplo perro:
python models/predict.py --image "data/processed/perros/perro_000.jpg" --model svm
```

---

## 🗂️ Estructura del Repositorio
```
├── dashboard/
│   ├── app.py                  # Dashboard interactivo en Streamlit
│   ├── requirements.txt
│   └── README.md
├── data/
│   ├── raw/
│   │   ├── gatos/              # 180 imágenes crudas
│   │   ├── perros/             # 180 imágenes crudas
│   │   ├── dataset_info.json
│   │   └── README.md
│   └── processed/
│       ├── gatos/              # 180 imágenes en matriz negra (256x256)
│       ├── perros/             # 180 imágenes en matriz negra (256x256)
│       ├── preprocessor.py     # HOG + padding + extracción
│       ├── features_animales.csv
│       ├── dataset_animales.npz
│       └── README.md
├── models/
│   ├── logistic_regression.joblib
│   ├── svm_rbf.joblib
│   ├── svd_pipeline.joblib
│   ├── xgboost_forest.joblib
│   ├── scaler.joblib
│   ├── label_encoder.joblib
│   ├── metrics.json
│   ├── confusion_matrices.png
│   ├── svd_eigen_animals.png
│   └── predict.py
├── docs/
│   ├── index.html
│   └── arquitectura_tecnica.md
├── reports/
│   ├── informe_clasificacion.md
│   ├── metricas_resumen.csv
│   └── README.md
├── presentation/
│   ├── index.html
│   └── README.md
└── README.md
```
