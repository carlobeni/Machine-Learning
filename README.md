# Clasificador de Gatos y Perros: Portal Web de Reportería con Next.js

> **Rama:** `project-web`  
> Esta rama contiene la **hoja de ruta técnica, arquitectura y guía paso a paso** para la creación y despliegue en **Vercel** de una aplicación web moderna de **reportería interactiva y visualización de resultados** construida con **Next.js (Puro Frontend)**.  
> Al ser una solución exclusivamente de reportería, **no requiere APIs, microservicios ni servidores backend**: consume directamente los datos procesados, figuras y métricas generadas por los notebooks para presentarlos en un dashboard interactivo de alto impacto visual.

---

## Índice

1. [Visión del Portal de Reportería (Puro Frontend)](#1-visión-del-portal-de-reportería-puro-frontend)
2. [Guía de Instalación de Node.js en Windows (Paso a Paso Oficial)](#2-guía-de-instalación-de-nodejs-en-windows-paso-a-paso-oficial)
3. [Paso a Paso: Creación de la Aplicación de Reportería con Next.js](#3-paso-a-paso-creación-de-la-aplicación-de-reportería-con-nextjs)
   - [Paso 1: Inicialización del Proyecto Next.js](#paso-1-inicialización-del-proyecto-nextjs)
   - [Paso 2: Estructura del Proyecto Frontend](#paso-2-estructura-del-proyecto-frontend)
   - [Paso 3: Módulos de Reportería y Dashboard](#paso-3-módulos-de-reportería-y-dashboard)
   - [Paso 4: Consumo de Datos Estáticos y Métricas](#paso-4-consumo-de-datos-estáticos-y-métricas)
   - [Paso 5: Componentes Visuales y Estilos con Tailwind CSS](#paso-5-componentes-visuales-y-estilos-con-tailwind-css)
   - [Paso 6: Ejecución y Pruebas Locales en Windows](#paso-6-ejecución-y-pruebas-locales-en-windows)
4. [Guía de Despliegue Exclusivo en Vercel (Sin Docker)](#4-guía-de-despliegue-exclusivo-en-vercel-sin-docker)
   - [Método A: Despliegue desde GitHub (Panel Web de Vercel - Recomendado)](#método-a-despliegue-desde-github-panel-web-de-vercel---recomendado)
   - [Método B: Despliegue Directo desde Terminal con Vercel CLI](#método-b-despliegue-directo-desde-terminal-con-vercel-cli)
   - [Verificación y Dominio en Producción](#verificación-y-dominio-en-producción)
5. [Modelos, Datos y Métricas de Referencia](#5-modelos-datos-y-métricas-de-referencia)
6. [Prompt Maestro de IA para Generar el Portal Web (Requerimientos TP4 FIUNA)](#6-prompt-maestro-de-ia-para-generar-el-portal-web-requerimientos-tp4-fiuna)
   - [Instrucciones de Uso del Prompt](#instrucciones-de-uso-del-prompt)
   - [Prompt Estructurado Copiable](#prompt-estructurado-copiable)

---

## 1. Visión del Portal de Reportería (Puro Frontend)

El objetivo de la plataforma web es comunicar con claridad, rigor y estética los resultados de la investigación y experimentación realizada con Machine Learning:

- **Dashboard Comparativo de Modelos:** Visualización de métricas de desempeño (Accuracy, Precision, Recall, F1-Score) comparando el Clasificador de Subespacios SVD frente a XGBoost, SVM RBF y Regresión Logística.
- **Reporte Matemático del Método SVD:** Presentación interactiva de las curvas de valores singulares en escala logarítmica, energía acumulada al 90%, varianza explicada acumulada y el umbral de corte óptimo de ruido estocástico mediante el teorema de **Gavish-Donoho** ($\tau$).
- **Galería Morfológica de Eigen-Animals:** Demostración visual de los autovectores (**Eigen-Gatos** y **Eigen-Perros**) y cómo se reconstruye una imagen truncada mediante combinaciones lineales ortogonales (Teorema de Eckart-Young).
- **Explorador del Dataset y Preprocesamiento:** Exhibición del acondicionamiento en **Letterbox Zero-Padding ($256 \times 256$)** que preserva la relación de aspecto anatómica sin deformación, junto a la explicación de las 349 características visuales (HOG, HSV, Sobel, Laplacian).
- **Simulador Interactivo en Cliente:** Demostración didáctica que permite al usuario explorar ejemplos y observar en tiempo real el cálculo de normas residuales $\|\mathbf{e}_{cat}\|_2$ vs $\|\mathbf{e}_{dog}\|_2$ y la regla de decisión por **menor norma residual**.

---

## 2. Guía de Instalación de Node.js en Windows (Paso a Paso Oficial)

Para trabajar con Next.js en Windows únicamente necesitas instalar **Node.js** descargando su instalador oficial. Es el proceso estándar de Windows:

### Paso 1: Descargar el Instalador Oficial
1. Abre tu navegador web e ingresa a: **[https://nodejs.org/](https://nodejs.org/)**
2. Haz clic en el botón verde de la izquierda que dice:
   > **LTS (Recomendado para la mayoría / Recommended For Most Users)**  
   *(Descargará automáticamente el archivo oficial para Windows de 64 bits: `node-v20.x.x-x64.msi`).*

### Paso 2: Ejecutar el Asistente de Instalación
1. Ve a tu carpeta de **Descargas** y abre el archivo `.msi` descargado.
2. En la ventana de bienvenida de *Node.js Setup Wizard*, pulsa **Next**.
3. Marca la casilla **"I accept the terms in the License Agreement"** y pulsa **Next**.
4. **Destination Folder:** Deja la ruta por defecto (`C:\Program Files\nodejs\`) y pulsa **Next**.
5. **Custom Setup:** Deja todas las opciones predeterminadas (incluye el runtime, `npm` y la adición al `PATH`) y pulsa **Next**.
6. **Tools for Native Modules (¡IMPORTANTE: Dejar DESMARCADA!):**
   - Verás una pantalla que dice: *"Automatically install the necessary tools. Note that this will also install Chocolatey..."*.
   - **DEJA ESTA CASILLA DESMARCADA (en blanco).**
   - **¿Por qué no es necesario Chocolatey?** Marcar esa opción activa la descarga e instalación automática de Chocolatey, Python nativo y paquetes pesados de compilación en C++ de Visual Studio (~3 a 5 GB extras en disco). Esto **ralentiza enormemente la instalación** (puede demorar de 15 a 30 minutos extras) y **no se necesita en absoluto** para desarrollar la aplicación de reportería web con Next.js, React o Tailwind CSS. Al dejarla desmarcada, la instalación concluye limpiamente en menos de 1 minuto.
   - Pulsa **Next**.
7. Pulsa **Install**. Cuando Windows solicite confirmación de permisos de administrador (*UAC*), selecciona **Sí**.
8. Al completarse la barra, pulsa **Finish**.

### Paso 3: Verificar la Instalación
1. Abre una ventana de **PowerShell** o **Símbolo del sistema (CMD)** (si ya tenías una abierta, ciérrala y ábrela nuevamente).
2. Ejecuta:

```powershell
node -v
# Salida esperada: v20.x.x (o superior a v18.18.0)

npm -v
# Salida esperada: 10.x.x
```

Con esto, el entorno queda completamente listo en Windows.

---

## 3. Paso a Paso: Creación de la Aplicación de Reportería con Next.js

A continuación se detalla cómo crear el proyecto web frontend estructurado para reportería estática e interactiva.

---

### Paso 1: Inicialización del Proyecto Next.js

En la raíz del proyecto, ejecuta el comando oficial de Next.js creando un subdirectorio llamado `web/`:

```powershell
npx create-next-app@latest web
```

Responde en la terminal de Windows con las siguientes opciones recomendadas:

```text
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for next dev? … Yes
✔ Would you like to customize the import alias (@/*)? … No (Enter para @/*)
```

Al finalizar la instalación, ingresa a la carpeta:
```powershell
cd web
```

---

### Paso 2: Estructura del Proyecto Frontend

Organización limpia dentro de `web/` orientada exclusivamente a reportería, visualización y componentes UI:

```
web/
├── public/                         # Activos estáticos
│   ├── figures/                    # Gráficas generadas en models/
│   │   ├── svd_curva_seleccion_dimension.png
│   │   ├── svd_eigen_animals.png
│   │   └── confusion_matrices.png
│   ├── examples/                   # Muestras de prueba de gatos y perros
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Shell general: Header, Navbar de navegación y Footer
│   │   ├── page.tsx                # Página de inicio: Resumen ejecutivo del proyecto
│   │   ├── benchmark/
│   │   │   └── page.tsx            # Reporte comparativo de modelos y matrices de confusión
│   │   ├── svd-theory/
│   │   │   └── page.tsx            # Estudio matemático SVD: Espectro, Gavish-Donoho y subespacios
│   │   ├── eigen-gallery/
│   │   │   └── page.tsx            # Galería interactiva de Eigen-Gatos y Eigen-Perros
│   │   └── dataset/
│   │       └── page.tsx            # Reporte de datos: Letterbox 256x256 y 349 características
│   ├── components/
│   │   ├── Navbar.tsx              # Barra de navegación principal
│   │   ├── MetricCard.tsx          # Card numérica destacada (Accuracy, F1, etc.)
│   │   ├── BenchmarkTable.tsx      # Tabla comparativa interactiva con ordenamiento
│   │   ├── ConfusionMatrixView.tsx # Visualizador de matrices de confusión
│   │   ├── SVDChartsViewer.tsx     # Visualizador detallado de los 6 paneles SVD
│   │   ├── ReconstructionSlider.tsx# Slider interactivo de reconstrucción según rango r
│   │   └── ZeroPaddingVisualizer.tsx # Demostrador visual del canvas 256x256
│   ├── data/
│   │   ├── metrics.json            # Métricas oficiales exportadas de models/metrics.json
│   │   ├── svd_parameters.json     # Parámetros SVD (beta, w_beta, tau, r_optimo)
│   │   └── dataset_summary.json    # Estadísticas del dataset (clases, dimensiones, balance)
│   ├── lib/
│   │   └── types.ts                # Tipos de TypeScript para métricas y datos
│   └── styles/
│       └── globals.css             # Estilos globales y clases de Tailwind CSS
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

### Paso 3: Módulos de Reportería y Dashboard

El portal se divide en 4 módulos temáticos:

1. **Dashboard de Benchmark y Comparativa (`/benchmark`):**
   - Comparación en tabla y gráficos de barras de **Accuracy, Precision, Recall y F1-Score**.
   - Análisis de falsos positivos/negativos a través de las matrices de confusión generadas en `models/confusion_matrices.png`.
   - Conclusiones sobre por qué XGBoost y el Clasificador SVD lideran el desempeño.

2. **Estudio Matemático SVD y Gavish-Donoho (`/svd-theory`):**
   - Explicación interactiva de la descomposición ortogonal dual $\tilde{\mathbf{X}}_{cat}$ y $\tilde{\mathbf{X}}_{dog}$.
   - Gráfica oficial en alta resolución de los **6 paneles SVD**:
     1. Espectro de valores singulares $\sigma_k$ (escala logarítmica).
     2. Energía acumulada con umbral al $90\%$.
     3. Varianza explicada acumulada con líneas de corte al $90\%$ y $95\%$.
     4. Corte duro de Gavish-Donoho en Gatos ($\tau = 21.57 \implies r_{opt} = 31$).
     5. Corte duro de Gavish-Donoho en Perros ($\tau = 16.75 \implies r_{opt} = 40$).
     6. Sweep empírico de exactitud en test vs. dimensión $r$ (pico en $r=20$: $79.17\%$).

3. **Galería Morfológica de Eigen-Animals (`/eigen-gallery`):**
   - Visualización de los rostros medios de gatos y perros.
   - Despliegue de los autovectores principales ($\mathbf{U}_1, \mathbf{U}_2, \mathbf{U}_3, \mathbf{U}_4$) mostrando las bases canónicas morfológicas del pelaje, orejas y ojos.
   - Demostración de reconstrucción truncada (Teorema de Eckart-Young) y reducción del error relativo según aumenta el rango $r$.

4. **Explorador del Dataset y Letterbox (`/dataset`):**
   - Explicación visual de por qué se evita el redimensionamiento anisotrópico arbitrario y cómo la inserción en matriz negra $256 \times 256$ mantiene intactas las proporciones corporales del animal.
   - Desglose de las 349 características tabulares: HOG (forma de orejas y hocico), estadísticas de color RGB/HSV en primer plano, gradientes Sobel, varianza Laplaciana y pirámide de cuadrantes $2 \times 2$.

---

### Paso 4: Consumo de Datos Estáticos y Métricas

Al ser puro frontend, los datos se cargan desde archivos JSON locales estáticos ubicados en `src/data/`, garantizando una carga instantánea y máxima compatibilidad con Vercel:

```typescript
// src/data/metrics.json
{
  "XGBoost Forest (150 Árboles)": {
    "accuracy": 84.72,
    "precision": 80.49,
    "recall": 91.67,
    "f1_score": 85.71,
    "type": "Ensamble no lineal"
  },
  "SVD Subespacios (Menor Norma)": {
    "accuracy": 79.17,
    "precision": 83.87,
    "recall": 72.22,
    "f1_score": 77.61,
    "type": "Método de Subespacios Duales"
  },
  "SVM (Kernel RBF)": {
    "accuracy": 77.78,
    "precision": 79.41,
    "recall": 75.00,
    "f1_score": 77.14,
    "type": "Hiperplano en espacio de Hilbert"
  },
  "Regresión Logística (L2)": {
    "accuracy": 75.00,
    "precision": 71.43,
    "recall": 83.33,
    "f1_score": 76.92,
    "type": "Modelo lineal regularizado"
  }
}
```

Las figuras generadas en `models/*.png` se copian directamente a `web/public/figures/` para ser servidas como imágenes estáticas optimizadas mediante el componente `<Image />` de Next.js.

---

### Paso 5: Componentes Visuales y Estilos con Tailwind CSS

Instalar librerías complementarias recomendadas para UI moderna y gráficos interactivos:

```powershell
npm install lucide-react clsx tailwind-merge recharts
```

- **`lucide-react`**: Íconos modernos para indicadores de rendimiento, tendencias, información matemática y descargas.
- **`recharts`**: Creación de gráficos interactivos de barras y líneas para explorar las métricas y valores singulares sin requerir backend.
- **Diseño responsive con Tailwind CSS:** Compatible con pantallas móviles, tablets y monitores de escritorio, con soporte de modo oscuro (*Dark Mode*) automático.

---

### Paso 6: Ejecución y Pruebas Locales en Windows

1. **Iniciar el servidor de desarrollo local:**
   ```powershell
   npm run dev
   ```
2. **Abrir en el navegador:**
   Ingresa a **[http://localhost:3000](http://localhost:3000)**.
3. Navega por las secciones de métricas, análisis SVD y galería para verificar que las gráficas, tablas y textos carguen correctamente.

---

## 4. Guía de Despliegue Exclusivo en Vercel

> [!IMPORTANT]
> **Despliegue Exclusivo en Vercel (Sin Docker ni Contenedores):**  
> Al tratarse de una solución puramente frontend de reportería estadística e interactiva (sin dependencias de APIs en Python ni microservicios), **se descarta por completo el uso de Docker y contenedores**. El despliegue se gestiona de forma directa, nativa y exclusiva en la plataforma oficial **Vercel**, garantizando compilación automática, distribución en CDN global y tiempo de carga óptimo sin necesidad de infraestructura pesada.

**Vercel** es la plataforma creada por los desarrolladores de Next.js y ofrece el despliegue más rápido, escalable y sin costo para proyectos frontend.

### Método A: Despliegue desde GitHub (Panel Web de Vercel - Recomendado)

Este método conecta tu repositorio directamente con Vercel para generar despliegues continuos automáticos (*CI/CD*) cada vez que haces un `git push`.

1. **Subir los cambios a GitHub:**
   Asegúrate de que la rama `project-web` esté actualizada en tu repositorio de GitHub:
   ```powershell
   git push origin project-web
   ```

2. **Crear o iniciar sesión en Vercel:**
   - Ingresa a **[https://vercel.com/](https://vercel.com/)**.
   - Haz clic en **Sign Up** o **Log In** y selecciona **Continue with GitHub** para vincular tu cuenta.

3. **Importar el Repositorio:**
   - En tu panel de control (*Dashboard*) de Vercel, haz clic en **Add New...** y luego en **Project**.
   - En la lista de repositorios de GitHub, busca `Machine-Learning` (o el nombre de tu repositorio) y haz clic en **Import**.

4. **Configuración del Proyecto en Vercel:**
   - **Project Name:** Puedes dejar el nombre predeterminado o cambiarlo a `clasificador-animales-svd`.
   - **Framework Preset:** Vercel detectará automáticamente **Next.js**.
   - **Root Directory:** *(Muy Importante)* Como el proyecto web estará dentro del subdirectorio `web`, haz clic en **Edit** junto a *Root Directory* y selecciona la carpeta **`web`**.
   - **Build and Output Settings:** Déjalos por defecto:
     - *Build Command:* `next build`
     - *Output Directory:* `.next`
     - *Install Command:* `npm install`
   - **Environment Variables:** No se requieren variables de entorno al ser una plataforma de reportería puramente frontend.

5. **Desplegar:**
   - Haz clic en el botón azul **Deploy**.
   - Vercel compilará la aplicación en aproximadamente 1 minuto. Al finalizar, mostrará una pantalla de celebración con confeti y una captura de tu sitio web en vivo.

---

### Método B: Despliegue Directo desde Terminal con Vercel CLI

Si prefieres desplegar directamente desde PowerShell en Windows sin abrir el navegador:

1. **Instalar Vercel CLI globalmente o ejecutarlo con npx:**
   Desde la carpeta `web/` en PowerShell:
   ```powershell
   npx vercel
   ```

2. **Seguir las preguntas del asistente en la terminal:**
   - *Set up and deploy?* → **y**
   - *Which scope do you want to deploy to?* → Selecciona tu usuario de Vercel.
   - *Link to existing project?* → **n**
   - *What's your project's name?* → Presiona Enter (toma `web` o el nombre que elijas).
   - *In which directory is your code located?* → `./` (Enter).
   - *Want to modify settings?* → **n**

3. **Despliegue a Producción:**
   Para generar la URL definitiva de producción:
   ```powershell
   npx vercel --prod
   ```

---

### Verificación y Dominio en Producción

Una vez completado el despliegue, Vercel te proporcionará una URL pública segura con HTTPS, por ejemplo:
> **`https://clasificador-animales-svd.vercel.app`**

Cualquier persona o evaluador podrá ingresar a ese enlace desde cualquier dispositivo para revisar la reportería interactiva del clasificador.

---

## 5. Modelos, Datos y Métricas de Referencia

La información presentada en la plataforma web refleja los resultados experimentales obtenidos en los notebooks del proyecto:

### Métricas Oficiales sobre el Conjunto de Test ($N=72$ Muestras Independientes)

| Modelo | Accuracy (%) | Precision (%) | Recall (%) | F1-Score (%) | Fundamento Teórico |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **XGBoost Forest (150 Árboles)** | **84.72%** | 80.49% | **91.67%** | **85.71%** | Ensamble no lineal de árboles de decisión |
| **SVD Subespacios (Menor Norma)** | **79.17%** | **83.87%** | 72.22% | **77.61%** | **Distancia ortogonal mínima al subespacio ($\min \|\mathbf{e}\|_2$)** |
| **SVM (Kernel RBF)** | 77.78% | 79.41% | 75.00% | 77.14% | Hiperplano de separación óptimo en espacio de Hilbert |
| **Regresión Logística ($L_2$)** | 75.00% | 71.43% | 83.33% | 76.92% | Función sigmoide lineal regularizada |

### Artefactos Generados en el Repositorio
- **Preprocesamiento:** [`data/preprocesamiento_datos.ipynb`](data/preprocesamiento_datos.ipynb) (Acondicionamiento en canvas negro $256 \times 256$ y extracción de 349 características).
- **Modelado Matemático y SVD:** [`models/clasificacion_subespacios_svd_y_modelos.ipynb`](models/clasificacion_subespacios_svd_y_modelos.ipynb).
- **Gráficas Oficiales:**
  - `models/svd_curva_seleccion_dimension.png` (Análisis de 6 paneles: espectro, energía, varianza, Gavish-Donoho y sweep de rango).
  - `models/svd_eigen_animals.png` (Eigen-Gatos y Eigen-Perros).
  - `models/confusion_matrices.png` (Matrices de confusión).


---

## 6. Prompt Maestro de IA para Generar el Portal Web (Requerimientos TP4 FIUNA)

Este apartado proporciona un **prompt maestro estructurado y detallado** diseñado para ser copiado y entregado directamente a cualquier modelo de Inteligencia Artificial (ChatGPT, Claude, Gemini, Cursor, v0.dev o Antigravity) para construir, estructurar y redactar la aplicación web completa en **Next.js**, dando cumplimiento estricto al **100% de los criterios y rúbrica del Trabajo Práctico 4 (TP4)** de la cátedra de **Machine Learning 1 (FIUNA)**.

---

### Instrucciones de Uso del Prompt

1. **Copia el bloque de texto** contenido dentro de la caja de código inferior (`Prompt Estructurado Copiable`).
2. **Personaliza los campos entre corchetes** con tus datos personales:
   - `[Nombre y Apellido del Integrante 1]`
   - `[correo@ing.una.py]`
   - `[usuario_github]`
   - `[URL_DEL_REPOSITORIO_GITHUB]`
   - `[URL_VERCEL_PRODUCCION]`
3. **Pega el prompt en tu asistente de IA preferido** o en tu IDE (Cursor / Copilot / Claude Dev) para que genere automáticamente el código completo de la interfaz, componentes interactivos y visualizaciones frontend.

---

### Prompt Estructurado Copiable

```markdown
Actúa como un Ingeniero de Software Frontend Senior y Especialista en Machine Learning y Divulgación Científica.
Tu tarea es construir el código completo y los componentes de una aplicación web moderna de reportería científica e interactiva desarrollada con Next.js (App Router), TypeScript y Tailwind CSS para presentar el Proyecto Semestral de la cátedra Machine Learning 1 (FIUNA).

La web debe cumplir de manera rigurosa y exhaustiva con todos los requerimientos formales y rúbrica de evaluación del Trabajo Práctico 4 (TP4) de la Facultad de Ingeniería de la Universidad Nacional de Asunción (FIUNA).

================================================================================
REGLAS ARQUITECTURALES CRÍTICAS (FRONTEND PURO):
================================================================================
1. ARQUITECTURA: Es una aplicación 100% CLIENT-SIDE / STATIC FRONTEND. NO crees APIs en Python, NO crees endpoints `/api/*` de Next.js, NO utilices servidores Flask ni FastAPI. Toda la reportería, gráficas, matrices de confusión y demostraciones interactivas deben consumir datos estáticos JSON pre-exportados (`metrics.json`, `svd_parameters.json`, `dataset_summary.json`) y figuras estáticas en `/public/figures/`.
NO USES DOCKER NI CONTENEDORES: Queda estrictamente descartado el uso de Dockerfile o docker-compose. El despliegue debe ser única y exclusivamente en Vercel.
2. DISEÑO Y ESTILOS: Utiliza Tailwind CSS con una estética moderna, limpia y profesional (inspirada en Shadcn UI / Vercel Design System), tipografía nítida, paleta de colores sobria (zinc/slate con acentos indigo/violet), soporte para Modo Oscuro (Dark Mode) y diseño 100% adaptable a dispositivos móviles (Responsive Design).
3. MATEMÁTICAS: Todas las fórmulas matemáticas deben estar renderizadas con KaTeX o LaTeX impecablemente formateado.
4. REPRODUCIBILIDAD: Todos los módulos deben enlazar a los cuadernos interactivos oficiales (.ipynb) alojados en el repositorio de GitHub.

================================================================================
SECCIONES Y REQUERIMIENTOS FORMALES DEL TP4 A IMPLEMENTAR:
================================================================================

--------------------------------------------------------------------------------
SECCIÓN 1: PORTADA E IDENTIFICACIÓN ACADÉMICA (Criterio 1 del TP4)
--------------------------------------------------------------------------------
- Encabezado institucional destacado:
  * "Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)"
  * "Carrera de Ingeniería Electrónica"
  * "Machine Learning 1 (23433) - Semestre 2026"
- Título formal del proyecto:
  * "Clasificador de Gatos y Perros mediante Análisis de Subespacios SVD (Descomposición en Valores Singulares) y Comparativa Multimodelo"
- Tarjeta de integrantes del equipo:
  * Nombres completos, correos institucionales (@ing.una.py) y enlaces directos a sus perfiles de GitHub.
- Botones de acción principales (Hero Section):
  * [Ver Repositorio en GitHub] (con enlace al repositorio oficial)
  * [Explorar Notebooks (.ipynb)]
  * [Ver Comparativa de Modelos]

--------------------------------------------------------------------------------
SECCIÓN 2: DEFINICIÓN DEL PROBLEMA Y JUSTIFICACIÓN (Criterio 2 del TP4)
--------------------------------------------------------------------------------
- Contextualización del problema real:
  * Desafío de la visión artificial y reconocimiento de patrones en clasificación binaria de animales domésticos (Gatos vs. Perros) bajo alta variabilidad intra-clase (distintas razas, colores, posturas, fondos heterogéneos e iluminación).
- Justificación de Machine Learning frente a heurísticas tradicionales:
  * Explicación de por qué los métodos clásicos basados en filtros fijos o reglas geométricas fallan, y cómo el aprendizaje estadístico y la proyección en subespacios ortogonales permiten modelar la morfología intrínseca de cada clase.
- Tipo de tarea de aprendizaje:
  * Clasificación binaria supervisada (Etiqueta 0: Gato, Etiqueta 1: Perro).
- Objetivos del proyecto:
  * Objetivo General: Diseñar, entrenar y validar un pipeline completo de clasificación de imágenes basado en subespacios SVD y contrastarlo frente a modelos supervisados de referencia (XGBoost, SVM RBF, Regresión Logística).
  * Objetivos Específicos:
    1. Acondicionar las imágenes mediante Letterbox Zero-Padding (256x256) preservando la relación de aspecto anatómica.
    2. Extraer un vector multimodal compacto de 349 características discriminantes (HOG, HSV, Sobel, Laplacian).
    3. Construir las matrices de entrenamiento y obtener las bases ortonormales U_cat y U_dog mediante SVD truncado.
    4. Aplicar el umbral óptimo de Gavish-Donoho para eliminación rigurosa de ruido estocástico en la selección de dimensión.
    5. Implementar el clasificador por mínima norma residual y evaluar su desempeño en un conjunto de test independiente (N=72).

--------------------------------------------------------------------------------
SECCIÓN 3: CONJUNTO DE DATOS Y ANÁLISIS EXPLORATORIO (EDA) (Criterio 3 del TP4)
--------------------------------------------------------------------------------
- Origen y características del dataset:
  * Muestra representativa de 360 imágenes balanceadas (180 gatos y 180 perros) particionadas 80% entrenamiento (288 imágenes) y 20% prueba (72 imágenes) de forma estratificada.
- Preprocesamiento morfológico (Letterbox Padding 256x256):
  * Componente visual interactivo "Antes vs. Después": Visualizar por qué el escalado directo distorsiona la anatomía (alargando o achatando las cabezas) frente a la preservación geométrica lograda al insertar la imagen proporcionalmente en un lienzo negro de 256x256.
- Extracción de características multimodales (349 variables):
  * Desglose didáctico en tarjetas:
    1. HOG (Histogram of Oriented Gradients) - 128 descriptores: Estructura de bordes y silueta.
    2. Histogramas de Color HSV - 128 descriptores: Distribución de tono, saturación y brillo de pelaje y ambiente.
    3. Gradientes de Sobel (Magnitud y Orientación) - 48 descriptores: Transiciones espaciales y contornos finos.
    4. Laplaciano - 45 descriptores: Textura de alta frecuencia y detalles del pelaje.
  * Escalado y normalización: Uso de `StandardScaler` ajustado exclusivamente en entrenamiento para evitar fuga de datos (data leakage), y normalización unitaria para el cálculo de subespacios ortogonales.

--------------------------------------------------------------------------------
SECCIÓN 4: METODOLOGÍA Y MODELADO MATEMÁTICO (Criterio 4 del TP4)
--------------------------------------------------------------------------------
- Fundamento Matemático del Clasificador de Subespacios SVD:
  * Explicación de la Descomposición en Valores Singulares:
    $$A = U \Sigma V^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T$$
  * Construcción de matrices normalizadas de clase $A_{cat} \in \mathbb{R}^{m \times n_c}$ y $A_{dog} \in \mathbb{R}^{m \times n_d}$.
  * Bases ortonormales truncadas a rango $r$: $U_{cat}^{(r)}$ y $U_{dog}^{(r)}$.
  * Proyección ortogonal sobre cada subespacio:
    $$P_k = U_k^{(r)} (U_k^{(r)})^T$$
  * Vector residual y regla de decisión por menor norma residual euclidiana:
    $$\mathbf{e}_k = (I - P_k)\mathbf{x}$$
    $$\hat{y} = \arg\min_{k \in \{cat, dog\}} \|\mathbf{e}_k\|_2$$
- Selección de Dimensionalidad y Análisis del Espectro (6 Paneles SVD):
  * Visor interactivo para examinar las 6 gráficas oficiales:
    1. Espectro de valores singulares $\sigma_i$ en escala semilogarítmica.
    2. Energía acumulada con umbral del 90%.
    3. Varianza explicada acumulada con umbrales al 90% y 95%.
    4. Umbral de corte óptimo de ruido estocástico de Gavish-Donoho:
       $$\tau = \omega(\beta) \sqrt{n} \, \sigma_{med}, \quad \beta = \frac{m}{n}$$
    5. Distribución de varianza explicada individual por componente.
    6. Curva de precisión (Accuracy) en función del rango $r$.
- Galería Interactiva de "Eigen-Animals":
  * Exhibición de los modos principales (Eigen-Gatos y Eigen-Perros) que capturan la "forma media" y variaciones anatómicas dominantes.
  * Slider de reconstrucción (Teorema de Eckart-Young) que muestre la aproximación de rango $r$ desde $r=1$ hasta $r_{opt}$.
- Modelos de Comparativa y Líneas Base (Baselines):
  * XGBoost Classifier: Ensamble no lineal de 150 árboles con boosting de gradiente.
  * SVM (Kernel RBF): Clasificador de margen máximo en espacio de Hilbert dimensional infinito.
  * Regresión Logística (L2): Modelo lineal probabilístico sigmoideo.

--------------------------------------------------------------------------------
SECCIÓN 5: RESULTADOS, COMPARATIVA Y DISCUSIÓN (Criterio 5 del TP4)
--------------------------------------------------------------------------------
- Tabla Comparativa de Rendimiento en Test Set Independiente ($N=72$ muestras):
  Presentar los resultados oficiales en una tabla dinámica e interactiva con resaltado de los mejores valores:
  * XGBoost: Accuracy 84.72% | Precision 80.49% | Recall 91.67% | F1-Score 85.71%
  * SVD Subespacios (Menor Norma): Accuracy 79.17% | Precision 83.87% | Recall 72.22% | F1-Score 77.61%
  * SVM (Kernel RBF): Accuracy 77.78% | Precision 79.41% | Recall 75.00% | F1-Score 77.14%
  * Regresión Logística (L2): Accuracy 75.00% | Precision 71.43% | Recall 83.33% | F1-Score 76.92%
- Visualizador de Matrices de Confusión:
  * Componente con pestañas (Tabs) para alternar entre las matrices de confusión de cada modelo (valores absolutos y tasas porcentuales de Falsos Positivos y Falsos Negativos).
- Discusión Analítica y Hallazgos:
  * ¿Por qué SVD es altamente competitivo? Logra un 79.17% de precisión superando a SVM y Regresión Logística gracias a la compacidad de las bases ortonormales y al umbral óptimo de ruido de Gavish-Donoho.
  * ¿Por qué XGBoost alcanza el mejor rendimiento global (84.72%)? Su estructura jerárquica no lineal captura correlaciones cruzadas complejas entre textura HOG y color HSV que los hiperplanos lineales o subespacios rígidos no pueden separar directamente.
  * Análisis de Overfitting/Underfitting: Evaluación de la brecha Train-Test y estabilidad del modelo.
  * Eficiencia computacional: Comparación de costos en inferencia (SVD únicamente requiere proyecciones matriciales $U U^T \mathbf{x}$ y dos normas $\ell_2$, haciéndolo ultraveloz y óptimo para sistemas embebidos).

--------------------------------------------------------------------------------
SECCIÓN 6: CONCLUSIONES Y TRABAJO FUTURO (Criterio 6 del TP4)
--------------------------------------------------------------------------------
- Conclusiones principales del estudio:
  * Eficacia demostrada de la reducción de dimensionalidad guiada por física/matemática (SVD) frente a algoritmos de caja negra.
  * Importancia crítica de un preprocesamiento que conserve la geometría natural (Letterbox Zero-Padding) frente a distorsiones destructivas.
- Limitaciones del enfoque:
  * Sensibilidad a oclusiones parciales severas, sombras intensas o fondos con texturas muy ricas que distorsionan los histogramas de gradiente.
- Líneas de investigación y trabajo futuro:
  * Incorporación de arquitecturas de Deep Learning (Redes Neuronales Convolucionales - CNNs preentrenadas tipo ResNet / EfficientNet o Vision Transformers).
  * Data Augmentation geométrica y fotométrica en tiempo de entrenamiento.
  * Fusión de características profundas con subespacios ortogonales.

--------------------------------------------------------------------------------
SECCIÓN 7: DEMOSTRADOR DIDÁCTICO EN CLIENTE (Simulador de Clasificación)
--------------------------------------------------------------------------------
- Módulo interactivo "Inspector de Muestra":
  * Permite al usuario seleccionar una muestra de test (ej.: Gato #12 o Perro #05).
  * Muestra la imagen acondicionada en 256x256.
  * Calcula y muestra gráficamente las dos barras de residuo:
    - Residuo al Subespacio de Gatos: $\|\mathbf{e}_{cat}\|_2$
    - Residuo al Subespacio de Perros: $\|\mathbf{e}_{dog}\|_2$
  * Destaca visualmente la regla de decisión: "¿Cuál residuo es menor? -> Predicción: [GATO / PERRO]".

================================================================================
ESTRUCTURA DE ARCHIVOS NEXT.JS ESPERADA:
================================================================================
Genera el código modular y limpio dentro de `src/`:
- `src/app/layout.tsx`: Layout principal con Navbar fija, metadata de SEO y Footer académico de FIUNA.
- `src/app/page.tsx`: Portada, resumen ejecutivo y métricas destacadas.
- `src/app/benchmark/page.tsx`: Dashboard de métricas, tabla comparativa y matrices de confusión.
- `src/app/svd-theory/page.tsx`: Módulo teórico matemático, fórmulas KaTeX y visor de los 6 paneles SVD.
- `src/app/eigen-gallery/page.tsx`: Galería de Eigen-Animals y slider de reconstrucción Eckart-Young.
- `src/app/dataset/page.tsx`: Reporte del dataset, interactivo Letterbox y desglose de 349 features.
- `src/components/*`: Componentes reutilizables (`Navbar.tsx`, `Footer.tsx`, `MetricCard.tsx`, `BenchmarkTable.tsx`, `ConfusionMatrixView.tsx`, `SVDChartsViewer.tsx`, `InteractiveResidualDemo.tsx`).
- `src/data/*`: Archivos JSON con los datos estructurados para carga instantánea.

Entrega código TypeScript 100% tipado, sin errores de compilación, utilizando sintaxis limpia de Tailwind CSS y listo para ser desplegado única y exclusivamente en Vercel (sin Docker ni configuraciones complejas de servidores).
```
