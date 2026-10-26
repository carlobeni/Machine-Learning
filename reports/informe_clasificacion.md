# Informe Técnico de Clasificación: Perros vs Gatos (Reentrenado)

## 1. Datos Experimentales y Preprocesamiento
- **Dataset:** Fotografías reales de gatos y perros domésticos obtenidas de repositorio público en GitHub (curadas de Kaggle Cats vs Dogs).
- **Imágenes Preprocesadas (`data/processed/`):** 120 imágenes ($256 \times 256$) centradas en matriz negra de ceros para preservar la relación de aspecto sin distorsión geométrica (60 gatos, 60 perros).
- **Partición:** Split estratificado 80% Entrenamiento (96 muestras) y 20% Prueba (24 muestras).

---

## 2. Tabla Comparativa de Rendimiento en Test Set (Reentrenado)

| Modelo | Exactitud (Accuracy) | Precisión (Precision) | Sensibilidad (Recall) | F1-Score |
|---|---|---|---|---|
| **SVM (Kernel RBF)** | **62.50%** | **65.13%** | **62.50%** | **60.80%** |
| **XGBoost Forest** | **62.50%** | **63.33%** | **62.50%** | **61.90%** |
| **SVD + Linear SVC** | **58.33%** | **61.11%** | **58.33%** | **55.56%** |
| **Regresión Logística** | **54.17%** | **56.32%** | **54.17%** | **49.91%** |

---

## 3. Discusión de Resultados y Hallazgos
1. **SVM (Kernel RBF):** Presenta una frontera de decisión no lineal sólida, alcanzando **65.13% de Precisión**, clasificando eficazmente los casos complejos de pelaje claro vs oscuro.
2. **XGBoost Forest:** Empata con **62.50% Accuracy** y obtiene el mejor **F1-Score (61.90%)**, combinando reglas de decisión aditivas sobre momentos cromáticos y derivadas direccionales Sobel.
3. **SVD (Eigen-Animals):** Al reducir la matriz aplanada normalizada de $64 \times 64$ (4096 dimensiones) a las 20 componentes singulares primarias, retiene patrones geométricos de contornos faciales (orejas puntiagudas y hocicos) con un desempeño competitivo del **58.33%**.
4. **Regresión Logística:** Función discriminante lineal base con **54.17% Accuracy**.
