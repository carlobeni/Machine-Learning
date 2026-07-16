# Preparación del Entorno Virtual

## Para la instalación de Conda + VS Code

#### Instalación de Conda
Conda es un **gestor de entornos virtuales y paquetes** ampliamente utilizado en ciencia de datos, ingeniería y computación científica.  
Permite crear entornos aislados con versiones específicas de **Python** y sus librerías, evitando conflictos entre proyectos.

1.  **Descarga Miniconda** (recomendado por ser ligero):  
    [Enlace de descarga](https://drive.google.com/open?id=1iDMDOdSDpe13DB6RUY16saTUqJUDocM0&usp=drive_fs)

2.  **Instalación:** Ejecuta el instalador y sigue los pasos por defecto.  
    *Nota: En Windows, se recomienda marcar la opción "Add Miniconda to PATH" para facilitar el uso en la terminal.*

3.  **Verificación:** Abre una terminal (CMD o PowerShell) y ejecuta:
    ```bash
    conda --version
    ```

4.  **Crear un entorno virtual:**
    ```bash
    conda create -n ml python=3.12
    ```

5.  **Activar el entorno:**
    ```bash
    conda activate ml
    ```

6.  **Instalar dependencias**
    ```bash
    conda install numpy matplotlib scipy pandas ipykernel
    pip install jax jaxlib
    ```
    *(Usamos `pip` para JAX ya que es el método oficial recomendado para obtener las últimas versiones compatibles).*

7. **Registro de entorno en Jupyter**
    ```bash
    python -m ipykernel install --user --name ml --display-name "Python (ml)"
    ```

---

#### Instalación de VS Code (Visual Studio Code)
Es el editor de código (IDE) donde escribiremos y ejecutaremos nuestras rutinas.

1.  **Descarga VS Code:** [Enlace de descarga](https://drive.google.com/open?id=1X9ZI900FQ-AbXGKRc-z1zBdHEPQif-cL&usp=drive_fs)

2.  **Configuración de Extensiones:** Una vez instalado, abre VS Code, ve al icono de **Extensions** (o presiona `Ctrl+Shift+X`) e instala las siguientes extensiones de Microsoft:
    * **Python**
    * **Jupyter**

---

#### Configuración con Jupyter Notebook
Para ejecutar notebooks (`.ipynb`) utilizando el entorno de Conda creado:

1.  **Crear o abrir un archivo:** Crea un archivo con extensión `.ipynb`.
2.  **Seleccionar el Kernel:** En la esquina superior derecha del editor, haz clic en **"Select Kernel"** (Seleccionar kernel).
3.  **Elegir el entorno:** Selecciona **Python (ml)** y busca el entorno que creamos anteriormente: `ml`.
4.  **Verificación:** Escribe el siguiente código en una celda y ejecútalo para confirmar que todo funciona:
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    ```