# Clasificador de Gatos y Perros: Aplicación Web con Next.js y Modelos SVD / Machine Learning

> **Rama:** `project-web`  
> Esta rama contiene la **hoja de ruta técnica, arquitectura y guía paso a paso** para el desarrollo y despliegue de una plataforma web moderna utilizando **Next.js (App Router)**, conectada a los modelos de clasificación de animales por **Subespacios SVD (Criterio de Menor Norma Residual)** y algoritmos de Machine Learning (SVM RBF, XGBoost y Regresión Logística).

---

## Índice

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Guía de Instalación de Node.js en Windows (Paso a Paso Oficial)](#2-guía-de-instalación-de-nodejs-en-windows-paso-a-paso-oficial)
3. [Paso a Paso: Creación de la Aplicación Web con Next.js](#3-paso-a-paso-creación-de-la-aplicación-web-con-nextjs)
   - [Paso 1: Inicialización del Proyecto Next.js](#paso-1-inicialización-del-proyecto-nextjs)
   - [Paso 2: Estructura de Directorios Recomendada](#paso-2-estructura-de-directorios-recomendada)
   - [Paso 3: Arquitectura de Integración Web - Machine Learning](#paso-3-arquitectura-de-integración-web---machine-learning)
   - [Paso 4: Implementación de la Capa de API (Backend de Inferencia)](#paso-4-implementación-de-la-capa-de-api-backend-de-inferencia)
   - [Paso 5: Diseño y Componentes de la Interfaz de Usuario (UI/UX)](#paso-5-diseño-y-componentes-de-la-interfaz-de-usuario-uiux)
   - [Paso 6: Estilos y Retroalimentación Visual con Tailwind CSS](#paso-6-estilos-y-retroalimentación-visual-con-tailwind-css)
   - [Paso 7: Ejecución en Desarrollo y Pruebas Locales](#paso-7-ejecución-en-desarrollo-y-pruebas-locales)
   - [Paso 8: Compilación para Producción y Despliegue](#paso-8-compilación-para-producción-y-despliegue)
4. [Modelos y Datos Disponibles en el Repositorio](#4-modelos-y-datos-disponibles-en-el-repositorio)
5. [Métricas de Rendimiento de los Modelos](#5-métricas-de-rendimiento-de-los-modelos)

---

## 1. Visión General del Proyecto

El objetivo de la aplicación web es proporcionar una interfaz gráfica intuitiva, moderna y responsive que permita:
- Subir una imagen cualquiera de un gato o perro mediante arrastrar y soltar (*drag & drop*) o explorador de archivos de Windows.
- Preprocesar visualmente la imagen mediante **Letterbox Zero-Padding** en una matriz negra de $256 \times 256$ manteniendo la relación de aspecto original sin deformaciones anatómicas.
- Seleccionar el modelo de clasificación a consultar:
  - **SVD Subespacios (Menor Norma Residual)** con descomposición ortogonal dual.
  - **SVM (Kernel RBF Calibrado)**.
  - **XGBoost Forest (150 Árboles)**.
  - **Regresión Logística Regularizada ($L_2$)**.
- Visualizar los resultados en tiempo real:
  - Etiqueta predicha (`GATO` / `PERRO`) con porcentaje de confianza.
  - En SVD: Normas residuales euclidianas a cada subespacio ($\|\mathbf{e}_{cat}\|_2$ vs $\|\mathbf{e}_{dog}\|_2$) y la diferencia $\Delta = |\|\mathbf{e}_{perro}\| - \|\mathbf{e}_{gato}\||$.
  - Galería interactiva con las componentes base (**Eigen-Gatos** y **Eigen-Perros**) y curvas de reconstrucción.

---

## 2. Guía de Instalación de Node.js en Windows (Paso a Paso Oficial)

Para trabajar con Next.js únicamente necesitas instalar **Node.js** descargando el instalador oficial desde su página web. Es un proceso estándar de Windows tipo *"Siguiente, Siguiente, Finalizar"*.

### Paso 1: Descargar el Instalador Oficial
1. Abre tu navegador web e ingresa a: **[https://nodejs.org/](https://nodejs.org/)**
2. En la página principal verás dos botones verdes grandes. Haz clic en el botón de la izquierda que dice:
   > **LTS (Recomendado para la mayoría / Recommended For Most Users)**  
   *(Esto descargará automáticamente el archivo instalador oficial para Windows de 64 bits, por ejemplo: `node-v20.x.x-x64.msi`).*

### Paso 2: Ejecutar el Asistente de Instalación
1. Ve a tu carpeta de **Descargas** y haz doble clic sobre el archivo `.msi` descargado.
2. En la ventana de bienvenida de *Node.js Setup Wizard*, haz clic en **Next**.
3. Marca la casilla **"I accept the terms in the License Agreement"** y haz clic en **Next**.
4. **Destination Folder:** Deja la ruta por defecto (`C:\Program Files\nodejs\`) y haz clic en **Next**.
5. **Custom Setup:** Deja todas las opciones seleccionadas tal como vienen (esto asegura que `Node.js runtime`, `npm package manager` y `Add to PATH` queden instalados automáticamente) y haz clic en **Next**.
6. **Tools for Native Modules:** Deja la casilla **sin marcar** (no es necesaria para Next.js básico) y haz clic en **Next**.
7. Haz clic en **Install**. Si Windows te muestra una ventana de confirmación de permisos de administrador (*Control de cuentas de usuario*), selecciona **Sí**.
8. Una vez completada la barra de progreso, haz clic en **Finish**.

### Paso 3: Verificar la Instalación
1. Abre una nueva ventana de **PowerShell**, **Símbolo del sistema (CMD)** o la terminal integrada de **VS Code** (si ya tenías una terminal abierta antes de instalar, ciérrala y ábrela nuevamente para que tome las nuevas variables del sistema).
2. Ejecuta los siguientes dos comandos:

```powershell
node -v
```
> **Salida esperada:** Una versión como `v20.x.x` o superior a `v18.18.0`.

```powershell
npm -v
```
> **Salida esperada:** Una versión de npm como `10.x.x`.

Con esto Node.js y npm quedan listos en Windows para ejecutar y desarrollar la aplicación con Next.js.

---

## 3. Paso a Paso: Creación de la Aplicación Web con Next.js

A continuación se detalla la hoja de ruta para construir la plataforma web desde cero, integrando la UI moderna con la inferencia de los modelos entrenados.

---

### Paso 1: Inicialización del Proyecto Next.js

En la raíz del proyecto, ejecuta el comando oficial de Next.js creando un subdirectorio llamado `web/`:

```powershell
npx create-next-app@latest web
```

En la terminal de Windows responde las preguntas interactivas con las siguientes opciones recomendadas:

```text
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for next dev? … Yes
✔ Would you like to customize the import alias (@/*)? … No (Enter para @/*)
```

Al terminar, ingresa a la carpeta creada:
```powershell
cd web
```

---

### Paso 2: Estructura de Directorios Recomendada

La estructura limpia y modular dentro de `web/` seguirá las mejores prácticas del **Next.js App Router**:

```
web/
├── public/                     # Activos estáticos (íconos, logos, imágenes de ejemplo)
│   ├── examples/               # Muestras de prueba de gatos y perros
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout global (Navbar, Footer, Tema oscuro/claro)
│   │   ├── page.tsx            # Página principal: Clasificador interactivo
│   │   ├── metrics/
│   │   │   └── page.tsx        # Página de métricas comparativas y matrices de confusión
│   │   ├── svd-analysis/
│   │   │   └── page.tsx        # Página del estudio matemático SVD y Eigen-Animals
│   │   └── api/
│   │       ├── predict/
│   │       │   └── route.ts    # Endpoint POST para procesar imagen e invocar inferencia
│   │       └── health/
│   │           └── route.ts    # Endpoint de verificación de estado
│   ├── components/
│   │   ├── ImageUploader.tsx   # Zona de carga (Drag & Drop y preview de archivo)
│   │   ├── CanvasPreview.tsx   # Visualizador de la imagen en Letterbox negro 256x256
│   │   ├── ModelSelector.tsx   # Selector de modelo (SVD, SVM, XGBoost, LogReg)
│   │   ├── ResultsCard.tsx     # Card de predicción, confianza y barras de probabilidad
│   │   ├── SVDMetricsView.tsx  # Métricas residuales ||e_cat|| vs ||e_dog|| y delta
│   │   └── Navbar.tsx          # Barra de navegación superior
│   ├── lib/
│   │   ├── types.ts            # Definiciones de TypeScript para predicciones y modelos
│   │   └── constants.ts        # Rutas de endpoints y configuración
│   └── styles/
│       └── globals.css         # Directivas globales de Tailwind CSS
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

### Paso 3: Arquitectura de Integración Web - Machine Learning

Existen dos estrategias estándar para conectar la interfaz web de Next.js con los modelos serializados en `models/` (`.joblib`):

```
┌───────────────────────────────┐               ┌────────────────────────────────┐
│   Next.js Frontend (React)    │  HTTP / JSON  │  API Backend (Python FastAPI)  │
│  - Carga de Imagen (Base64)   │ ────────────> │  - Letterbox 256x256 (OpenCV)  │
│  - Selector de Modelo         │ <──────────── │  - Extracción 349 features     │
│  - Visualización Resultados   │               │  - Inferencia joblib (.predict)│
└───────────────────────────────┘               └────────────────────────────────┘
```

#### Enfoque Recomendado: Microservicio Backend en FastAPI / Flask
Un microservicio ligero en Python expone los modelos en el puerto local `8000`:
- Utiliza las dependencias ya configuradas en el entorno Conda (`scikit-learn`, `joblib`, `opencv-python`, `xgboost`).
- La API Route de Next.js (`/api/predict`) actúa como intermediario seguro (*Backend for Frontend*) o la UI consulta directamente el microservicio.

#### Enfoque Alternativo: Proceso Python Spawn vía Node.js
La ruta de API de Next.js (`src/app/api/predict/route.ts`) ejecuta un subproceso de Python mediante `child_process.spawn`, pasando la ruta del archivo temporal y retornando el JSON de salida directamente a la UI.

---

### Paso 4: Implementación de la Capa de API (Backend de Inferencia)

#### A. Definición de Tipos en TypeScript (`src/lib/types.ts`)
```typescript
export type ModelType = 'svd' | 'svm' | 'xgb' | 'lr';

export interface PredictionResponse {
  success: boolean;
  prediction: 'GATO' | 'PERRO';
  confidence: number;
  probabilities: {
    gatos: number;
    perros: number;
  };
  svdDetails?: {
    normCat: number;
    normDog: number;
    delta: number;
    dimensionR: number;
  };
  processingTimeMs: number;
}
```

#### B. API Route en Next.js (`src/app/api/predict/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File | null;
    const model = (formData.get('model') as string) || 'svd';

    if (!file) {
      return NextResponse.json({ error: 'No se envió ninguna imagen' }, { status: 400 });
    }

    // Reenviar al microservicio de inferencia Python en localhost:8000
    const apiBackendUrl = process.env.PYTHON_API_URL || 'http://localhost:8000/predict';
    const backendForm = new FormData();
    backendForm.append('file', file);
    backendForm.append('model', model);

    const response = await fetch(apiBackendUrl, {
      method: 'POST',
      body: backendForm,
    });

    if (!response.ok) {
      throw new Error(`Error en el servicio Python: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### Paso 5: Diseño y Componentes de la Interfaz de Usuario (UI/UX)

1. **`ImageUploader.tsx`**:
   - Soporte Drag & Drop o explorador de Windows.
   - Restricción a formatos `.jpg`, `.jpeg`, `.png`, `.webp`.
   - Límite de tamaño sugerido: $\le 10\text{ MB}$.
   - Vista previa inmediata tras la carga.

2. **`CanvasPreview.tsx`**:
   - Dibuja sobre un elemento `<canvas>` HTML5 la imagen centrada sobre una matriz negra de $256 \times 256$, ilustrando la técnica de **Letterbox Zero-Padding** que previene distorsiones anatómicas antes de la inferencia.

3. **`ModelSelector.tsx`**:
   - Selector en pestañas para alternar entre:
     - 🐱 **SVD Subespacios** (Algoritmo de menor residuo ortogonal, $r=20$).
     - ⚡ **SVM RBF** (Máquina de soporte vectorial con kernel radial).
     - 🌲 **XGBoost** (Ensamble de 150 árboles de decisión).
     - 📊 **Regresión Logística** (Modelo lineal con regularización $L_2$).

4. **`ResultsCard.tsx` y `SVDMetricsView.tsx`**:
   - Badge destacado con la predicción: `GATO` (azul/violeta) o `PERRO` (naranja/ámbar).
   - Barra de progreso interactiva con porcentaje de confianza.
   - En SVD: Tarjeta analítica detallando:
     - Norma Residual a Gatos: $\|\mathbf{e}_{cat}\|_2$.
     - Norma Residual a Perros: $\|\mathbf{e}_{dog}\|_2$.
     - Regla de decisión: $\hat{y} = \arg\min (\|\mathbf{e}_{cat}\|_2, \|\mathbf{e}_{dog}\|_2)$.
     - Indicador visual del margen de separación $\Delta$.

---

### Paso 6: Estilos y Retroalimentación Visual con Tailwind CSS

Instalar librerías complementarias recomendadas para UI moderna:
```powershell
npm install lucide-react clsx tailwind-merge framer-motion
```

- **`lucide-react`**: Íconos modernos para upload, estado de carga, check y alertas.
- **`framer-motion`**: Transiciones fluidas en la revelación de tarjetas de resultados y animaciones de carga.
- **Diseño responsive**: Adaptable a cualquier resolución con soporte de modo oscuro (*Dark Mode*) automático.

---

### Paso 7: Ejecución en Desarrollo y Pruebas Locales

1. **Iniciar el frontend en modo desarrollo:**
   ```powershell
   npm run dev
   ```
2. **Acceder a la aplicación:**
   Abre tu navegador en [http://localhost:3000](http://localhost:3000).

3. **Pruebas de Inferencia:**
   - Sube una imagen de prueba de `data/processed/gatos/gato_000.jpg` o cualquier fotografía propia.
   - Valida la predicción y los valores de norma residual calculados por SVD.

---

### Paso 8: Compilación para Producción y Despliegue

#### Compilación Estática y Servidor Node:
```powershell
npm run build
npm run start
```

#### Opciones de Despliegue:
1. **Vercel (Frontend Next.js):**
   - Conexión directa con el repositorio de GitHub.
   - Despliegue automático en la red CDN global de Vercel.
2. **Contenedor Docker (Solución completa Full-Stack):**
   - Imagen multi-etapa que contiene tanto el entorno Python para inferencia con OpenCV y Scikit-Learn como el runtime de Node.js sirviendo Next.js en el puerto `3000`.

---

## 4. Modelos y Datos Disponibles en el Repositorio

El backend web se apoyará en los artefactos ya entrenados y validados:

- **Notebook de Preprocesamiento:** [`data/preprocesamiento_datos.ipynb`](data/preprocesamiento_datos.ipynb) (Acondicionamiento en matriz negra $256 \times 256$ y extracción de 349 features).
- **Notebook de Modelos y SVD:** [`models/clasificacion_subespacios_svd_y_modelos.ipynb`](models/clasificacion_subespacios_svd_y_modelos.ipynb).
- **Artefactos Serializados:**
  - `models/svd_pipeline.joblib`: Estimador `SVDSubspaceClassifier` ajustado.
  - `models/svm_rbf.joblib`: Modelo SVM con kernel RBF.
  - `models/xgboost_forest.joblib`: Modelo XGBoost Forest.
  - `models/logistic_regression.joblib`: Modelo de Regresión Logística.
  - `models/scaler.joblib`: Estandarizador `StandardScaler` (349 variables).
  - `models/label_encoder.joblib`: Mapeo de etiquetas (`0: gatos`, `1: perros`).
- **Figuras Oficiales:**
  - `models/svd_curva_seleccion_dimension.png`: 6 paneles de análisis espectral, Gavish-Donoho y sweep de exactitud vs. rango $r$.
  - `models/svd_eigen_animals.png`: Componentes base (Eigen-Gatos vs. Eigen-Perros).
  - `models/confusion_matrices.png`: Matrices de confusión en test ($N=72$).

---

## 5. Métricas de Rendimiento de los Modelos

Evaluadas en el conjunto de prueba independiente ($N=72$ muestras no vistas):

| Modelo | Accuracy (%) | Precision (%) | Recall (%) | F1-Score (%) | Fundamento Matemático |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **XGBoost Forest (150 Árboles)** | **84.72%** | 80.49% | **91.67%** | **85.71%** | Ensamble no lineal de árboles de decisión |
| **SVD Subespacios (Menor Norma)** | **79.17%** | **83.87%** | 72.22% | **77.61%** | **Distancia ortogonal mínima al subespacio ($\min \|\mathbf{e}\|_2$)** |
| **SVM (Kernel RBF)** | 77.78% | 79.41% | 75.00% | 77.14% | Hiperplano de separación óptimo en espacio de Hilbert |
| **Regresión Logística ($L_2$)** | 75.00% | 71.43% | 83.33% | 76.92% | Función sigmoide lineal regularizada |
