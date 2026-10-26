# Informe Técnico de Clasificación: Perros vs Gatos

## 1. Datos Experimentales
- **Dataset:** Fotografías reales de gatos y perros domésticos obtenidas de repositorio público en GitHub (curadas del benchmark Kaggle Cats vs Dogs).
- **Muestras Totales:** 120 imágenes reales (60 gatos, 60 perros).
- **Resoluciones:** Heterogéneas (desde 220x300 hasta 500x499 píxeles).
- **Partición:** Split estratificado 80% Entrenamiento (96 muestras) y 20% Prueba (24 muestras).

---

## 2. Tabla Comparativa de Rendimiento en Test Set

| Modelo | Exactitud (Accuracy) | Precisión (Precision) | Sensibilidad (Recall) | F1-Score |
|---|---|---|---|---|
| **XGBoost Forest** | **66.67%** | **68.75%** | **66.67%** | **65.71%** |
| **SVM (RBF Kernel)** | **62.50%** | **65.13%** | **62.50%** | **60.80%** |
| **SVD + Linear SVC** | **58.33%** | **61.11%** | **58.33%** | **55.56%** |
| **Regresión Logística** | **58.33%** | **61.11%** | **58.33%** | **55.56%** |

---

## 3. Discusión de Resultados y Hallazgos
1. **XGBoost Forest:** Destaca como el clasificador más robusto. Logra modelar las combinaciones de gradiente de pelaje (derivadas Sobel y varianza Laplaciana) junto con histogramas de coloración en espacio HSV.
2. **SVM (RBF):** Ofrece fronteras de decisión suaves y bien regularizadas, evitando sobreajuste en muestras de pelaje oscuro.
3. **SVD (Eigen-Animals):** Al reducir las 4096 dimensiones de la imagen normalizada a 20 componentes singulares, retiene la topología geométrica principal sin depender de extracción manual de rasgos.
4. **Preservación de Aspect Ratio:** La inserción en el canvas negro demostró ser fundamental: previene que la cabeza triangular de los gatos se redondee o que los hocicos de los perros se distorsionen.
