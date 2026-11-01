# Clasificador de Gatos y Perros: Aplicación Web con Next.js y Modelos SVD / Machine Learning

> **Rama:** `project-web`  
> Esta rama contiene la **hoja de ruta técnica, arquitectura y guía paso a paso** para el desarrollo y despliegue de una plataforma web moderna utilizando **Next.js (App Router)**, conectada a los modelos de clasificación de animales por **Subespacios SVD (Criterio de Menor Norma Residual)** y algoritmos de Machine Learning (SVM RBF, XGBoost y Regresión Logística).

---

## Índice

1. [Visión General del Proyecto](#1-visión-general-del-proyecto)
2. [Guía de Instalación y Configuración de Node.js](#2-guía-de-instalación-y-configuración-de-nodejs)
   - [Requisitos Previos](#requisitos-previos)
   - [Instalación en Windows](#instalación-en-windows)
   - [Instalación en macOS y Linux](#instalación-en-macos-y-linux)
   - [Verificación del Entorno](#verificación-del-entorno)
   - [Gestores de Paquetes (npm, pnpm, yarn)](#gestores-de-paquetes)
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

El objetivo de la aplicación web es proporcionar una interfaz gráfica intuitiva, rápida y responsive que permita:
- Subir una imagen cualquiera de un gato o perro mediante arrastrar y soltar (*drag & drop*) o explorador de archivos.
- Preprocesar visualmente la imagen mediante **Letterbox Zero-Padding** en una matriz negra de $256 \times 256$ manteniendo la relación de aspecto original sin deformaciones.
- Seleccionar el modelo de clasificación a consultar:
  - **SVD Subespacios (Menor Norma Residual)** con descomposición ortogonal dual.
  - **SVM (Kernel RBF Calibrado)**.
  - **XGBoost Forest (150 Árboles)**.
  - **Regresión Logística Regularizada ($L_2$)**.
- Visualizar los resultados en tiempo real:
  - Etiqueta predicha (`GATO` / `PERRO`) con porcentaje de confianza.
  - En SVD: Normas residuales euclidianas a cada subespacio ($\|\mathbf{e}_{cat}\|_2$ vs $\|\mathbf{e}_{dog}\|_2$) y la diferencia $\Delta = |\|\mathbf{e}_{perro}\| - \|\mathbf{e}_{gato}\||$.
  - Galería comparativa de autovectores (**Eigen-Gatos** y **Eigen-Perros**) y curvas de reconstrucción.

---

## 2. Guía de Instalación y Configuración de Node.js

Para construir y ejecutar aplicaciones con Next.js se requiere el entorno de ejecución **Node.js** (versión LTS recomendada).

### Requisitos Previos
- **Versión de Node.js:** `>= 18.18.0` (se recomienda **Node.js 20 LTS** o superior).
- **Sistema Operativo:** Windows 10/11, macOS o Linux.

---

### Instalación en Windows

Existen tres métodos recomendados para Windows:

#### Método A: Instalador Oficial (.msi) — *El más simple*
1. Ingresa a la página oficial: [nodejs.org](https://nodejs.org/).
2. Descarga la versión **LTS (Long Term Support)** recomendada para la mayoría de usuarios.
3. Ejecuta el archivo `.msi` descargado y sigue el asistente:
   - Acepta los términos de la licencia.
   - Mantén la ruta de instalación por defecto (`C:\Program Files\nodejs\`).
   - Asegúrate de marcar la casilla **"Add to PATH"**.
   - (Opcional) Puedes desmarcar la casilla de instalación de herramientas de compilación C/C++ a menos que requieras compilar módulos nativos.
4. Reinicia la terminal o PowerShell para que reconozca las variables de entorno.

#### Método B: Vía Administrador de Paquetes de Windows (`winget`)
Abre PowerShell como administrador y ejecuta:
```powershell
winget install OpenJS.NodeJS.LTS
```
Cierra y vuelve a abrir PowerShell para aplicar los cambios en el `PATH`.

#### Método C: Usando NVM para Windows (`nvm-windows`) — *Para desarrolladores avanzados*
Si necesitas gestionar múltiples versiones de Node.js:
1. Descarga el instalador desde el repositorio oficial: [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows/releases).
2. Instala y luego ejecuta en PowerShell:
   ```powershell
   nvm install 20.18.0
   nvm use 20.18.0
   ```

---

### Instalación en macOS y Linux

En macOS y distribuciones Linux (Ubuntu/Debian/Fedora), se recomienda usar **nvm** (Node Version Manager):

1. **Instalar NVM:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
   ```
2. **Cargar NVM en la sesión:**
   ```bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```
3. **Instalar y activar la versión LTS de Node.js:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```

*Alternativa en macOS con Homebrew:*
```bash
brew install node@20
```

---

### Verificación del Entorno

Una vez completada la instalación, abre tu terminal y ejecuta:

```bash
node -v
# Ejemplo de salida esperada: v20.18.0 (o superior a v18.18.0)

npm -v
# Ejemplo de salida esperada: 10.8.2
```

Si ambos comandos devuelven sus respectivos números de versión, el entorno Node.js está listo para trabajar con Next.js.

---

### Gestores de Paquetes

Junto con Node.js se incluye automáticamente **`npm`**. Opcionalmente, puedes utilizar gestores más rápidos y eficientes como **`pnpm`**:

```bash
# Para instalar pnpm globalmente:
npm install -g pnpm

# Para verificar:
pnpm -v
```

---

## 3. Paso a Paso: Creación de la Aplicación Web con Next.js

A continuación se detalla el proceso completo para construir la aplicación web desde cero, integrando la UI moderna con la inferencia de los modelos entrenados.

---

### Paso 1: Inicialización del Proyecto Next.js

En la raíz del proyecto, ejecuta el generador oficial de Next.js creando un subdirectorio llamado `web/`:

```bash
npx create-next-app@latest web
```

El asistente interactivo te solicitará la siguiente configuración recomendada:

```text
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like your code inside a `src/` directory? … Yes
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to use Turbopack for next dev? … Yes
✔ Would you like to customize the import alias (@/*)? … No (Enter para @/*)
```

Una vez finalizado, ingresa a la carpeta del proyecto web:
```bash
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
Un microservicio ligero en Python (`backend/api.py`) expone los modelos en el puerto `8000`:
- Utiliza las dependencias ya configuradas en `environment.yml` (`scikit-learn`, `joblib`, `opencv-python`, `xgboost`).
- La API Route de Next.js (`/api/predict`) actúa como intermediario seguro (*BFF - Backend for Frontend*) o la UI consulta directamente el microservicio.

#### Enfoque Alternativo: Proceso Python Spawn vía Node.js
La ruta de API de Next.js (`src/app/api/predict/route.ts`) ejecuta un subproceso de Python mediante `child_process.spawn`, pasando la ruta del archivo temporal y retornando el JSON de salida directamente a la UI sin requerir un servidor permanente adicional.

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

    // Reenviar al microservicio de inferencia Python
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
   - Zona con soporte Drag & Drop usando la librería `react-dropzone` o eventos nativos de HTML5.
   - Restricción a formatos `.jpg`, `.jpeg`, `.png`, `.webp`.
   - Límite de tamaño sugerido: $\le 10	ext{ MB}$.
   - Vista previa inmediata tras la carga.

2. **`CanvasPreview.tsx`**:
   - Dibuja sobre un elemento `<canvas>` HTML5 la imagen centrada sobre una matriz negra de $256 	imes 256$, ilustrando al usuario la técnica de **Letterbox Zero-Padding** que previene distorsiones anatómicas antes de la inferencia.

3. **`ModelSelector.tsx`**:
   - Selector estilizado en forma de pestañas (*segmented control*) para alternar entre:
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
     - Regla de decisión: $\hat{y} = rg\min (\|\mathbf{e}_{cat}\|_2, \|\mathbf{e}_{dog}\|_2)$.
     - Indicador visual del margen de separación $\Delta$.

---

### Paso 6: Estilos y Retroalimentación Visual con Tailwind CSS

Instalar librerías complementarias recomendadas para UI moderna:
```bash
npm install lucide-react clsx tailwind-merge framer-motion
```

- **`lucide-react`**: Íconos modernos para upload, estado de carga, check y alertas.
- **`framer-motion`**: Transiciones fluidas en la revelación de tarjetas de resultados y animaciones de carga.
- **Diseño responsive**: Adaptable a dispositivos móviles, tablets y escritorios con tema oscuro (*Dark Mode*) automático.

---

### Paso 7: Ejecución en Desarrollo y Pruebas Locales

1. **Iniciar el frontend en modo desarrollo:**
   ```bash
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
```bash
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

- **Notebook de Preprocesamiento:** [`data/preprocesamiento_datos.ipynb`](data/preprocesamiento_datos.ipynb) (Acondicionamiento en matriz negra $256 	imes 256$ y extracción de 349 features).
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
