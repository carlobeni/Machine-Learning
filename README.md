# Clasificador de Gatos y Perros: Subespacios SVD (Menor Norma) y Machine Learning

Proyecto desarrollado en notebooks Jupyter (`.ipynb`) documentados, enfocado en el método algebraico de subespacios lineales (**SVD Subspace Method / Menor Norma Residual**), ingeniería de características visuales y comparación rigurosa contra modelos supervisados (SVM RBF, XGBoost Forest y Regresión Logística).

---

## Estructura del Repositorio (100% Notebooks Documentados)

```
.
├── data/
│   ├── preprocesamiento_datos.ipynb       # Notebook de preprocesamiento, Letterbox 256x256 y extracción de 349 características HOG/Color/Textura
│   ├── features_dataset.csv               # Dataset tabular extraído (360 muestras x 349 features)
│   └── processed/
│       ├── gatos/                         # 180 imágenes de gatos en matriz negra 256x256
│       └── perros/                        # 180 imágenes de perros en matriz negra 256x256
├── models/
│   ├── clasificacion_subespacios_svd_y_modelos.ipynb  # Notebook principal: Justificación PCA/SVD, entrenamiento y evaluación de modelos
│   ├── svd_curva_seleccion_dimension.png  # Curva de varianza explicada, Scree Plot y CV vs k
│   ├── svd_eigen_animals.png              # Visualización de Eigen-Gatos vs. Eigen-Perros
│   ├── confusion_matrices.png             # Matrices de confusión en test (N=72)
│   ├── svd_pipeline.joblib                # Modelo SVD Subespacios entrenado
│   ├── svm_rbf.joblib                     # Modelo SVM RBF
│   ├── xgboost_forest.joblib              # Modelo XGBoost Forest
│   └── logistic_regression.joblib        # Modelo Regresión Logística
├── docs/                                  # Arquitectura técnica y documentación conceptual
├── presentation/                          # Diapositivas HTML interactivas
└── reports/                               # Informe formal y resumen de métricas en CSV
```

---

## Formulación del Clasificador SVD por Subespacios (Menor Norma)

1. **Construcción de Matrices por Clase**: Se separan los datos de entrenamiento en $\mathbf{X}_{cat}$ y $\mathbf{X}_{dog}$.
2. **Centrado y Descomposición SVD**:
   $$\tilde{\mathbf{X}}_{cat}^T = \mathbf{U}_{cat} \mathbf{\Sigma}_{cat} \mathbf{V}_{cat}^T, \quad \tilde{\mathbf{X}}_{dog}^T = \mathbf{U}_{dog} \mathbf{\Sigma}_{dog} \mathbf{V}_{dog}^T$$
   Se retienen las bases ortonormales $\mathbf{U}_{cat}^{(k)}$ y $\mathbf{U}_{dog}^{(k)}$ con $k=20$ (justificado mediante Scree Plot y Validación Cruzada).
3. **Proyección y Reconstrucción de Test**:
   $$\hat{\mathbf{z}}_c = \mathbf{U}_c^{(k)} (\mathbf{U}_c^{(k)})^T (\mathbf{z} - \boldsymbol{\mu}_c) + \boldsymbol{\mu}_c$$
4. **Norma Residual y Criterio de Menor Norma**:
   $$\|\mathbf{e}_c\|_2 = \|\mathbf{z} - \hat{\mathbf{z}}_c\|_2, \qquad \hat{y} = \arg\min_{c \in \{cat, dog\}} \|\mathbf{e}_c\|_2$$

---

## Rendimiento en Test ($N=72$)

- **XGBoost Forest**: **84.72% Accuracy** (F1: 85.71%)
- **SVD Subespacios (Menor Norma)**: **79.17% Accuracy** (Precision: 83.87%, F1: 77.61%)
- **SVM (Kernel RBF)**: **77.78% Accuracy** (F1: 77.14%)
- **Regresión Logística ($L_2$)**: **75.00% Accuracy** (F1: 76.92%)
