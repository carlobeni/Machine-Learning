# Trabajos Prácticos - Machine Learning 1 (23433)

### Ingeniería Electrónica con Énfasis en Ciencias de la Computación
#### Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)

---

## Equipo Docente

| Rol | Nombre | Email |
| :--- | :--- | :--- |
| **Docente Teoría** | Diego Stalder | dstalder@ing.una.py |
| **Docente Práctica** | Carlos Benítez | carlosbenitez@fiuna.edu.py |

---

## Descripción del Repositorio

Esta rama (`TPs`) contiene los enunciados oficiales, conjuntos de datos, cuadernos interactivos de Jupyter (`.ipynb`) y guías paso a paso para el desarrollo y entrega de los **Trabajos Prácticos (TPs)** de la asignatura **Machine Learning 1**.

Para la configuración del entorno virtual de trabajo (`conda` + `poetry`), instalación del **Antigravity IDE** y lineamientos generales del curso, consultar la guía principal en el `README.md` de la rama **`clases`**.

---

## Evaluación y Ponderaciones Redistribuidas

Los Trabajos Prácticos representan un total del **10% de la calificación final del semestre (10 puntos)**. El puntaje se encuentra distribuido equitativamente entre los **4 Trabajos Prácticos del curso**, asignando a cada uno **2.5 puntos (25% de la ponderación de TPs)**:

| TP | Título / Temática Principal | Ponderación en TPs | Ponderación Global | Enlace a la Guía |
| :---: | :--- | :---: | :---: | :---: |
| **TP1** | Configuración del Repositorio y Ecosistema de Desarrollo | **25% (2.5 pts)** | **2.5%** | [Guía TP1](TP_1/README.md) |
| **TP2** | Preprocesamiento de Datos y Regresión Logística Aplicada en FIUNA | **25% (2.5 pts)** | **2.5%** | [Guía TP2](TP_2/README.md) |
| **TP3** | Reducción de Dimensionalidad y Clasificación con PCA y SVD | **25% (2.5 pts)** | **2.5%** | [Guía TP3](TP_3/README.md) |
| **TP4** | Despliegue en GitHub Pages y Presentación del Proyecto Final | **25% (2.5 pts)** | **2.5%** | [Guía TP4](TP_4/README.md) |
| **TOTAL** | **4 Trabajos Prácticos Semestrales** | **100% (10 pts)** | **10%** | |

---

## Síntesis de los Trabajos Prácticos

### [TP1: Configuración del Repositorio y Ecosistema de Desarrollo](TP_1/README.md)
- **Objetivo:** Profesionalización del perfil en GitHub, inicialización y vinculación remota del repositorio académico desde la interfaz de **Antigravity IDE**, estructuración limpia del workspace y verificación del kernel en Python 3.12 con Poetry.
- **Entregables:** URL del repositorio oficial de GitHub del estudiante/equipo con dependencias declaradas y primer notebook ejecutado.

### [TP2: Preprocesamiento de Datos y Regresión Logística Aplicada en FIUNA](TP_2/README.md)
- **Objetivo:** Auditoría no destructiva de integridad sobre más de 64,000 registros académicos de la FIUNA, resolución de 6 preguntas estadísticas exploratorias (retención, firmas, aprobación), construcción de un Pipeline en Scikit-Learn con características polinomiales, Curvas de Aprendizaje (*Learning Curves*) y optimización del umbral de decisión para clasificación.
- **Entregables:** Cuadernos `nb_tp2_parte1_preprocesamiento.ipynb` y `nb_tp2_parte2_regresion_logistica.ipynb` con bloques de código completados y salidas analíticas.

### [TP3: Reducción de Dimensionalidad y Clasificación con PCA y SVD](TP_3/README.md)
- **Objetivo:** Aplicación de Análisis de Componentes Principales (PCA) y Descomposición en Valores Singulares (SVD) para compresión de imágenes médicas de ultrasonido de cáncer de mama (*Breast Ultrasound Images*), análisis de varianza explicada acumulada y entrenamiento de clasificadores en el espacio proyectado de menor dimensión.
- **Entregables:** Cuaderno `TP3_Consigna.ipynb` resuelto con visualizaciones de reconstrucción y comparación de métricas predictivas.

### [TP4: Despliegue en GitHub Pages y Presentación del Proyecto Final](TP_4/README.md)
- **Objetivo:** Puesta en producción y despliegue de un portal web estático público en **GitHub Pages** para la documentación técnica, divulgación y presentación interactiva del **Proyecto Semestral de Machine Learning**, integrando el problema, EDA, pipelines de modelos, tablas comparativas y métricas de desempeño.
- **Entregables:** URL pública del sitio web en GitHub Pages (`https://<usuario>.github.io/<repositorio>/`) y enlace al repositorio del proyecto.

---

## Estructura del Repositorio en esta Rama

```text
.
├── .gitignore
├── README.md
├── TP_1/
│   └── README.md
├── TP_2/
│   ├── README.md
│   ├── nb_tp2_parte1_preprocesamiento.ipynb
│   ├── nb_tp2_parte2_regresion_logistica.ipynb
│   ├── reglamento_nuevo_unificado.csv
│   └── img/
│       ├── confusion_matrix.png
│       ├── learning_curve.png
│       ├── precision_recall_curve.png
│       └── roc_curve.png
├── TP_3/
│   ├── README.md
│   └── TP3_Consigna.ipynb
└── TP_4/
    └── README.md
```

---

## Pautas Generales de Entrega y Calificación

1. **Control de Versiones Formal:** Todas las entregas se realizan exclusivamente mediante enlaces a repositorios públicos de **GitHub**. No se aceptan archivos sueltos por correo ni entregas fuera de plazo.
2. **Reproducibilidad:** Los cuadernos de Jupyter (`.ipynb`) deben comitearse con todas las celdas previamente ejecutadas, asegurando que los gráficos, tablas y salidas numéricas sean directamente legibles en la interfaz web de GitHub.
3. **Limpieza del Repositorio:** El archivo `.gitignore` debe excluir archivos temporales (`.ipynb_checkpoints`), entornos locales (`.venv`, `conda`), artefactos intermedios y soluciones del cuerpo docente.
