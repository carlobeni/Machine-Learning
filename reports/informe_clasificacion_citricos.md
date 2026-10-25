# Informe Técnico: Clasificación Automatizada de Cítricos Mediante Visión Computacional y Machine Learning

**Asignatura:** Machine Learning 1 – Facultad de Ingeniería (UNA)  
**Profesor:** Dr. Diego Stalder | **Auxiliar:** Ing. Carlos Benitez  
**Fecha:** Octubre 2026  

---

## 1. Resumen Ejecutivo
En las industrias citrícolas y de empaque de frutas, la clasificación precisa y en tiempo real de frutos es fundamental para el control de calidad y la optimización de procesos de exportación. En este trabajo se diseñó, entrenó y evaluó un pipeline de clasificación de tres variedades clave: **Naranjas** (*Citrus × sinensis*), **Pomelos** (*Citrus × paradisi*) y **Limones** (*Citrus × limon*). Se contrastaron cuatro algoritmos: Regresión Logística Multinomial, Support Vector Machines (SVM RBF), Descomposición en Valores Singulares (SVD Eigen-Citrus) y XGBoost Forest.

---

## 2. Metodología Experimental
### 2.1. Dataset
Se conformó un conjunto balanceado de 120 imágenes (40 por clase) con dimensiones $224 \times 224$ píxeles, conteniendo vistas exteriores y cortes transversales que exponen pulpa y albedo.

### 2.2. Extracción de Descriptores
1. **Histogramas de Color HSV:** 16 bins de Tono (Hue) y 8 bins de Saturación.
2. **Momentos Estadísticos:** Media y varianza en RGB y HSV.
3. **Morfometría:** Relación de aspecto (Aspect Ratio) y circularidad.
4. **Descomposición SVD:** Proyección de imágenes de $64 \times 64$ píxeles sobre los primeros 15 modos singulares.

---

## 3. Resultados y Benchmark Comparativo

| Modelo | Accuracy Test | F1-Score (Weighted) | Latencia Inferencia (ms) | Tiempo de Entrenamiento (s) |
| :--- | :---: | :---: | :---: | :---: |
| **Regresión Logística** | **100.00%** | **1.000** | **0.03 ms** | 0.015 s |
| **SVM (Kernel RBF)** | **100.00%** | **1.000** | **0.03 ms** | 0.003 s |
| **SVD (Eigen-Citrus)** | **93.33%** | **0.933** | **0.12 ms** | 0.006 s |
| **XGBoost Forest** | **100.00%** | **1.000** | **0.08 ms** | 0.055 s |

---

## 4. Discusión
1. **Poder Discriminativo del Color HSV y Morfología:** La combinación de la tonalidad espectral junto con la excentricidad geométrica permite separar perfectamente las tres clases en Regresión Logística, SVM y XGBoost.
2. **Efectividad de SVD:** SVD alcanza un 93.33% de exactitud utilizando únicamente la información cruda de escala de grises sin conocimiento explícito del color, demostrando la potencia de la aproximación de bajo rango de Eckart-Young.

---

## 5. Conclusiones
Se desarrolló una solución integral, exportable a producción en formato API (FastAPI) y Dashboard interactivo (Streamlit), validada bajo estándares rigurosos de Machine Learning.
