"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ReconstructionItem } from "@/lib/types";
import MathFormula from "./MathFormula";
import { Sliders, Sparkles, CheckCircle2 } from "lucide-react";

interface ReconstructionSliderProps {
  catReconstructions: ReconstructionItem[];
  dogReconstructions: ReconstructionItem[];
  rOptCat: number;
  rOptDog: number;
}

export default function ReconstructionSlider({
  catReconstructions,
  dogReconstructions,
  rOptCat,
  rOptDog,
}: ReconstructionSliderProps) {
  const [animalClass, setAnimalClass] = useState<"cat" | "dog">("cat");
  const [stepIdx, setStepIdx] = useState<number>(5); // default r = 20

  const items = animalClass === "cat" ? catReconstructions : dogReconstructions;
  const activeItem = items[stepIdx] || items[0];
  const rOpt = animalClass === "cat" ? rOptCat : rOptDog;
  const origImage = animalClass === "cat" ? "/eigen/orig_cat.png" : "/eigen/orig_dog.png";
  const meanImage = animalClass === "cat" ? "/eigen/mean_cat.png" : "/eigen/mean_dog.png";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-4 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 mb-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Teorema de Eckart-Young-Mirsky (Aproximación de Bajo Rango)
          </span>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Sliders className="h-5 w-5 text-indigo-400" />
            Slider Interactivo de Reconstrucción Espectral según Rango r
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Desliza el rango <MathFormula formula="r \in [1, 144]" /> para observar cómo la combinación lineal del animal medio y los primeros{" "}
            <MathFormula formula="r" /> Eigen-Animals reconstruye la morfología facial.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAnimalClass("cat")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              animalClass === "cat"
                ? "bg-indigo-600 text-white shadow-sm"
                : "border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Subespacio Gatos (r_opt = {rOptCat})
          </button>
          <button
            type="button"
            onClick={() => setAnimalClass("dog")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              animalClass === "dog"
                ? "bg-amber-600 text-white shadow-sm"
                : "border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Subespacio Perros (r_opt = {rOptDog})
          </button>
        </div>
      </div>

      {/* Control deslizante de rango r */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-zinc-200">
              Rango de Truncamiento Seleccionado:
            </span>
            <span className="rounded-lg border border-indigo-500/40 bg-indigo-500/20 px-3 py-1 font-mono text-base font-extrabold text-indigo-300">
              r = {activeItem.r}
            </span>
            {activeItem.r === 20 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Rango Óptimo de Clasificación (79.17% Acc)
              </span>
            )}
            {activeItem.r === rOpt && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
                Umbral Gavish-Donoho (r_opt = {rOpt})
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-emerald-300">
              Fidelidad Morfológica: <strong>{activeItem.retention_pct}%</strong>
            </span>
            <span className="text-rose-300">
              Error Relativo Frobenius: <strong>{activeItem.error_pct}%</strong>
            </span>
          </div>
        </div>

        <input
          type="range"
          min={0}
          max={items.length - 1}
          step={1}
          value={stepIdx}
          onChange={(e) => setStepIdx(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer"
          aria-label="Rango de reconstrucción SVD"
        />

        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
          {items.map((it, idx) => (
            <button
              key={it.r}
              type="button"
              onClick={() => setStepIdx(idx)}
              className={`px-1.5 py-0.5 rounded transition ${
                idx === stepIdx
                  ? "bg-indigo-600 text-white font-bold"
                  : "hover:text-zinc-200"
              }`}
            >
              r={it.r}
            </button>
          ))}
        </div>
      </div>

      {/* Visualización de las 3 imágenes: Media + Reconstrucción r + Original */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            1. Vector Centroide (<MathFormula formula="\boldsymbol{\mu}_k" />)
          </span>
          <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-zinc-700">
            <Image
              src={meanImage}
              alt="Animal Medio"
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-400">
            Morfología promedio de las 144 muestras de entrenamiento ({animalClass === "cat" ? "Gato Medio" : "Perro Medio"}).
          </p>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-indigo-500/40 bg-indigo-950/15 p-4 shadow-lg shadow-indigo-500/5">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">
            2. Aproximación Rango r = {activeItem.r} (<MathFormula formula="\hat{\mathbf{x}}^{(r)}" />)
          </span>
          <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-indigo-500/50">
            <Image
              src={activeItem.image}
              alt={`Reconstrucción r=${activeItem.r}`}
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
          <div className="mt-3 text-center">
            <MathFormula
              formula={`\\hat{\\mathbf{x}}^{(${activeItem.r})} = \\boldsymbol{\\mu} + \\sum_{i=1}^{${activeItem.r}} \\langle \\mathbf{x}-\\boldsymbol{\\mu}, \\mathbf{u}_i \\rangle \\mathbf{u}_i`}
            />
          </div>
        </div>

        <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
            3. Muestra Real de Test (<MathFormula formula="\mathbf{x}_{\text{test}}" />)
          </span>
          <div className="relative h-48 w-48 overflow-hidden rounded-xl border border-zinc-700">
            <Image
              src={origImage}
              alt="Muestra Original de Test"
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>
          <p className="mt-3 text-center text-xs text-zinc-400">
            Error relativo actual:{" "}
            <strong className="font-mono text-zinc-200">
              ‖x - x̂‖₂ / ‖x‖₂ = {activeItem.error_pct}%
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}

