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
4. [Guía de Despliegue en Vercel](#4-guía-de-despliegue-en-vercel)
   - [Método A: Despliegue desde GitHub (Panel Web de Vercel - Recomendado)](#método-a-despliegue-desde-github-panel-web-de-vercel---recomendado)
   - [Método B: Despliegue Directo desde Terminal con Vercel CLI](#método-b-despliegue-directo-desde-terminal-con-vercel-cli)
   - [Verificación y Dominio en Producción](#verificación-y-dominio-en-producción)
5. [Modelos, Datos y Métricas de Referencia](#5-modelos-datos-y-métricas-de-referencia)

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
6. **Tools for Native Modules:** Deja la casilla **sin marcar** (no es requerida) y pulsa **Next**.
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

## 4. Guía de Despliegue en Vercel

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
