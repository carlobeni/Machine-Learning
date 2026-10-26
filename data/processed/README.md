# Datos Preprocesados (Matriz Negra & Feature Vectors) 🐾

Este directorio contiene las imágenes procesadas y las representaciones numéricas estructuradas para el entrenamiento de los modelos de Machine Learning.

## 1. Imágenes Insertadas en Matriz Negra (`gatos/` y `perros/`)
Para evitar la distorsión morfológica provocada por el redimensionamiento estándar (`resize`), cada fotografía de resolución arbitraria se escala manteniendo intacto su aspect ratio y se inserta centrada en un lienzo cuadrado negro de ceros ($256 \times 256 \times 3$).

- **`gatos/`**: 60 imágenes normalizadas en matriz negra de $256 \times 256$ px.
- **`perros/`**: 60 imágenes normalizadas en matriz negra de $256 \times 256$ px.

### Algoritmo de Inserción:
```python
s = min(256 / W_orig, 256 / H_orig)
W_new, H_new = round(W_orig * s), round(H_orig * s)
canvas = np.zeros((256, 256, 3), dtype=np.uint8)
canvas[y_off:y_off + H_new, x_off:x_off + W_new] = cv2.resize(img, (W_new, H_new))
```

## 2. Archivos Estructurados
- **`features_animales.csv`**: Tabla tabular con 120 registros y características extraídas por visión por computador:
  - **Momentos de Color (RGB y HSV):** Medias y desviaciones estándar sobre la región del animal (omitiendo el fondo negro).
  - **Histogramas de Color:** 24 bins normalizados (8 en Tono, 8 en Saturación, 8 en Brillo).
  - **Textura y Nitidez:** Magnitud media y dispersión del gradiente Sobel, junto con la varianza del operador Laplaciano.
  - **Descriptores Morfológicos:** Aspect Ratio original y Fill Ratio en el canvas.
  - **Etiqueta (`label`):** `gatos` o `perros`.
- **`dataset_animales.npz`**: Archivo comprimido con la matriz plana normalizada $X_{images} \in \mathbb{R}^{120 \times 4096}$ (escala de grises $64 \times 64$) utilizada por el pipeline de **SVD (Singular Value Decomposition)**, junto con las matrices tabulares $X_{tabular}$ y las etiquetas $y$.
- **`preprocessor.py`**: Módulo con las funciones `insert_in_black_canvas()` y `extract_image_features()` para preprocesamiento e inferencia.
