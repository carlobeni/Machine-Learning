# Machine Learning 1 (23433)

### Ingeniería Electrónica con Énfasis en Ciencias de la Computación
#### Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)

---

## Descripción
Repositorio oficial de la Práctica de Machine Learning 1. Contiene ejemplos, plantillas, scripts, conjuntos de datos y código modular orientado a la resolución de problemas en ciencia de datos e ingeniería de machine learning.

---

## Equipo Docente

| Rol | Nombre | Email |
| :--- | :--- | :--- |
| Docente Teoría | Diego Stalder | dstalder@ing.una.py |
| Docente Práctica | Carlos Benítez | carlosbenitez@fiuna.edu.py |

---

## Evaluación y Ponderaciones

| Componente | Ponderación |
| :--- | :--- |
| Cuestionarios y Evaluaciones Rápidas | 10% |
| Trabajos Prácticos (TP1 - TP6) | 10% |
| Primer Examen Parcial | 30% |
| Segundo Examen Parcial | 20% |
| Proyecto Semestral de Curso | 30% |
| **TOTAL** | **100%** |

### Trabajos Prácticos (TPs)
| TP | Descripción |
| :--- | :--- |
| **TP1** | Mi primer repositorio y control de versiones en GitHub |
| **TP2** | Comparación de modelos de regresión y regularización (Ridge, Lasso) |
| **TP3** | Clusterización y clasificación con Máquinas de Vectores de Soporte (SVM) |
| **TP4** | Análisis y similitud de imágenes mediante Análisis de Componentes Principales (PCA) |
| **TP5** | Optimización automatizada de hiperparámetros con Optuna |
| **TP6** | Despliegue en GitHub Pages y presentación del Proyecto Final |

---

## Configuración del Entorno de Desarrollo

Para la realización de los prácticos y del proyecto semestral, utilizaremos **Miniconda** como gestor de paquetes y entornos aislados, en conjunto con **Antigravity IDE** como entorno de desarrollo integrado e impulsado por asistencia inteligente.

### 1. Instalación de Conda (Miniconda)
Conda es un gestor de entornos virtuales y paquetes ampliamente utilizado en ciencia de datos, ingeniería y computación científica. Permite crear entornos aislados con versiones específicas de **Python** y sus librerías, evitando conflictos de dependencias entre proyectos.

