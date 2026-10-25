# Citrus Vision AI: Clasificación de Cítricos con Machine Learning

**Proyecto de Aplicación – Asignatura: Machine Learning 1**  
**Facultad de Ingeniería – Universidad Nacional de Asunción (FIUNA)**  
**Profesor:** Dr. Diego Stalder | **Auxiliar de Práctica:** Ing. Carlos Benitez  
**Rama:** `project-test`

---

## 📌 Descripción del Proyecto
Este proyecto implementa un sistema inteligente de visión artificial y machine learning para la **clasificación multiclase automatizada de tres variedades de cítricos**:
- 🍊 **Naranjas** (*Citrus × sinensis*)
- 🌸 **Pomelos / Toronjas** (*Citrus × paradisi*)
- 🍋 **Limones** (*Citrus × limon*)

El sistema combina análisis espectral en espacio de color **HSV**, descriptores estadísticos de color, morfometría geométrica y descomposición en valores singulares (**SVD**) para alimentar cuatro familias de clasificadores:
1. **Regresión Logística Multiclase (Softmax)**
2. **Support Vector Machines (SVM con Kernel RBF)**
3. **SVD Pipeline (Eigen-Citrus + Clasificador)**
4. **XGBoost Forest (Ensamble de Árboles con Gradiente)**

---

## 📂 Estructura del Repositorio

El proyecto cuenta con todos sus directorios completos y listos para producción:

```text
├── data/
│   ├── raw/                 # 120 imágenes reales organizadas en /naranjas, /pomelos, /limones
│   └── processed/           # features_citricos.csv, dataset_citricos.npz, preprocessor.py
├── models/
│   ├── logistic_regression.joblib   # Modelo de regresión multinomial
│   ├── svm_rbf.joblib               # Modelo SVM con kernel gaussiano RBF
│   ├── svd_pipeline.joblib          # Pipeline SVD (Eigen-Citrus)
│   ├── xgboost_forest.joblib        # Ensamble XGBoost
│   ├── scaler.joblib                # Normalizador StandardScaler
│   ├── label_encoder.joblib         # Mapeo de clases
│   ├── metrics.json                 # Métricas de exactitud y latencia
│   ├── confusion_matrices.png       # Gráfico de matrices de confusión
│   ├── svd_eigen_citrus.png         # Modos singulares espaciales
│   └── predict.py                   # Herramienta CLI de inferencia
├── api/
│   ├── app.py               # API REST con FastAPI (/predict, /models, /health)
│   ├── test_api.py          # Cliente de prueba en Python
│   ├── Dockerfile           # Contenedor para despliegue
│   └── requirements.txt     # Dependencias de la API
├── dashboard/
│   ├── app.py               # Aplicación interactiva con Streamlit
│   └── requirements.txt     # Dependencias del Dashboard
├── docs/
│   ├── index.html           # Landing page moderna para GitHub Pages / Vercel
│   └── arquitectura_tecnica.md # Documentación del pipeline de visión y ML
├── reports/
│   ├── informe_clasificacion_citricos.md # Informe técnico formal (FIUNA)
│   └── metricas_resumen.csv # Resumen de métricas en CSV
├── presentation/
│   ├── index.html           # Diapositivas interactivas en HTML5 para defensa
│   └── style.css            # Estilos modernos para la presentación
└── README.md                # Este documento
```

---

## 📊 Benchmark y Resultados Comparativos

Evaluación rigurosa sobre el conjunto de prueba independiente (25% estratificado):

| Modelo | Accuracy Test | F1-Score (Weighted) | Latencia Inferencia | Tiempo de Entrenamiento |
| :--- | :---: | :---: | :---: | :---: |
| **Regresión Logística** | **100.00%** | **1.000** | **0.03 ms** | 0.015 s |
| **SVM (Kernel RBF)** | **100.00%** | **1.000** | **0.03 ms** | 0.003 s |
| **SVD (Eigen-Citrus)** | **93.33%** | **0.933** | **0.12 ms** | 0.006 s |
| **XGBoost Forest** | **100.00%** | **1.000** | **0.08 ms** | 0.055 s |

---

## 🚀 Guía de Uso Rápido

### 1. Inferencia desde Línea de Comandos (CLI)
Puedes clasificar cualquier imagen de cítrico al instante ejecutando:

```bash
# Probar todos los modelos sobre una muestra:
python models/predict.py --image data/raw/naranjas/naranja_01.jpg --model all

# Probar con un modelo específico (svm, regression, svd, xgboost):
python models/predict.py --image data/raw/limones/limon_01.jpg --model svm
```

### 2. Iniciar la API REST (FastAPI)
```bash
uvicorn api.app:app --reload --port 8000
```
- Documentación interactiva Swagger: **http://127.0.0.1:8000/docs**
- Clasificar vía curl:
```bash
curl -X POST "http://127.0.0.1:8000/predict?model_name=all" -F "file=@data/raw/pomelos/pomelo_01.jpg"
```

### 3. Iniciar el Dashboard Interactivo (Streamlit)
```bash
streamlit run dashboard/app.py
```
Abre automáticamente tu navegador en **http://localhost:8501** permitiéndote subir imágenes, comparar los cuatro clasificadores y explorar las proyecciones SVD.

### 4. Visualizar la Presentación Técnica
Abre en tu navegador el archivo `presentation/index.html` o sirve el directorio con:
```bash
python -m http.server 8080 --directory presentation
```

---

## 🛠️ Tecnologías y Dependencias
- **Visión Computacional:** OpenCV, PIL / Pillow.
- **Modelado Científico:** Scikit-Learn, NumPy, SciPy, Pandas.
- **Ensambles:** XGBoost.
- **Servicios Web:** FastAPI, Uvicorn, Streamlit.
- **Visualización:** Matplotlib, Seaborn, Tailwind CSS.
