"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DemoSample } from "@/lib/types";
import MathFormula from "./MathFormula";
import { Sparkles, CheckCircle2, Compass, Layers } from "lucide-react";

interface InteractiveResidualDemoProps {
  samples: DemoSample[];
}

export default function InteractiveResidualDemo({
  samples,
}: InteractiveResidualDemoProps) {
  const [selectedId, setSelectedId] = useState<string>(samples[0]?.id || "gato_000");
  const sample = samples.find((s) => s.id === selectedId) || samples[0];

  const maxNorm = Math.max(sample.norm_cat, sample.norm_dog, 20);
  const catBarWidth = Math.min(100, (sample.norm_cat / maxNorm) * 100);
  const dogBarWidth = Math.min(100, (sample.norm_dog / maxNorm) * 100);
  const isCorrect = sample.pred_svd === sample.true_label;

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
      <div className="flex flex-col justify-between gap-3 border-b border-zinc-800 pb-4 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 mb-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Simulador Interactivo en Cliente (Criterio de Menor Norma Residual)
          </div>
          <h3 className="text-lg font-bold text-zinc-100">
            Demostración en Tiempo Real: Proyección en Subespacios SVD (r = 20)
          </h3>
          <p className="text-xs text-zinc-400">
            Selecciona una muestra del conjunto de prueba independiente para observar las normas residuales euclidianas{" "}
            <MathFormula formula="\|\mathbf{e}_{\text{cat}}\|_2" /> vs.{" "}
            <MathFormula formula="\|\mathbf{e}_{\text{dog}}\|_2" /> y la decisión geométrica.
          </p>
        </div>
      </div>

      {/* Selector de muestras reales del conjunto de test */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">
        {samples.map((s) => {
          const active = s.id === selectedId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSelectedId(s.id)}
              className={`group flex flex-col items-center rounded-xl border p-2 transition-all ${
                active
                  ? "border-indigo-500 bg-indigo-500/15 shadow-md shadow-indigo-500/10"
                  : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
              }`}
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-zinc-800">
                <Image
                  src={s.image_processed}
                  alt={s.filename}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <span className="mt-1.5 text-[11px] font-bold text-zinc-200">
                {s.true_label}
              </span>
              <span className="text-[10px] font-mono text-zinc-400">
                {s.filename}
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel de resultados de la muestra seleccionada */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
        {/* Imagen en Matriz Negra 256x256 y descriptores */}
        <div className="lg:col-span-4 flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
          <div className="relative h-52 w-52 overflow-hidden rounded-xl border border-zinc-700 shadow-inner">
            <Image
              src={sample.image_processed}
              alt={sample.filename}
              fill
              sizes="208px"
              className="object-contain"
            />
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs font-mono text-zinc-400">
              Archivo: <strong className="text-zinc-200">{sample.filename}</strong> (Canvas 256×256)
            </span>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5 text-[11px]">
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-zinc-300">
                Ocupación: {sample.fill_ratio}%
              </span>
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-zinc-300">
                Sobel μ: {sample.grad_mean}
              </span>
              <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2 py-0.5 text-zinc-300">
                Laplacian σ²: {sample.laplacian_var}
              </span>
            </div>
          </div>
        </div>

        {/* Evaluación de Normas Residuales Ortogonales */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-indigo-400" />
                <span className="text-sm font-bold text-zinc-100">
                  Distancia Ortogonal al Subespacio de Clase
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-bold ${
                  isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    : "border-amber-500/40 bg-amber-500/15 text-amber-300"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Decisión SVD: {sample.pred_svd.toUpperCase()} (Real: {sample.true_label})
              </span>
            </div>

            {/* Barra Residual Gatos */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-zinc-300">
                  Norma Residual Subespacio Gatos{" "}
                  <MathFormula formula="\|\mathbf{e}_{\text{cat}}\|_2 = \|(I - U_{\text{cat}} U_{\text{cat}}^T)(\mathbf{x} - \boldsymbol{\mu}_{\text{cat}})\|_2" />
                </span>
                <span className="font-mono font-bold text-indigo-300">
                  {sample.norm_cat.toFixed(4)}
                  {sample.norm_cat < sample.norm_dog && "  ★ Menor Norma"}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    sample.norm_cat < sample.norm_dog
                      ? "bg-emerald-500"
                      : "bg-indigo-500/70"
                  }`}
                  style={{ width: `${catBarWidth}%` }}
                />
              </div>
            </div>

            {/* Barra Residual Perros */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-zinc-300">
                  Norma Residual Subespacio Perros{" "}
                  <MathFormula formula="\|\mathbf{e}_{\text{dog}}\|_2 = \|(I - U_{\text{dog}} U_{\text{dog}}^T)(\mathbf{x} - \boldsymbol{\mu}_{\text{dog}})\|_2" />
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {sample.norm_dog.toFixed(4)}
                  {sample.norm_dog < sample.norm_cat && "  ★ Menor Norma"}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-900 border border-zinc-800">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    sample.norm_dog < sample.norm_cat
                      ? "bg-emerald-500"
                      : "bg-amber-500/70"
                  }`}
                  style={{ width: `${dogBarWidth}%` }}
                />
              </div>
            </div>

            {/* Métricas de margen y confianza Softmax */}
            <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                <span className="text-[11px] text-zinc-400 block">
                  Diferencia de Normas (Δ‖e‖₂)
                </span>
                <span className="font-mono text-base font-bold text-zinc-100">
                  {sample.delta_norm.toFixed(4)}
                </span>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                <span className="text-[11px] text-zinc-400 block">
                  Probabilidad SVD Gato
                </span>
                <span className="font-mono text-base font-bold text-indigo-300">
                  {sample.prob_cat_pct.toFixed(2)}%
                </span>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3">
                <span className="text-[11px] text-zinc-400 block">
                  Probabilidad SVD Perro
                </span>
                <span className="font-mono text-base font-bold text-amber-300">
                  {sample.prob_dog_pct.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Comparación con los otros 3 modelos en la misma muestra */}
            <div className="border-t border-zinc-800/80 pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                Predicciones de modelos de referencia en esta muestra:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-zinc-200">
                  XGBoost: <strong>{sample.pred_xgb}</strong>
                </span>
                <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-zinc-200">
                  SVM RBF: <strong>{sample.pred_svm}</strong>
                </span>
                <span className="rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 font-mono text-zinc-200">
                  Reg. Logística: <strong>{sample.pred_lr}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

