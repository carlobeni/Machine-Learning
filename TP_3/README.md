# Trabajo Práctico 3 (TP3) - Reducción de Dimensionalidad y Clasificación con PCA y SVD

### Machine Learning 1 (23433)
#### Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)

---

## Objetivos del Trabajo Práctico

1. Comprender los fundamentos matemáticos y computacionales de **Análisis de Componentes Principales (PCA)** y la **Descomposición en Valores Singulares (SVD)** aplicados a visión por computadora y bioingeniería.
2. Aplicar técnicas de compresión y reducción de dimensionalidad preservando la mayor proporción de varianza explicada sobre imágenes médicas de ultrasonido de cáncer de mama (*Breast Ultrasound Images*).
3. Analizar el espectro de valores singulares y seleccionar el número óptimo de componentes principales mediante el codo de varianza acumulada.
4. Diseñar e implementar un modelo de clasificación (ej. SVM o Regresión Logística) sobre el espacio proyectado de menor dimensión y comparar su rendimiento frente al espacio original.

---

## Estructura del Directorio

- `TP3_Consigna.ipynb`: Cuaderno de Jupyter interactivo con el enunciado oficial, celdas de guía y bloques de código a completar por los estudiantes.
- `README.md`: Descripción general, objetivos y rúbrica de evaluación.

---

## Actividades a Desarrollar

1. **Carga y Exploración de Imágenes:**
   - Carga del conjunto de imágenes de ultrasonido mamario.
   - Normalización y aplanado (*flattening*) de matrices 2D a vectores de características.
2. **Descomposición SVD y Cálculo de PCA:**
   - Cálculo de la matriz de covarianza y descomposición matricial $X = U \Sigma V^T$.
   - Gráfica de varianza explicada individual y acumulada.
   - Reconstrucción de imágenes con diferentes números de componentes ($k$) y análisis visual de fidelidad/pérdida.
3. **Clasificación en Espacio Reducido:**
   - Partición estratificada en conjuntos de entrenamiento y prueba.
   - Entrenamiento del clasificador en el espacio de características proyectado.
   - Evaluación métrica: Accuracy, F1-Score, Matriz de Confusión y Curva ROC.
4. **Análisis de Resultados:**
   - Comparación cuantitativa de tiempo computacional y métricas entre el espacio de dimensionalidad completa vs. el espacio reducido.

---

## Instrucciones para la Entrega

1. Abrir el cuaderno `TP_3/TP3_Consigna.ipynb` en **Antigravity IDE** o Jupyter Lab seleccionando el kernel del entorno `ml`.
2. Completar todos los bloques indicados con comentarios de resolución.
3. Ejecutar todas las celdas asegurando que los gráficos, imágenes reconstruidas y tablas métricas se visualicen correctamente.
4. Guardar los cambios y realizar el commit y push correspondiente a su repositorio en GitHub.

---

## Evaluación y Criterios de Calificación

El Trabajo Práctico 3 equivale al **25% de la calificación total de Trabajos Prácticos (2.5 puntos sobre 10)**:

| Componente | Ponderación | Criterios de Evaluación |
| :--- | :---: | :--- |
| **Preprocesamiento y SVD/PCA** | **35%** | Correcta implementación de la descomposición, cálculo de varianza explicada y visualización de reconstrucciones. |
| **Modelado y Clasificación** | **45%** | Implementación del clasificador, ajuste sobre componentes principales y cálculo riguroso de métricas de desempeño. |
| **Análisis Comparativo y Conclusiones** | **20%** | Interpretación crítica de la relación entre compresión de datos, tiempo de cómputo y exactitud diagnóstica. |
| **TOTAL** | **100% (2.5 pts)** | Ponderación completa del TP3 dentro de la evaluación de Trabajos Prácticos. |
