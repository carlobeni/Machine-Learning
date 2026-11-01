import React from "react";
import Image from "next/image";
import ReconstructionSlider from "@/components/ReconstructionSlider";
import MathFormula from "@/components/MathFormula";
import svdData from "@/data/svd_parameters.json";
import { SVDParametersPayload } from "@/lib/types";
import { Sparkles, FileCode2, Eye, Layers } from "lucide-react";

const data = svdData as unknown as SVDParametersPayload;

const eigenModes = [
  {
    idx: 1,
    catTitle: "Eigen-Gato 1 (u₁)",
    dogTitle: "Eigen-Perro 1 (u₁)",
    role: "Contraste global figura-fondo y contorno craneal primario",
  },
  {
    idx: 2,
    catTitle: "Eigen-Gato 2 (u₂)",
    dogTitle: "Eigen-Perro 2 (u₂)",
    role: "Geometría auricular superior (orejas erguidas vs. caídas)",
  },
  {
    idx: 3,
    catTitle: "Eigen-Gato 3 (u₃)",
    dogTitle: "Eigen-Perro 3 (u₃)",
    role: "Simetría bilateral de iluminación e inclinación cefálica",
  },
  {
    idx: 4,
    catTitle: "Eigen-Gato 4 (u₄)",
    dogTitle: "Eigen-Perro 4 (u₄)",
    role: "Proyección del hocico, frente y región ocular central",
  },
  {
    idx: 5,
    catTitle: "Eigen-Gato 5 (u₅)",
    dogTitle: "Eigen-Perro 5 (u₅)",
    role: "Frecuencias medias de pelaje pectoral y silueta cervical",
  },
  {
    idx: 6,
    catTitle: "Eigen-Gato 6 (u₆)",
    dogTitle: "Eigen-Perro 6 (u₆)",
    role: "Variaciones morfológicas finas de textura facial",
  },
];

export default function EigenGalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* Encabezado */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Sección 4B • Criterio 4 del TP4 (Eigen-Animals & Eckart-Young)
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
            Galería Interactiva de Eigen-Animals y Reconstrucción Espectral
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Interpretación física y visual de los vectores singulares izquierdos{" "}
            <MathFormula formula="\mathbf{u}_i \in \mathbb{R}^{4096}" /> (<MathFormula formula="64 \times 64" /> px)
            que capturan la &ldquo;forma media&rdquo; y los modos ortogonales de variación anatómica dominante.
          </p>
        </div>

        <a
          href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-4 py-2.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-500/25"
        >
          <FileCode2 className="h-4 w-4" />
          Ver Código en Notebook (.ipynb)
        </a>
      </div>

      {/* 1. Slider Interactivo de Reconstrucción (Teorema de Eckart-Young) */}
      <section>
        <ReconstructionSlider
          catReconstructions={data.reconstructions.cat}
          dogReconstructions={data.reconstructions.dog}
          rOptCat={data.gavish_donoho.cat.r_opt}
          rOptDog={data.gavish_donoho.dog.r_opt}
        />
      </section>

      {/* 2. Galería de Modos Principales: Eigen-Gatos vs Eigen-Perros */}
      <section className="space-y-8">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Bases Ortonormales Visuales
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Rostros Medios y Primeros 6 Autovectores Principales (Eigen-Gatos y Eigen-Perros)
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Cada imagen de la clase se expresa como la suma del centroide{" "}
            <MathFormula formula="\boldsymbol{\mu}_k" /> más una combinación lineal de estas bases ortonormales{" "}
            <MathFormula formula="\mathbf{u}_1, \mathbf{u}_2, \dots, \mathbf{u}_r" />.
          </p>
        </div>

        {/* Subespacio de Gatos */}
        <div className="rounded-xl border border-indigo-500/30 bg-zinc-900/60 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-indigo-300">
              Subespacio Morfológico de Gatos (<MathFormula formula="U_{\text{cat}}" />)
            </h3>
            <span className="text-xs text-zinc-400">
              Destaca las orejas triangulares erguidas en las esquinas superiores y la simetría facial compacta.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            <div className="flex flex-col items-center rounded-xl border border-emerald-500/40 bg-emerald-950/15 p-3">
              <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-emerald-500/40">
                <Image
                  src="/eigen/mean_cat.png"
                  alt="Gato Medio"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <span className="mt-2 text-xs font-bold text-emerald-300">
                Gato Medio (μ_cat)
              </span>
              <span className="mt-0.5 text-center text-[10px] text-zinc-400">
                Centroide de 144 gatos
              </span>
            </div>

            {eigenModes.map((m) => (
              <div
                key={`cat-${m.idx}`}
                className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 transition hover:border-indigo-500/50"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-zinc-700">
                  <Image
                    src={`/eigen/eigen_cat_${m.idx}.png`}
                    alt={m.catTitle}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-indigo-300">
                  {m.catTitle}
                </span>
                <span className="mt-0.5 text-center text-[10px] text-zinc-400 leading-tight">
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subespacio de Perros */}
        <div className="rounded-xl border border-amber-500/30 bg-zinc-900/60 p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-amber-300">
              Subespacio Morfológico de Perros (<MathFormula formula="U_{\text{dog}}" />)
            </h3>
            <span className="text-xs text-zinc-400">
              Captura la prominencia central del hocico alargado y la caída lateral de las orejas.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            <div className="flex flex-col items-center rounded-xl border border-amber-500/40 bg-amber-950/15 p-3">
              <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-amber-500/40">
                <Image
                  src="/eigen/mean_dog.png"
                  alt="Perro Medio"
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </div>
              <span className="mt-2 text-xs font-bold text-amber-300">
                Perro Medio (μ_dog)
              </span>
              <span className="mt-0.5 text-center text-[10px] text-zinc-400">
                Centroide de 144 perros
              </span>
            </div>

            {eigenModes.map((m) => (
              <div
                key={`dog-${m.idx}`}
                className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-950/70 p-3 transition hover:border-amber-500/50"
              >
                <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-zinc-700">
                  <Image
                    src={`/eigen/eigen_dog_${m.idx}.png`}
                    alt={m.dogTitle}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <span className="mt-2 text-xs font-bold text-amber-300">
                  {m.dogTitle}
                </span>
                <span className="mt-0.5 text-center text-[10px] text-zinc-400 leading-tight">
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Figura Oficial Consolidada exportada del Notebook */}
      <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-400" />
              Figura Oficial del Notebook: Animales Medios y Componentes Base (Eigen-Animals)
            </h3>
            <p className="text-xs text-zinc-400">
              Exportada directamente desde <code>models/svd_eigen_animals.png</code>.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <Image
            src="/figures/svd_eigen_animals.png"
            alt="Figura Oficial Eigen-Animals"
            width={1200}
            height={600}
            className="mx-auto max-h-[460px] w-auto rounded-lg object-contain"
          />
        </div>
      </section>
    </div>
  );
}

