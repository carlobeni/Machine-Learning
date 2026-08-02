# Trabajo Práctico 1 (TP1): Configuración del Repositorio y Ecosistema de Desarrollo

<h2 align="center">Video guia de TP1</h2>

<p align="center">
  <a href="https://www.youtube.com/watch?v=Vz2Z-n-Cfk0">
    <img
      src="https://i.ytimg.com/vi/Vz2Z-n-Cfk0/maxresdefault.jpg"
      alt="Project Demo"
      width="900"
    />
  </a>
</p>

Para realizar con éxito este primer Trabajo Práctico, se recomienda haber leído y seguido en detalle la guía principal ubicada en el **`README.md` del directorio raíz en la rama `clases`** de este repositorio.

En dicha guía oficial se aborda el procedimiento paso a paso para la configuración del ecosistema técnico que se utilizará a lo largo de todo el semestre en Machine Learning.

---

## Objetivo General del TP1

El objetivo central del **Trabajo Práctico 1** es preparar tu identidad académica en el ecosistema de control de versiones y estructurar de manera guiada el **repositorio maestro en GitHub** que utilizarás para gestionar las sucesivas entregas prácticas de la asignatura (desde el TP1 hasta el TP6 y los experimentos del proyecto).

La creación y vinculación remota del repositorio se realizará de manera simplificada y directa aprovechando las funcionalidades nativas de la interfaz gráfica de **Antigravity IDE**, sin necesidad de ejecutar comandos complejos en consola ni de crear manualmente la estructura previa en la web de GitHub.

---

## Actividades a Desarrollar

### Paso Preliminar: Profesionalización del Perfil en GitHub
Antes de comenzar con la creación del espacio de trabajo en tu equipo, es un requisito obligatorio realizar un ajuste en tu cuenta de usuario directamente desde la página de **GitHub**:
1. **Foto de Perfil Real:** Accede a la configuración de tu perfil web en GitHub e integra una foto real, lúcida y actualizada de tu rostro. Esta medida es fundamental para facilitar una correcta identificación por parte del equipo docente durante el proceso de corrección y seguimiento.
2. **Descripción Académica (Bio):** Redacta e incorpora una descripción concisa en la sección de biografía de tu perfil indicando tu condición académica (por ejemplo, estudiante de Ingeniería Electrónica en la Facultad de Ingeniería de la Universidad Nacional de Asunción, áreas de interés en Inteligencia Artificial y Machine Learning).

### Paso 1: Creación del Directorio Raíz y Workspace Inicial
1. En tu computadora de trabajo, crea un directorio (carpeta) vacío en el sistema de archivos (por ejemplo, con un nombre estandarizado para la asignatura: `ML1-2026-TPs` o equivalente).
2. Abre **Antigravity IDE**, selecciona la opción de abrir carpeta y carga el directorio recién creado para inicializar tu Workspace.
3. Dentro de la carpeta en el IDE, crea directamente el archivo `README.md` e introduce una cabecera con el título y la descripción general del repositorio.
4. Crea en ese mismo nivel un archivo `.gitignore` diseñado para proyectos en Python (asegúrate de excluir carpetas temporales `.ipynb_checkpoints`, entornos virtuales, cachés de bytecode `.pyc` y registros locales de configuración del IDE).

### Paso 2: Creación del Repositorio en GitHub desde Antigravity IDE
En lugar de clonar o crear de forma manual el proyecto en la web, aprovecharemos la integración nativa del editor para publicar tu proyecto con un solo flujo:
1. Dirígete al panel lateral de Control de Versiones (*Source Control / Git*) integrado en la interfaz gráfica de **Antigravity IDE**.
2. Presiona el botón *"Initialize Repository"* para inicializar el repositorio local en tu workspace actual.
3. Prepara los archivos creados en el Paso 1 (`README.md` y `.gitignore`) y registra tu primer commit con un mensaje descriptivo (ej: "Inicialización del repositorio del curso").
4. Haz clic en la opción nativa de **"Publish to GitHub"** o **"Publish Branch"** ofrecida de forma visual por Antigravity IDE.
   - El editor te guiará o autenticará si es la primera vez, y generará automáticamente de forma remota tu repositorio oficial de GitHub de manera instantánea, subiendo los archivos base.

### Paso 4: Estructura Modular del Repositorio
Organiza el directorio de tu Workspace creando las carpetas y módulos para los Trabajos Prácticos del semestre, los cuales deberán reposar directamente dentro de la carpeta raíz y sin contenedores intermedio:
```text
ML1-2026-TPs/
├── README.md
├── .gitignore
├── TP_1/
│   └── notebook_test_tp1.ipynb
├── TP_2/
├── TP_3/
├── TP_4/
├── TP_5/
└── TP_6/
```

### Paso 5: Verificación y Primer Notebook Experimental
1. Dentro de tu nueva carpeta `TP_1/`, crea un primer cuaderno experimental en formato Jupyter (por ejemplo, `notebook_test_tp1.ipynb`).
2. Mediante el selector de entornos en **Antigravity IDE**, escoge y vincula como kernel de ejecución a tu entorno virtual de Conda / Poetry actual.
3. Añade una celda inicial de validación que imprima y compruebe la correcta instalación y funcionamiento del intérprete y las dependencias de Python:
   ```python
   import sys
   import numpy as np
   import pandas as pd
   import sklearn

   print("Versión del Intérprete Python:", sys.version)
   print("Versión de NumPy:", np.__version__)
   print("Versión de Pandas:", pd.__version__)
   print("Versión de Scikit-learn:", sklearn.__version__)
   print("¡El Workspace en Antigravity IDE y el entorno virtual se ejecutan correctamente!")
   ```

---

## 4. Modalidad y Entrega

- **Canal de Entrega:** Se deberá subir a la plataforma virtual del curso el enlace web oficial (URL) que apunte al repositorio de GitHub recién publicado por el estudiante o grupo.
- **Criterios de Validación Técnica:** Durante la evaluación del Trabajo Práctico 1, el equipo docente comprobará rigurosamente que:
  1. El perfil de usuario en GitHub cuente de forma visible y clara con la **foto real** del estudiante y su correspondiente **descripción biográfica/académica**.
  2. El repositorio disponga del archivo `pyproject.toml` y `poetry.lock`, certificando el manejo formal del ecosistema con Poetry de acuerdo con la guía de clases.
  3. Los directorios correspondientes (`TP_1` a `TP_6`) estén distribuidos de forma limpia en la raíz del proyecto de GitHub y el cuaderno experimental presente su ejecución verificable de manera pública.
