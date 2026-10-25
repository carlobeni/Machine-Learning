# Arquitectura Técnica del Sistema Citrus AI

## 1. Pipeline de Visión Computacional
El flujo de datos para clasificar un cítrico consta de:
1. **Adquisición y Normalización:** Imagen RGB $224 \times 224 \times 3$.
2. **Segmentación de Fondo:** Filtrado por umbralización sobre luminancia.
3. **Extracción Espectral:**
   - Conversión a espacio cilíndrico **HSV (Hue, Saturation, Value)**.
   - Histograma de Tono (16 bins): Discrimina amarillo limón (50°-65°), naranja (18°-28°) y rosado/rubí de pomelo (350°-10°).
   - Momentos estadísticos: Media y desviación estándar en RGB y HSV.
4. **Morfometría Geométrica:**
   - Detección de contornos exteriores.
   - Cálculo de *Aspect Ratio* ($W/H$): Limón $\approx 1.4$, Naranja $\approx 1.0$, Pomelo $\approx 1.08$.
   - Factor de Circularidad ($4\pi A / P^2$).
5. **Reducción SVD (Eigen-Citrus):**
   - Redimensionamiento a $64 \times 64 = 4096$ dimensiones.
   - Descomposición $X = U \Sigma V^T$ reteniendo $k=15$ valores singulares.

## 2. Paradigmas de Clasificación
- **Regresión Logística Multiclase:** Decisión lineal vía función Softmax $\sigma(z)_i = \frac{e^{z_i}}{\sum e^{z_j}}$.
- **Support Vector Machine (RBF):** Maximización de margen con función kernel gaussiana $K(x, x') = \exp(-\gamma ||x - x'||^2)$.
- **SVD + Linear SVC:** Clasificación en el subespacio de proyección de máxima varianza.
- **XGBoost Forest:** Ensamble de árboles con regularización y optimización de segundo orden sobre la función de pérdida logarítmica.
