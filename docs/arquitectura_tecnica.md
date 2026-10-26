# Arquitectura Técnica: Clasificador Optimizado de Perros y Gatos

## 1. Visión General del Sistema
Sistema de visión artificial y machine learning diseñado para la detección binaria entre **perros** (`perros`) y **gatos** (`gatos`). Opera sobre 360 imágenes fotográficas reales descargadas de GitHub, normalizadas mediante **letterbox padding en matriz negra** ($256 \times 256$) y procesadas con un vector híbrido de descriptores morfológicos (HOG), cromáticos (HSV/RGB espaciales) y espectrales (SVD).

---

## 2. Pipeline de Extracción de Características
```mermaid
graph TD
    A["Imágenes Crudas (Resolución Variable)"] --> B["Canvas Matriz Negra 256x256 (Letterbox Zero-Padding)"]
    B --> C["HOG Vector (Dalal-Triggs 32x32 Cells)"]
    B --> D["Cuadrantes Espaciales 2x2 (Color RGB/HSV)"]
    B --> E["Histogramas HSV Normalizados (28 Bins)"]
    B --> F["Textura & Nitidez (Sobel + Laplaciano)"]
    C & D & E & F --> G["Vector Híbrido (X_tabular)"]
    G --> H["StandardScaler"]
    H --> I["SVM RBF (80.6% Acc)"]
    H --> J["SVD Pipeline k=35 (79.2% Acc)"]
    H --> K["XGBoost Forest (76.4% Acc)"]
    H --> L["Regresión Logística (75.0% Acc)"]
```

---

## 3. Comparativa de Resultados
- **Dataset:** 360 imágenes balanceadas (180 gatos, 180 perros).
- **Test Set:** 72 muestras independientes estratificadas (36 gatos, 36 perros).
- **Modelo Líder:** SVM con Kernel RBF Calibrado (**80.56% Accuracy**, **80.50% F1-Score**).
- **SVD Espectral:** TruncatedSVD a 35 componentes latentes (**79.17% Accuracy**).