1.  **Descargar Miniconda:**  
    Accede directamente al portal oficial y selecciona la versión para Windows (Python 3.12+):  
    [Descarga Oficial de Miniconda](https://docs.anaconda.com/miniconda/)

2.  **Instalación:**  
    Ejecuta el instalador descargado y sigue los pasos recomendados.  
    *Nota para Windows: Se aconseja verificar y marcar la opción "Add Miniconda to PATH" (o utilizar el terminal dedicado Anaconda Prompt/PowerShell) para facilitar la ejecución directa del comando `conda` desde cualquier consola.*

3.  **Verificación del Sistema:**  
    Abre una terminal de Windows (Command Prompt o PowerShell) y confirma la correcta instalación ejecutando:
    ```bash
    conda --version
    ```

---

### 2. Instalación de Antigravity IDE
**Antigravity IDE** es el entorno de desarrollo y codificación asistida inteligente donde redactaremos, analizaremos y ejecutaremos nuestros scripts de Python y cuadernos de Jupyter.

1.  **Descargar e Instalar Antigravity IDE:**  
    Obtén el instalador oficial desde el portal o repositorio autorizado de la plataforma:  
    [Sitio y Documentación Oficial de Antigravity IDE](https://antigravity.google/)

2.  **Integración de Soporte Python & Jupyter:**  
    Antigravity IDE está optimizado de forma nativa para flujos de trabajo en Python e inteligencia artificial. Al abrir tus notebooks (`.ipynb`) o scripts (`.py`), el IDE detectará automáticamente tus entornos de Conda y te permitirá administrar e inspeccionar tus kernels sin necesidad de instalar extensiones de terceros.

---

## Creación y Gestión del Entorno Virtual de Machine Learning

Habiendo instalado [Miniconda](https://docs.anaconda.com/miniconda/) y **Antigravity IDE**, realizaremos los siguientes pasos en terminal para levantar nuestro entorno virtual unificado de trabajo:

1.  **Abrir la terminal:** Inicia tu consola de comandos en Windows.

2.  **Crear un entorno virtual dedicado con Python 3.12:**
    ```bash
    conda create -n ml python=3.12 -y
    ```

3.  **Activar el entorno virtual recién creado:**
    ```bash
    conda activate ml
    ```

4.  **Instalar Poetry dentro de nuestro entorno activo:**  
    Utilizaremos Poetry para una gestión moderna y determinista de nuestras dependencias y librerías científicas:
    ```bash
    pip install poetry
    ```

5.  **Configurar Poetry para utilizar el entorno Conda activo:**  
    Le indicamos a Poetry que **no cree un `.venv` adicional** independiente, sino que instale las librerías directamente sobre el entorno `ml` en uso:
    ```bash
    poetry config virtualenvs.create false --local
    ```
    > Nota: Este paso es fundamental para garantizar que tanto Conda como Poetry compartan el mismo espacio de memoria y librerías.

6.  **Registrar el entorno como Kernel en Jupyter:**  
    Para que nuestros cuadernos interactivos reconozcan el motor `ml`:
    ```bash
    python -m ipykernel install --user --name ml --display-name "Python (ml)"
    ```

---

## Creación de un Workspace y Estructura de Proyecto con Poetry

Siempre que inicien un nuevo trabajo práctico o proyecto semestral, seguirán esta arquitectura limpia modular:

1.  **Crear el directorio raíz para tu proyecto:**
    ```bash
    mkdir proyecto-ml
    cd proyecto-ml
    ```

2.  **Verificar y activar tu entorno de trabajo:**
    ```bash
    conda activate ml
    ```

3.  **Inicializar Poetry en la raíz del proyecto:**  
    Este comando generará tu manifiesto de dependencias en el archivo `pyproject.toml`:
    ```bash
    poetry init --no-interaction
    ```

4.  **Crear la carpeta de código fuente modular (`src`):**
    ```bash
    mkdir src
    ```

5.  **Añadir e instalar el stack científico básico de Machine Learning:**
    ```bash
    poetry add numpy matplotlib scipy pandas ipykernel
    ```

    > Si descargaron o clonaron un repositorio existente que ya incluye un archivo `pyproject.toml` con sus dependencias declaradas, simplemente ejecuten dentro del entorno activo:
    > ```bash
    > poetry install
    > ```
    > Esto sincronizará e instalará de inmediato todo lo requerido sin conflictos.

6.  **Script de prueba preliminar (`src/main.py`):**  
    Crea el archivo `main.py` dentro de tu directorio `src` con la siguiente rutina de verificación numérica:

    ```python
    # Código de verificación inicial con NumPy y Matplotlib
    import numpy as np
    import matplotlib.pyplot as plt

    x = np.linspace(0, 2 * np.pi, 100)
    y = np.sin(x)

    plt.figure(figsize=(7, 3.5))
    plt.plot(x, y, color="#2563EB", linewidth=2, label="sin(x)")
    plt.title("Gráfica elemental de verificación - Entorno ML")
    plt.xlabel("X"); plt.ylabel("Y")
    plt.legend(); plt.grid(True, alpha=0.3)
    plt.show()
    ```

7.  **Ejecución desde terminal:**  
    Desde la raíz del workspace corre el script para visualizar la salida:
    ```bash
    python src/main.py
    ```

8.  **Ejecutar Cuadernos Interactivos (.ipynb) desde Antigravity IDE:**  
    Al abrir o crear un archivo de extensión `.ipynb` dentro del editor:
    - **Seleccionar el Kernel:** Haz clic en el selector de intérprete (esquina superior derecha del cuaderno) y selecciona la opción de kernel.
    - **Elegir tu entorno virtual:** Ubica y selecciona **Python (ml)** de la lista de kernels registrados en Conda.
    - **Verificar en celda:** Ejecuta el siguiente bloque en tu primera celda de código para constatar que todo compila exitosamente:
      ```python
      import numpy as np
      import pandas as pd
      import matplotlib.pyplot as plt
      print("Entorno de Antigravity IDE operativo para Machine Learning 1.")
      ```

---