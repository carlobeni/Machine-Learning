"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ModelMetric } from "@/lib/types";
import { Grid, CheckCircle2, AlertTriangle, Eye } from "lucide-react";

interface ConfusionMatrixViewProps {
  models: ModelMetric[];
}

export default function ConfusionMatrixView({ models }: ConfusionMatrixViewProps) {
  const [selectedId, setSelectedId] = useState<string>(models[1]?.id || models[0].id);
  const [showStaticFigure, setShowStaticFigure] = useState(false);

  const activeModel = models.find((m) => m.id === selectedId) || models[0];
  const { tn, fp, fn, tp } = activeModel.confusion_matrix;
  const totalCats = tn + fp; // 36
  const totalDogs = fn + tp; // 36
  const total = totalCats + totalDogs; // 72

  const tnRate = ((tn / totalCats) * 100).toFixed(1);
  const fpRate = ((fp / totalCats) * 100).toFixed(1);
  const fnRate = ((fn / totalDogs) * 100).toFixed(1);
  const tpRate = ((tp / totalDogs) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-4 lg:flex-row lg:items-center">
        <div>
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Grid className="h-4 w-4 text-indigo-400" />
            Visualizador Interactivo de Matrices de Confusión (Test Set N = {total})
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Selecciona cada modelo en las pestañas para inspeccionar aciertos, Falsos Positivos (Gato → Perro) y Falsos Negativos (Perro → Gato).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowStaticFigure(!showStaticFigure)}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-indigo-500/50 hover:text-indigo-300"
        >
          <Eye className="h-3.5 w-3.5 text-indigo-400" />
          {showStaticFigure ? "Ver Matriz Interactiva" : "Ver Figura Oficial PNG (4 Paneles)"}
        </button>
      </div>

      {/* Pestañas de selección de modelo */}
      <div className="flex flex-wrap gap-2">
        {models.map((m) => {
          const active = m.id === selectedId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setSelectedId(m.id);
                setShowStaticFigure(false);
              }}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
                active
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                  : "border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {m.shortName} ({m.accuracy.toFixed(2)}%)
            </button>
          );
        })}
      </div>

      {showStaticFigure ? (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <Image
              src="/figures/confusion_matrices.png"
              alt="Matrices de Confusión Oficiales en el Conjunto de Test (N=72)"
              width={1600}
              height={400}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-center text-xs text-zinc-400">
            Figura exportada directamente desde <code>models/clasificacion_subespacios_svd_y_modelos.ipynb</code> (`models/confusion_matrices.png`).
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-center">
          {/* Cuadrícula 2x2 de la Matriz de Confusión */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5">
              <div className="mb-3 flex items-center justify-between text-xs text-zinc-400">
                <span>
                  Modelo activo: <strong className="text-zinc-100">{activeModel.name}</strong>
                </span>
                <span className="font-mono text-indigo-400">
                  Exactitud: {activeModel.accuracy.toFixed(2)}% ({tn + tp}/{total} aciertos)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex items-center justify-center text-xs font-semibold text-zinc-500">
                  Real \ Predicción
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 py-2 text-xs font-bold text-indigo-300">
                  Pred: Gato (0)
                </div>
                <div className="rounded-lg border border-zinc-800 bg-zinc-900/80 py-2 text-xs font-bold text-amber-300">
                  Pred: Perro (1)
                </div>

                {/* Fila Gatos (0) */}
                <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-xs font-bold text-indigo-300">
                  <span>Real: Gato (0)</span>
                  <span className="text-[10px] font-normal text-zinc-400">36 muestras</span>
                </div>
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-4">
                  <div className="text-xs font-semibold uppercase text-emerald-300">
                    Verdadero Negativo (TN)
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-emerald-200">{tn}</div>
                  <div className="mt-1 text-xs font-mono text-emerald-300/90">
                    {tnRate}% Especificidad
                  </div>
                </div>
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4">
                  <div className="text-xs font-semibold uppercase text-rose-300">
                    Falso Positivo (FP)
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-rose-200">{fp}</div>
                  <div className="mt-1 text-xs font-mono text-rose-300/90">
                    {fpRate}% Error Tipo I
                  </div>
                </div>

                {/* Fila Perros (1) */}
                <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 p-2 text-xs font-bold text-amber-300">
                  <span>Real: Perro (1)</span>
                  <span className="text-[10px] font-normal text-zinc-400">36 muestras</span>
                </div>
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <div className="text-xs font-semibold uppercase text-amber-300">
                    Falso Negativo (FN)
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-amber-200">{fn}</div>
                  <div className="mt-1 text-xs font-mono text-amber-300/90">
                    {fnRate}% Error Tipo II
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-4">
                  <div className="text-xs font-semibold uppercase text-emerald-300">
                    Verdadero Positivo (TP)
                  </div>
                  <div className="mt-1 text-3xl font-extrabold text-emerald-200">{tp}</div>
                  <div className="mt-1 text-xs font-mono text-emerald-300/90">
                    {tpRate}% Sensibilidad
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnóstico Analítico del Modelo Seleccionado */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5 space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {activeModel.highlight}
              </div>
              <h4 className="text-sm font-bold text-zinc-100">
                Interpretación Diagnóstica — {activeModel.shortName}
              </h4>
              <p className="text-xs leading-relaxed text-zinc-300">{activeModel.notes}</p>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/70 p-2.5">
                  <span className="text-[11px] text-zinc-400 block">Tasa Falsos Positivos (FPR)</span>
                  <span className="font-mono text-sm font-bold text-rose-300">
                    {fpRate}% ({fp}/36 gatos)
                  </span>
                </div>
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/70 p-2.5">
                  <span className="text-[11px] text-zinc-400 block">Tasa Falsos Negativos (FNR)</span>
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {fnRate}% ({fn}/36 perros)
                  </span>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-xs text-zinc-400 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200">Complejidad en Inferencia:</strong>{" "}
                  <span className="font-mono">{activeModel.inference_complexity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

