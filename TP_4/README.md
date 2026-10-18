# Trabajo Práctico 4 (TP4) - Despliegue en GitHub Pages y Presentación del Proyecto Final

### Machine Learning 1 (23433)
#### Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)

---

## Objetivos del Trabajo Práctico

1. **Diseñar y estructurar un portal web estático** público que sirva como documentación técnica, visualización de resultados y divulgación científica del **Proyecto Semestral de Machine Learning**.
2. **Configurar el despliegue automatizado mediante GitHub Pages** a partir del repositorio oficial del proyecto (utilizando la rama `main` o el directorio `docs/`).
3. **Comunicar eficazmente los hallazgos del proyecto**, integrando el planteamiento del problema, análisis exploratorio de datos (EDA), metodología, pipelines de modelos y métricas de desempeño cuantitativas.
4. **Vincular el entorno de experimentación y código fuente** con la página pública, asegurando reproducibilidad y acceso a los cuadernos interactivos o scripts.

---

## Requisitos y Estructura del Sitio en GitHub Pages

El sitio web desplegado en GitHub Pages deberá ser claro, navegable y estructurado con los siguientes bloques mínimos de contenido:

### 1. Portada e Identificación Académica
- **Título formal del Proyecto Semestral.**
- **Datos de los integrantes del equipo:** Nombres completos, correos institucionales y enlaces a sus perfiles profesionales de GitHub.
- **Institución:** Facultad de Ingeniería, Universidad Nacional de Asunción (FIUNA) - Carrera de Ingeniería Electrónica.
- **Materia:** Machine Learning 1 (23433) - Semestre 2026.
- **Enlaces directos:** Botón o enlace visible al repositorio en GitHub del proyecto.

### 2. Definición del Problema y Justificación
- Descripción contextual del problema del mundo real que aborda el proyecto.
- Justificación de la aplicación de técnicas de Machine Learning frente a métodos tradicionales o heurísticos.
- Tipo de tarea de aprendizaje: Clasificación binaria/multiclase, Regresión, Agrupamiento (Clustering), etc.
- Objetivos generales y específicos del trabajo.

### 3. Conjunto de Datos y Análisis Exploratorio (EDA)
- **Fuente de los datos:** Origen del dataset, cantidad total de instancias, número y tipo de variables (numéricas, categóricas, texto, series temporales o imágenes).
- **Preprocesamiento:** Estrategias implementadas para manejo de valores faltantes, detección/tratamiento de valores atípicos (outliers), codificación de variables categóricas (`OneHotEncoder`, `TargetEncoder`, etc.) y escalado (`StandardScaler`, `RobustScaler`).
- **Visualizaciones clave del EDA:** Al menos 2 o 3 gráficos explicados (distribución de variables objetivo, matrices de correlación, dispersión o mapas de calor).

### 4. Metodología y Modelado
- Descripción de los algoritmos de Machine Learning evaluados (ej.: Regresión Logística, SVM, Árboles de Decisión, Random Forest, Gradient Boosting, etc.).
- Estrategia de validación cruzada (`K-Fold`, `StratifiedKFold`) para evitar *data leakage* (fuga de datos).
- Procedimiento de ajuste y optimización de hiperparámetros (ej.: `GridSearchCV`, `RandomizedSearchCV` u `Optuna`).
- Justificación de las métricas de evaluación seleccionadas (Accuracy, F1-Score, AUC-ROC, Precision-Recall, RMSE, MAE, etc.).

### 5. Resultados, Comparativa y Discusión
- **Tabla comparativa de modelos:** Presentación clara del rendimiento de cada algoritmo sobre los conjuntos de validación/prueba.
- **Gráficos de desempeño:** Curvas de Aprendizaje (*Learning Curves*), Matrices de Confusión normalizadas, Curvas ROC o Precision-Recall.
- Análisis crítico de los resultados: ¿Qué modelo obtuvo el mejor rendimiento y por qué? ¿Existe sobreajuste (*overfitting*) o subajuste (*underfitting*)?

### 6. Conclusiones y Trabajo Futuro
- Resumen de las conclusiones principales obtenidas tras el desarrollo del proyecto.
- Limitaciones identificadas en el modelo o en la representatividad de los datos.
- Propuestas concretas de mejora o líneas de investigación futuras.

---

## Guía Paso a Paso para la Configuración en GitHub Pages

1. **Estructura del Proyecto:**
   - Asegúrate de que el repositorio de tu proyecto cuenta con la carpeta `docs/` (como se especifica en la plantilla del proyecto en la rama `project-template`) o mantén los archivos web en la raíz del repositorio.
   - Crea un archivo `index.html` o un `index.md` en dicha ubicación.
2. **Tecnologías Permitidas:**
   - **HTML / CSS / JavaScript nativo:** Para máxima flexibilidad y personalización de estilos.
   - **Markdown con motor Jekyll:** Configuración nativa de GitHub Pages mediante temas oficiales.
   - **Frameworks estáticos:** Sitios generados mediante herramientas como Vite, MkDocs, Docusaurus o Astro.
3. **Activación de GitHub Pages:**
   - Dirígete a la pestaña **Settings** de tu repositorio en GitHub.
   - En el menú lateral izquierdo, haz clic en **Pages**.
   - En **Build and deployment > Source**, selecciona `Deploy from a branch`.
   - Selecciona la rama (ej.: `main`) y la carpeta de origen (`/ (root)` o `/docs`), y presiona **Save**.
4. **Verificación del Despliegue:**
   - Tras unos minutos, GitHub Actions completará el despliegue y mostrará la URL pública activa del sitio:
     ```text
     https://<usuario-o-organizacion>.github.io/<nombre-repositorio>/
     ```

---

## Modalidad y Entrega

- **Canal de Entrega:** Se deberá subir a la plataforma virtual del curso un documento o enlace indicando:
  1. Enlace a la página web oficial en **GitHub Pages**.
  2. Enlace al **repositorio de GitHub** que contiene el código fuente y la documentación.
- **Modalidad:** Grupal (los mismos equipos conformados para el Proyecto Semestral).

---

## Evaluación y Criterios de Calificación

El Trabajo Práctico 4 equivale al **25% de la calificación total de Trabajos Prácticos (2.5 puntos sobre 10)**:

| Criterio | Ponderación | Descripción |
| :--- | :---: | :--- |
| **Despliegue y Funcionalidad** | **20%** | Despliegue exitoso en GitHub Pages, URL pública accesible sin errores 404, enlaces internos y externos funcionales. |
| **Rigor Técnico y Documentación** | **40%** | Claridad y completitud en la formulación del problema, detalle del preprocesamiento, justificación de algoritmos y métricas. |
| **Visualización y Análisis de Resultados** | **25%** | Tablas comparativas claras, gráficos de evaluación (curvas, matrices de confusión) con interpretación analítica adecuada. |
| **Diseño, Estructura y Usabilidad** | **15%** | Estructura visual limpia, lectura cómoda, diseño adaptable a dispositivos móviles (*responsive*) y navegación intuitiva. |
| **TOTAL** | **100% (2.5 pts)** | Ponderación completa del TP4 dentro de la evaluación de Trabajos Prácticos. |
