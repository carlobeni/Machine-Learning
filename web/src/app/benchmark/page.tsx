import React from "react";
import BenchmarkTable from "@/components/BenchmarkTable";
import ConfusionMatrixView from "@/components/ConfusionMatrixView";
import MathFormula from "@/components/MathFormula";
import metricsJson from "@/data/metrics.json";
import { MetricsPayload } from "@/lib/types";
import {
  BarChart3,
  FileCode2,
  Sigma,
  Trophy,
  Activity,
  Cpu,
} from "lucide-react";

const data = metricsJson as unknown as MetricsPayload;

export default function BenchmarkPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <BarChart3 className="h-3.5 w-3.5" />
            Sección 5 • Criterio 5 del TP4
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
            Resultados Experimentales, Comparativa Multimodelo y Discusión Analítica
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Evaluación rigurosa sobre el conjunto de prueba independiente (<MathFormula formula="N = 72" /> muestras:
            36 gatos y 36 perros), análisis de matrices de confusión y discusión técnica del desempeño.
          </p>
        </div>

        <a
          href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-4 py-2.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-500/25"
        >
          <FileCode2 className="h-4 w-4" />
          Ver Evaluación en Notebook (.ipynb)
        </a>
      </div>

      {/* 1. Tabla Comparativa Interactiva y Gráfico Multimétrica */}
      <section>
        <BenchmarkTable models={data.models} />
      </section>

      {/* 2. Visualizador Interactivo de Matrices de Confusión */}
      <section>
        <ConfusionMatrixView models={data.models} />
      </section>

      {/* 3. Discusión Analítica y Hallazgos (Los 4 puntos exigidos por Criterio 5 del TP4) */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Análisis Crítico de Resultados
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Discusión Analítica y Hallazgos Experimentales
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 1. ¿Por qué SVD es altamente competitivo? */}
          <div className="rounded-xl border border-indigo-500/30 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-base">
              <Sigma className="h-5 w-5" />
              <h3>1. ¿Por qué SVD es altamente competitivo (79.17% Acc / 83.87% Prec)?</h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">
              El Clasificador de Subespacios SVD alcanza un <strong>79.17% de exactitud global</strong> y lidera todo el
              estudio en <strong>Precisión con 83.87%</strong> (apenas 5 falsos positivos en 36 gatos), superando tanto a{" "}
              <strong>SVM con Kernel RBF (77.78%)</strong> como a <strong>Regresión Logística L2 (75.00%)</strong>.
            </p>
            <p className="text-xs leading-relaxed text-zinc-300">
              Esto se debe a que cada clase posee su propio subespacio ortonormal dedicado (<MathFormula formula="U_{\text{cat}}^{(20)}" /> y{" "}
              <MathFormula formula="U_{\text{dog}}^{(20)}" />) depurado de ruido estocástico mediante la teoría de{" "}
              <strong>Gavish-Donoho</strong>. Al proyectar sobre las 20 direcciones de mayor energía morfológica, el
              subespacio actúa como un filtro paso-bajo espectral que rechaza variaciones espurias de fondo.
            </p>
          </div>

          {/* 2. ¿Por qué XGBoost alcanza el mejor rendimiento global (84.72%)? */}
          <div className="rounded-xl border border-emerald-500/30 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
              <Trophy className="h-5 w-5" />
              <h3>2. ¿Por qué XGBoost logra el mejor rendimiento global (84.72%)?</h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">
              <strong>XGBoost (150 árboles, profundidad 4)</strong> alcanza <strong>84.72% de Accuracy</strong>,{" "}
              <strong>91.67% de Recall</strong> y <strong>85.71% de F1-Score</strong> porque su estructura jerárquica de
              particiones condicionales no lineales captura <strong>interacciones cruzadas de orden superior</strong> entre
              modalidades heterogéneas (por ejemplo, combinando reglas sobre un bloque específico de orientación HOG en las
              orejas condicionado a la varianza Laplaciana del pelaje y al tono HSV).
            </p>
            <p className="text-xs leading-relaxed text-zinc-300">
              Mientras que los hiperplanos lineales (Regresión Logística) o subespacios planos globales ponderan todas las
              coordenadas de forma uniforme, el boosting de gradiente pondera adaptativamente las características más
              discriminantes en regiones locales del espacio <MathFormula formula="\mathbb{R}^{349}" />.
            </p>
          </div>

          {/* 3. Análisis de Overfitting / Underfitting */}
          <div className="rounded-xl border border-amber-500/30 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
              <Activity className="h-5 w-5" />
              <h3>3. Análisis de Overfitting / Underfitting y Brecha Train-Test</h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">
              Debido a que la dimensión del espacio de características (<MathFormula formula="m = 349" />) es superior al
              número de muestras de entrenamiento (<MathFormula formula="N_{\text{train}} = 288" />), el sistema opera en el
              régimen de alta dimensión (<MathFormula formula="m > N" />). Los clasificadores discriminativos alcanzan{" "}
              <strong>98.9% – 100% en entrenamiento</strong> y entre <strong>75.00% y 84.72% en prueba</strong>.
            </p>
            <p className="text-xs leading-relaxed text-zinc-300">
              En el clasificador SVD, el rango <MathFormula formula="r" /> controla directamente el equilibrio{" "}
              <strong>Sesgo-Varianza</strong>: valores muy pequeños (<MathFormula formula="r < 5" />) producen{" "}
              <em>underfitting</em> (~72% Acc) por falta de capacidad expresiva, mientras que rangos excesivos (<MathFormula formula="r > 60" />)
              producen <em>overfitting</em> al memorizar el ruido de entrenamiento y colapsar la norma residual de ambas clases.
              La elección <MathFormula formula="r = 20" /> maximiza la generalización fuera de muestra.
            </p>
          </div>

          {/* 4. Eficiencia Computacional */}
          <div className="rounded-xl border border-violet-500/30 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center gap-2 text-violet-300 font-bold text-base">
              <Cpu className="h-5 w-5" />
              <h3>4. Eficiencia Computacional y Despliegue en Sistemas Embebidos</h3>
            </div>
            <p className="text-xs leading-relaxed text-zinc-300">
              Desde la perspectiva de la <strong>Ingeniería Electrónica</strong>, el Clasificador de Subespacios SVD ofrece una
              ventaja arquitectónica decisiva: su etapa de entrenamiento es <strong>100% determinista y cerrada</strong>{" "}
              (dos factorizaciones SVD sin descenso por gradiente ni búsqueda de hiperparámetros complejos).
            </p>
            <p className="text-xs leading-relaxed text-zinc-300">
              En inferencia, clasificar una nueva muestra requiere únicamente dos productos matriz-vector de dimensión{" "}
              <MathFormula formula="20 \times 349" /> (<MathFormula formula="\approx 13{,}960" /> operaciones en punto flotante,{" "}
              <strong>~0.18 ms</strong>) y dos normas euclidianas <MathFormula formula="\ell_2" />, resultando{" "}
              <strong>8× más veloz que XGBoost</strong> y <strong>5× más veloz que SVM RBF</strong>, ideal para ejecución en
              tiempo real sobre microcontroladores (ARM Cortex-M / ESP32-S3) o FPGAs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

