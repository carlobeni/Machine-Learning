# Clase 10: Desarrollo y Despliegue de Aplicación Web para el Proyecto Final

Bienvenido/a a la **Clase 10** de la cátedra de **Machine Learning 1** (Facultad de Ingeniería - Universidad Nacional de Asunción).

En esta clase dejamos temporalmente los notebooks analíticos para enfocarnos en la **construcción de la interfaz web y el despliegue del proyecto**, un requisito central evaluado en el **Segundo Examen Parcial** (GitHub Pages / Web con descripción, objetivos y baseline) y en la **Entrega Final** del Proyecto de Curso.

---

## 📌 Enlace al Proyecto de Ejemplo: Rama `project-test`

El código de la aplicación web y la implementación práctica del proyecto de ejemplo se desarrollan en la rama dedicada:

👉 **[Rama `project-test` en GitHub](https://github.com/carlobeni/Machine-Learning/tree/project-test)**

### Estructura de la Rama
La rama `project-test` parte de la misma base modular definida en [`project-template`](https://github.com/carlobeni/Machine-Learning/tree/project-template):

```text
├── notebooks/       # EDA, preprocesamiento, baseline y modelos avanzados
├── data/
│   ├── raw/         # Datos crudos originales
│   └── processed/   # Datos limpios y listos para modelar
├── models/          # Modelos serializados (.pkl, .joblib, .onnx)
├── api/             # API REST de inferencia (FastAPI / Flask)
├── dashboard/       # Dashboard analítico interactivo (Streamlit / Dash)
├── docs/            # Documentación estática y GitHub Pages
├── reports/         # Informes de avance e informe final
├── presentation/    # Diapositivas de la defensa
├── web/             # Aplicación Web Frontend (Next.js)
├── README.md        # Documentación general del proyecto
└── requirements.txt # Dependencias de Python
```

> **Nota:** Esta rama `project-test` se irá enriqueciendo progresivamente con el desarrollo del proyecto de ejemplo para que sirva de guía completa para sus propios proyectos.

### Cómo cambiar a la rama `project-test` en tu máquina local:

```bash
# 1. Asegurarte de tener los últimos cambios remotos
git fetch origin

# 2. Cambiar a la rama project-test
git switch project-test
# o alternativamente:
# git checkout project-test
```

---

## 🚀 Guía Paso a Paso: Node.js, Next.js, GitHub y Vercel

A continuación se detalla el flujo de trabajo completo para construir la aplicación web de tu proyecto de Machine Learning y ponerla en producción en internet.

---

### 1. Instalación de Node.js y npm

Next.js es un framework moderno basado en React que requiere del entorno de ejecución **Node.js** y del gestor de paquetes **npm**.

#### Opción A: Instalador Oficial LTS (Recomendado para principiantes)
1. Ingresa al sitio oficial: **[https://nodejs.org](https://nodejs.org)**.
2. Descarga la versión **LTS (Long Term Support)** recomendada para la mayoría de los usuarios.
3. Ejecuta el instalador (`.msi` en Windows o `.pkg` en macOS) y sigue el asistente con las opciones por defecto.

#### Opción B: Uso de NVM (Node Version Manager - Recomendado para desarrolladores)
Permite instalar y alternar entre múltiples versiones de Node.js fácilmente.

* **En Windows (nvm-windows):**
  ```powershell
  # Instalar mediante winget
  winget install CoreyButler.NVMforWindows

  # O descargar el instalador desde:
  # https://github.com/coreybutler/nvm-windows/releases

  # Instalar y activar la última versión LTS:
  nvm list available
  nvm install 20.18.0
  nvm use 20.18.0
  ```

* **En Linux / macOS:**
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  nvm install --lts
  nvm use --lts
  ```

#### Verificación de la Instalación
Abre una terminal nueva (PowerShell, Git Bash o CMD) y ejecuta:
```bash
node -v   # Debe retornar v18.x, v20.x o superior
npm -v    # Debe retornar v9.x, v10.x o superior
```

---

### 2. Creación y Uso de Next.js

**Next.js** es el framework estándar de la industria para React. Para un proyecto de Machine Learning ofrece ventajas clave:
* **Generación Estática (SSG) y Server-Side Rendering (SSR)** para mostrar métricas, documentación y visualizaciones con alta velocidad y SEO óptimo.
* **App Router** moderno con soporte para componentes cliente y servidor.
* **API Routes** internas para crear proxies o comunicarse directamente con microservicios de Python (FastAPI/Flask).

#### Paso 2.1: Inicializar el Proyecto Next.js
En la raíz de tu proyecto o dentro de una carpeta `web/`:

```bash
# Crear la app Next.js con App Router y Tailwind CSS
npx create-next-app@latest web
```

El instalador te hará una serie de preguntas. La configuración recomendada es:
* **Would you like to use TypeScript?** → Yes *(brinda tipado estricto y menos errores)*
* **Would you like to use ESLint?** → Yes
* **Would you like to use Tailwind CSS?** → Yes *(diseño ágil y profesional)*
* **Would you like your code inside a `src/` directory?** → Yes
* **Would you like to use App Router? (recommended)** → Yes
* **Would you like to use Turbopack?** → Yes / No
* **Customize the import alias (`@/*`)?** → No (default)

#### Paso 2.2: Estructura del Frontend
```text
web/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Plantilla base y metadatos globales
│   │   ├── page.tsx         # Página principal (Dashboard, métricas, baseline)
│   │   ├── predict/
│   │   │   └── page.tsx     # Página con formulario de predicción interactiva
│   │   └── globals.css      # Estilos globales con Tailwind
│   └── components/
│       ├── Header.tsx       # Barra de navegación
│       ├── MetricsCard.tsx  # Tarjetas de Accuracy, F1-Score, AUC
│       └── PredictionForm.tsx # Formulario para inferencia
├── public/                  # Gráficos del EDA, matrices de confusión, curvas ROC
├── package.json             # Dependencias del proyecto
└── next.config.mjs          # Configuración de Next.js
```

#### Paso 2.3: Ejecutar en Entorno de Desarrollo
```bash
cd web
npm run dev
```
Abre tu navegador en **[http://localhost:3000](http://localhost:3000)** para ver tu aplicación en tiempo real con recarga en caliente (*Hot Module Replacement*).

#### Paso 2.4: Conexión con el Modelo Predictivo de ML
Para interactuar con el modelo entrenado, puedes consumir el endpoint de tu API en FastAPI:

```tsx
// Ejemplo de llamada desde un componente React en Next.js
async function obtenerPrediccion(features: number[]) {
  const response = await fetch("https://tu-api-ml.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: features }),
  });
  const data = await response.json();
  return data.prediction;
}
```

---

### 3. Control de Versiones con Git y GitHub

Asegúrate de no subir dependencias ni archivos de compilación agregando un `.gitignore` adecuado en la carpeta `web/`:

```gitignore
# Dependencias de Node
node_modules/
/.pnp
.pnp.js

# Salida de compilación de Next.js
.next/
out/
build/
dist/

# Variables de entorno locales
.env*.local

# Logs
npm-debug.log*
yarn-debug.log*
```

#### Confirmar los cambios en el branch `project-test`:
```bash
# Verificar el estado
git status

# Agregar archivos y confirmar
git add .
git commit -m "feat: implement Next.js frontend for ML project demo"

# Subir al repositorio remoto en la rama project-test
git push origin project-test
```

---

### 4. Despliegue Continuo con Vercel

**Vercel** es la plataforma en la nube creada por los mismos desarrolladores de Next.js. Proporciona alojamiento gratuito, despliegue continuo (CI/CD) automático desde GitHub y certificados SSL automáticos.

#### Paso 4.1: Crear cuenta en Vercel
1. Ve a **[https://vercel.com](https://vercel.com)**.
2. Haz clic en **Sign Up** y selecciona **Continue with GitHub** para vincular tu cuenta.

#### Paso 4.2: Importar el Repositorio
1. En el panel principal (*Dashboard*) de Vercel, haz clic en **"Add New..."** → **"Project"**.
2. En la lista de repositorios de GitHub, busca tu repositorio (por ejemplo, `Machine-Learning` o el nombre de tu proyecto final) y haz clic en **Import**.

#### Paso 4.3: Configurar el Despliegue
En la pantalla de configuración:
1. **Framework Preset:** Vercel detectará automáticamente **Next.js**.
2. **Root Directory:** Si tu frontend está dentro de la subcarpeta `web/`, haz clic en *Edit* y selecciona la carpeta `web`. Si está en la raíz, déjalo en `./`.
3. **Branch:** Asegúrate de seleccionar el branch de despliegue (por ejemplo `project-test` o `main`).
4. **Environment Variables:** Si necesitas definir variables (como la URL de tu backend API), agrégalas en esta sección:
   * Nombre: `NEXT_PUBLIC_API_URL`
   * Valor: `https://tu-api-fastapi.onrender.com`
5. Haz clic en el botón azul **Deploy**.

#### Paso 4.4: Despliegue Automático y Dominio Público
* En menos de dos minutos, Vercel compilará la aplicación y te proporcionará una URL pública segura (ejemplo: `https://mi-proyecto-ml.vercel.app`).
* **CI/CD Integrado:** A partir de ahora, cada vez que hagas `git push` a esa rama, Vercel detectará los cambios, ejecutará `npm run build` y actualizará la página web automáticamente en producción.

---

### 5. Alternativa: Exportación Estática para GitHub Pages

Si el equipo prefiere alojar el sitio exclusivamente en **GitHub Pages** (como se menciona en el Plan de Clases):

1. Modifica `web/next.config.mjs`:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export', // Genera HTML/CSS/JS estático puro en /out
     images: { unoptimized: true },
     basePath: process.env.NODE_ENV === 'production' ? '/Machine-Learning' : '',
   };

   export default nextConfig;
   ```
2. Ejecuta:
   ```bash
   npm run build
   ```
   Esto generará la carpeta `out/`, cuyo contenido puede publicarse en la rama `gh-pages` o en la carpeta `/docs` de tu repositorio.

---

## 📋 Resumen de Entregables Relacionados con la Web

Según el **Plan de Clases de Machine Learning 1**:
1. **Segundo Examen Parcial (20%):** GitHub Page / Web App con descripción del proyecto, problema de ingeniería abordado, objetivos y baseline model.
2. **Entrega Final (30%):** Web App completa en producción con resultados comparativos, matrices de confusión, explicabilidad (SHAP / Feature Importance) y demo interactiva para inferencia en tiempo real.
