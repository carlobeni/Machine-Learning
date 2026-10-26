# Datos: Acondicionamiento en Matriz Negra y Extracción de Características

Este directorio contiene el conjunto de datos de perros y gatos, y el notebook documentado para su acondicionamiento.

## Notebook Documentado
- **[`preprocesamiento_datos.ipynb`](preprocesamiento_datos.ipynb)**:
  1. Inserta las imágenes reales en matrices de ceros de $256 \times 256 \times 3$ (Letterbox Zero-Padding) evitando distorsiones por cambio de escala anisotrópico.
  2. Extrae 349 características visuales vectoriales:
     - Dalal-Triggs HOG (Histogram of Oriented Gradients) para bordes de orejas y hocico.
     - Estadísticos e histogramas de color en espacios RGB y HSV sobre el primer plano.
     - Textura mediante gradientes Sobel y varianza Laplaciana del pelaje.
     - Pirámide espacial de cuadrantes $2 \times 2$.
  3. Genera la matriz tabular consolidada `features_dataset.csv`.

## Estructura de Subdirectorios
- `processed/gatos/`: 180 imágenes de gatos acondicionadas en canvas negro $256 \times 256$.
- `processed/perros/`: 180 imágenes de perros acondicionadas en canvas negro $256 \times 256$.
- `features_dataset.csv`: Matriz tabular de $360 \times 349$ características lista para entrenamiento.
