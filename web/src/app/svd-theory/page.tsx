import React from "react";
import SVDChartsViewer from "@/components/SVDChartsViewer";
import MathFormula from "@/components/MathFormula";
import svdData from "@/data/svd_parameters.json";
import { SVDParametersPayload } from "@/lib/types";
import {
  Sigma,
  FileCode2,
  Cpu,
  Layers,
  CheckCircle2,
  GitBranch,
} from "lucide-react";

const data = svdData as unknown as SVDParametersPayload;

export default function SVDTheoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* Encabezado de la sección */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Sigma className="h-3.5 w-3.5" />
            Sección 4 • Criterio 4 del TP4
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
            Metodología y Modelado Matemático: Clasificador de Subespacios SVD
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Formulación algebraica rigurosa de la Descomposición en Valores Singulares, proyecciones
            ortogonales duales, criterio de decisión por mínima norma residual y truncamiento óptimo de
            Gavish-Donoho.
          </p>
        </div>

        <a
          href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-4 py-2.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-500/25"
        >
          <FileCode2 className="h-4 w-4" />
          Ver Notebook: clasificacion_subespacios_svd_y_modelos.ipynb
        </a>
      </div>

      {/* 1. Fundamento Matemático del Clasificador de Subespacios SVD */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tarjeta 1: Factorización SVD y Matrices de Clase */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Paso 1 & 2 • Factorización Espectral por Clase
          </div>
          <h2 className="text-lg font-bold text-zinc-100">
            Descomposición en Valores Singulares (SVD) y Matrices de Clase
          </h2>
          <p className="text-xs leading-relaxed text-zinc-300">
            Toda matriz real <MathFormula formula="A \in \mathbb{R}^{m \times n}" /> admite una factorización
            espectral exacta en suma de matrices de rango uno ponderadas por sus valores singulares{" "}
            <MathFormula formula="\sigma_1 \ge \sigma_2 \ge \dots \ge \sigma_r > 0" />:
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-3">
            <MathFormula
              formula="A = U \Sigma V^T = \sum_{i=1}^r \sigma_i \mathbf{u}_i \mathbf{v}_i^T"
              display
            />
          </div>
          <p className="text-xs leading-relaxed text-zinc-300">
            Separamos el conjunto de entrenamiento estandarizado en dos matrices de clase centradas respecto a
            sus centroides <MathFormula formula="\boldsymbol{\mu}_{\text{cat}}" /> y{" "}
            <MathFormula formula="\boldsymbol{\mu}_{\text{dog}}" />, con <MathFormula formula="m = 349" />{" "}
            características y <MathFormula formula="n_c = n_d = 144" /> muestras por clase:
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-3">
            <MathFormula
              formula="A_{\text{cat}} \in \mathbb{R}^{349 \times 144}, \qquad A_{\text{dog}} \in \mathbb{R}^{349 \times 144}"
              display
            />
          </div>
        </div>

        {/* Tarjeta 2: Proyección Ortogonal y Menor Norma Residual */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Paso 3 & 4 • Geometría de Subespacios Ortogonales
          </div>
          <h2 className="text-lg font-bold text-zinc-100">
            Proyección Ortogonal <MathFormula formula="P_k" /> y Regla de Mínima Norma Residual
          </h2>
          <p className="text-xs leading-relaxed text-zinc-300">
            Reteniendo las primeras <MathFormula formula="r" /> columnas de <MathFormula formula="U_k" />,
            obtenemos las bases ortonormales truncadas{" "}
            <MathFormula formula="U_{\text{cat}}^{(r)}, U_{\text{dog}}^{(r)} \in \mathbb{R}^{m \times r}" />. El
            operador de proyección ortogonal sobre el subespacio de la clase{" "}
            <MathFormula formula="k \in \{\text{cat}, \text{dog}\}" /> es:
          </p>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/90 p-3">
            <MathFormula formula="P_k = U_k^{(r)} \left(U_k^{(r)}\right)^T" display />
          </div>
          <p className="text-xs leading-relaxed text-zinc-300">
            Para cualquier vector de prueba centrado <MathFormula formula="\mathbf{x}" />, el vector residual
            ortogonal al subespacio <MathFormula formula="k" /> y la regla de decisión por{" "}
            <strong>menor norma residual euclidiana</strong> se definen como:
          </p>
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/15 p-3">
            <MathFormula
              formula="\mathbf{e}_k = (I - P_k)\mathbf{x}, \qquad \hat{y} = \arg\min_{k \in \{\text{cat}, \text{dog}\}} \|\mathbf{e}_k\|_2"
              display
            />
          </div>
        </div>
      </section>

      {/* 2. Teorema de Gavish-Donoho (Umbral Óptimo de Ruido Estocástico) */}
      <section className="rounded-xl border border-indigo-500/30 bg-zinc-900/70 p-6 space-y-4">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Teoría de Matrices Aleatorias (Marchenko-Pastur)
            </span>
            <h2 className="text-xl font-bold text-zinc-100">
              Umbral de Corte Óptimo de Ruido Estocástico de Gavish-Donoho (2014)
            </h2>
            <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed">
              Cuando la desviación estándar del ruido blanco aditivo es desconocida, el umbral asintóticamente óptimo{" "}
              <MathFormula formula="\tau" /> que minimiza el error cuadrático medio de reconstrucción (MSE) se expresa en
              función de la mediana empírica de los valores singulares <MathFormula formula="\sigma_{\text{med}}" /> y la
              relación de aspecto <MathFormula formula="\beta" />:
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-3 shrink-0">
            <MathFormula
              formula="\tau = \omega(\beta)\sqrt{n}\,\sigma_{\text{med}} \equiv \omega(\beta)\,\sigma_{\text{med}}, \quad \beta = \frac{\min(m,n)}{\max(m,n)}"
              display
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[11px] text-zinc-400 block">Relación de Aspecto (β = 144/349)</span>
            <span className="mt-1 font-mono text-xl font-extrabold text-zinc-100">
              β = {data.gavish_donoho.beta}
            </span>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950/80 p-4">
            <span className="text-[11px] text-zinc-400 block">Factor Analítico ω(β)</span>
            <span className="mt-1 font-mono text-xl font-extrabold text-violet-300">
              ω(β) = {data.gavish_donoho.omega_beta}
            </span>
          </div>
          <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/20 p-4">
            <span className="text-[11px] text-indigo-300 block">Corte Subespacio Gatos</span>
            <span className="mt-1 font-mono text-xl font-extrabold text-indigo-200">
              τ = {data.gavish_donoho.cat.tau} → r_opt = {data.gavish_donoho.cat.r_opt}
            </span>
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
            <span className="text-[11px] text-amber-300 block">Corte Subespacio Perros</span>
            <span className="mt-1 font-mono text-xl font-extrabold text-amber-200">
              τ = {data.gavish_donoho.dog.tau} → r_opt = {data.gavish_donoho.dog.r_opt}
            </span>
          </div>
        </div>
      </section>

      {/* 3. Visor Interactivo de los 6 Paneles SVD */}
      <section>
        <SVDChartsViewer data={data} />
      </section>

      {/* 4. Modelos de Comparativa y Líneas Base (Baselines) */}
      <section className="space-y-4">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Modelos Supervisados de Referencia
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Modelos de Comparativa y Líneas Base (Baselines)
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                Ensamble No Lineal
              </span>
              <GitBranch className="h-4 w-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              XGBoost Classifier (150 Árboles)
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              Ensamble aditivo de 150 árboles de decisión con <em>Gradient Boosting</em> (profundidad máxima{" "}
              <MathFormula formula="d=4" />, tasa de aprendizaje <MathFormula formula="\eta=0.05" />, submuestreo
              estocástico 0.8). Captura particiones no lineales jerárquicas entre características de forma y color.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center">
              <MathFormula formula="\hat{y}_i = \sum_{t=1}^{150} f_t(\mathbf{x}_i), \quad f_t \in \mathcal{F}" />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-bold text-indigo-300">
                Métodos de Kernel
              </span>
              <Cpu className="h-4 w-4 text-indigo-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              SVM (Kernel Radial RBF)
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              Clasificador de margen máximo en un espacio de Hilbert de dimensión infinita inducido por el kernel
              Gaussiano (<MathFormula formula="C=10.0, \gamma=\text{'scale'}" />). Permite fronteras de decisión
              suaves y no lineales sobre las 349 variables estandarizadas.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center">
              <MathFormula formula="K(\mathbf{x}, \mathbf{x}') = \exp(-\gamma \|\mathbf{x} - \mathbf{x}'\|_2^2)" />
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-md border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-xs font-bold text-violet-300">
                Baseline Lineal
              </span>
              <Layers className="h-4 w-4 text-violet-400" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Regresión Logística (Regularización L2)
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              Modelo discriminativo lineal probabilístico con función de enlace sigmoidea y penalización cuadrática
              Tikhonov/Ridge (<MathFormula formula="C=1.0" />) para controlar la magnitud de los pesos{" "}
              <MathFormula formula="\|\mathbf{w}\|_2^2" /> en alta dimensión.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-center">
              <MathFormula formula="P(y=1\mid\mathbf{x}) = \frac{1}{1 + \exp(-(\mathbf{w}^T\mathbf{x} + b))}" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

