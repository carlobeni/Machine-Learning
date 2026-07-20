# Machine Learning 1 (23433)

### Ingeniería Electronica con Enfasis en Ciencias de la Computación


Este es el repositorio oficial de la Práctica de Machine Learning 1

Aquí se encuentran todas las informaciones, ejemplos, plantillas, scripts, programas, algoritmos, código, y ejemplos relacionados a la materia.


## Instalacion de Conda + VS Code

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

#### Instalación de VS Code (Visual Studio Code)
Es el editor de código (IDE) donde escribiremos y ejecutaremos nuestras rutinas.

1.  **Descarga VS Code:** [Enlace de descarga](https://drive.google.com/open?id=1X9ZI900FQ-AbXGKRc-z1zBdHEPQif-cL&usp=drive_fs)

2.  **Configuración de Extensiones:** Una vez instalado, abre VS Code, ve al icono de **Extensions** (o presiona `Ctrl+Shift+X`) e instala las siguientes extensiones de Microsoft:
    * **Python**
    * **Jupyter**

## Crear entorno virtual con Conda

Habiendo instalado [Miniconda](https://docs.conda.io/en/latest/miniconda.html) (recomendado) o Anaconda + VS Code, para crear un entorno virtual se tienen los siguientes pasos:

1.  Abrir la terminal o consola de Windows.

2.  Crear un entorno virtual con Conda:

```bash
conda create -n ml python=3.12 -y
```

3.  Activar el entorno virtual:

```bash
conda activate ml
```

4.  Instalar Poetry dentro del entorno virtual activo:

```bash
pip install poetry
```

5.  Configurar Poetry para que **NO cree un entorno virtual adicional** y use el entorno Conda activo:

```bash
poetry config virtualenvs.create false --local
```

> ⚠️ Este paso es importante para evitar que Poetry cree un `.venv` independiente.

6.  Registro de entorno en Jupyter
Para que el entorno sea visible en los notebooks:
```bash
python -m ipykernel install --user --name ml --display-name "Python (ml)"
```

---

## Crear un workspace con Poetry integrado al entorno `ml`

1.  Crear el directorio del proyecto:

```bash
mkdir proyecto-ml
cd proyecto-ml
```

2.  Activar el entorno virtual (si no lo está ya):

```bash
conda activate ml
```

3.  Inicializar Poetry en la raíz del proyecto. Esto generará el archivo `pyproject.toml`:

```bash
poetry init --no-interaction
```

4.  Agregar directorio `src` al workspace:

```bash
mkdir src
```

5.  Instalar dependencias y agregarlas al poetry:

```bash
poetry add numpy matplotlib scipy pandas ipykernel
```

> ⚠️ Si el proyecto fue clonado o descargado y ya cuenta con un archivo `pyproject.toml`, para instalar las dependencias debes ejecutar:
> ```bash
> poetry install
> ```
> Las dependencias se instalarán dentro del entorno `ml` y se registrarán en `pyproject.toml`.

6.  Ejemplo de archivo principal, crear un archivo `main.py` dentro del directorio `src` con el siguiente contenido:

```python
# Codigo Hello World de ejemplo con numpy y matplotlib

import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Grafica de sin(x)")
plt.show()
```

7.  Ejecutar el proyecto desde la raíz del proyecto:

```bash
python src/main.py
```

8.  Configuración con Jupyter Notebook
Para ejecutar notebooks (`.ipynb`) utilizando el entorno de Conda y Poetry creado:

-   **Crear o abrir un archivo:** Crea un archivo con extensión `.ipynb`.
-   **Seleccionar el Kernel:** En la esquina superior derecha del editor, haz clic en **"Select Kernel"** (Seleccionar kernel).
-   **Elegir el entorno:** Selecciona **Python (ml)** y busca el entorno que creamos anteriormente: `ml`.
-   **Verificación:** Escribe el siguiente código en una celda y ejecútalo para confirmar que todo funciona:
    ```python
    import numpy as np
    import matplotlib.pyplot as plt
    ```
---