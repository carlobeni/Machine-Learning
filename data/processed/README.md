# Datos Preprocesados y Extracción de Características

Este directorio contiene las representaciones estructuradas derivadas del procesamiento digital de imágenes:

## Archivos Generados
1. `features_citricos.csv`: Tabla con 120 filas y 40 columnas de características numéricas extraídas por visión computacional:
   - **Momentos de Color (12 features):** Medias y desviaciones estándar en los espacios RGB y HSV.
   - **Histograma de Tono / Hue (16 bins):** Cuantifica la distribución espectral de la longitud de onda dominante (clave para diferenciar amarillo limón de naranja y rosado pomelo).
   - **Histograma de Saturación (8 bins):** Mide la pureza y vivacidad del color de la cáscara.
   - **Descriptores Geométricos (3 features):** Área del fruto, relación de aspecto (*Aspect Ratio = Ancho / Alto*) y factor de circularidad ($4\pi A / P^2$).
   - `label`: Etiqueta categórica (`limon`, `naranja`, `pomelo`).

2. `dataset_citricos.npz`: Archivo binario comprimido que almacena la matriz `X_flat` (120 × 4096) con las imágenes en escala de grises de 64×64 normalizadas, utilizado directamente por el pipeline de **SVD (Singular Value Decomposition)**.

3. `preprocessor.py`: Módulo utilitario en Python que implementa la función `extract_features_from_image()` para inferencia en tiempo real en la API y el Dashboard.
