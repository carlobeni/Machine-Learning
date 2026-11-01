"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LetterboxExample } from "@/lib/types";
import MathFormula from "./MathFormula";
import { Maximize2, AlertOctagon, CheckCircle2, SlidersHorizontal } from "lucide-react";

interface ZeroPaddingVisualizerProps {
  examples: LetterboxExample[];
}

export default function ZeroPaddingVisualizer({
  examples,
}: ZeroPaddingVisualizerProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const item = examples[selectedIdx] || examples[0];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-4 lg:flex-row lg:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 mb-1.5">
            <Maximize2 className="h-3.5 w-3.5" />
            Componente Visual Interactivo: Antes vs. Después
          </span>
          <h3 className="text-lg font-bold text-zinc-100">
            Preprocesamiento Morfológico: Letterbox Zero-Padding (256 × 256 px)
          </h3>
          <p className="text-xs text-zinc-400">
            Compara por qué el escalado anisotrópico directo deforma los rasgos craneofaciales frente a la preservación geométrica exacta en matriz negra.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setSelectedIdx(i)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition ${
                selectedIdx === i
                  ? "bg-indigo-600 text-white"
                  : "border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Muestra {ex.label} ({ex.raw_width}×{ex.raw_height} px)
            </button>
          ))}
        </div>
      </div>

      {/* Comparativa Triple + Cortina Interactiva */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Columna izquierda: 3 etapas lado a lado */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* 1. Imagen Cruda Original */}
          <div className="flex flex-col rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200">1. Imagen Original</span>
              <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                {item.raw_width}×{item.raw_height}
              </span>
            </div>
            <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-800/80 bg-zinc-900/40">
              <Image
                src={item.image_raw}
                alt="Original"
                fill
                sizes="240px"
                className="object-contain p-1"
              />
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-zinc-400">
              Resolución arbitraria de entrada con relación de aspecto natural{" "}
              <span className="font-mono text-zinc-200">
                AR = {(item.raw_width / item.raw_height).toFixed(2)}
              </span>.
            </p>
          </div>

          {/* 2. Resize Directo (Deformación Anisotrópica) */}
          <div className="flex flex-col rounded-xl border border-rose-500/30 bg-rose-950/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300 flex items-center gap-1">
                <AlertOctagon className="h-3.5 w-3.5" />
                2. Resize Directo (Mal)
              </span>
              <span className="rounded bg-rose-500/20 px-1.5 py-0.5 font-mono text-[10px] text-rose-200">
                256×256
              </span>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-rose-500/30 bg-zinc-900">
              <Image
                src={item.image_stretched}
                alt="Distorsionada"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-rose-200/80">
              <strong>Deformación destructiva:</strong> Altera los ángulos de los gradientes HOG, ensanchando o achatando artificialmente el cráneo y las orejas.
            </p>
          </div>

          {/* 3. Letterbox Zero-Padding (Correcto) */}
          <div className="flex flex-col rounded-xl border border-emerald-500/40 bg-emerald-950/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                3. Letterbox (Óptimo)
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-[10px] text-emerald-200">
                256×256
              </span>
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-lg border border-emerald-500/40 bg-black">
              <Image
                src={item.image_letterbox}
                alt="Letterbox 256x256"
                fill
                sizes="240px"
                className="object-contain"
              />
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-emerald-200/80">
              <strong>Preservación isométrica:</strong> Factor{" "}
              <span className="font-mono">s = {item.scale_factor}</span>, insertado en{" "}
              <span className="font-mono">
                ({item.pad_x}, {item.pad_y})
              </span>{" "}
              sobre lienzo de ceros.
            </p>
          </div>
        </div>

        {/* Columna derecha: Cortina interactiva Antes vs Después y formulación matemática */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-indigo-400" />
              Cortina Interactiva: Deformado vs. Letterbox
            </span>
            <span className="font-mono text-xs text-indigo-400">{sliderPos}%</span>
          </div>

          <div className="relative mx-auto h-52 w-52 overflow-hidden rounded-xl border border-zinc-700 select-none">
            {/* Imagen base: Letterbox (Derecha) */}
            <Image
              src={item.image_letterbox}
              alt="Letterbox"
              fill
              sizes="208px"
              className="object-cover"
            />
            {/* Imagen superpuesta recortada: Stretched (Izquierda) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-indigo-400"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative h-52 w-52">
                <Image
                  src={item.image_stretched}
                  alt="Stretched"
                  fill
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
            aria-label="Comparador antes y después"
          />

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/70 p-3 text-xs space-y-1.5">
            <div className="font-semibold text-zinc-200">Transformación Geométrica:</div>
            <MathFormula
              formula={`s = \\min\\left(\\frac{256}{${item.raw_width}}, \\frac{256}{${item.raw_height}}\\right) = ${item.scale_factor}`}
              display
            />
            <div className="flex justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-zinc-800">
              <span>Escala: {item.scaled_width}×{item.scaled_height} px</span>
              <span>Offset: ({item.pad_x}, {item.pad_y}) px</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

