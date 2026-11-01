import React from "react";
import ZeroPaddingVisualizer from "@/components/ZeroPaddingVisualizer";
import MathFormula from "@/components/MathFormula";
import datasetData from "@/data/dataset_summary.json";
import { DatasetSummaryPayload } from "@/lib/types";
import {
  Database,
  Layers,
  ShieldCheck,
  FileCode2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const data = datasetData as unknown as DatasetSummaryPayload;

export default function DatasetPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      {/* Encabezado de la sección */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 lg:flex-row lg:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Database className="h-3.5 w-3.5" />
            Sección 3 • Criterio 3 del TP4
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-zinc-100 sm:text-4xl">
            Conjunto de Datos, Acondicionamiento Morfológico y EDA (349 Variables)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-zinc-400">
            Diseño del pipeline de preprocesamiento isométrico en lienzo negro{" "}
            <MathFormula formula="256 \times 256" /> e ingeniería de características multimodales
            libres de fuga de datos (<em>data leakage</em>).
          </p>
        </div>

        <a
          href="https://github.com/carlobeni/Machine-Learning/blob/project-web/data/preprocesamiento_datos.ipynb"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-4 py-2.5 text-xs font-bold text-indigo-300 transition hover:bg-indigo-500/25"
        >
          <FileCode2 className="h-4 w-4" />
          Ver Notebook: data/preprocesamiento_datos.ipynb
        </a>
      </div>

      {/* 1. Origen y Características del Dataset */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            1. Composición y Balance
          </span>
          <h2 className="text-lg font-bold text-zinc-100">
            Muestra Balanceada (N = {data.total_images} Imágenes)
          </h2>
          <p className="text-xs leading-relaxed text-zinc-300">
            El conjunto de datos consta de <strong>360 fotografías reales</strong> de animales domésticos
            con resoluciones nativas y relaciones de aspecto heterogéneas, estrictamente balanceadas en:
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3 text-center">
              <div className="text-2xl font-extrabold text-indigo-300">
                {data.classes.cats}
              </div>
              <div className="text-xs font-medium text-zinc-300">
                Gatos (Clase 0) • 50.0%
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-center">
              <div className="text-2xl font-extrabold text-amber-300">
                {data.classes.dogs}
              </div>
              <div className="text-xs font-medium text-zinc-300">
                Perros (Clase 1) • 50.0%
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            2. Partición Estratificada 80 / 20
          </span>
          <h2 className="text-lg font-bold text-zinc-100">
            Entrenamiento (288) vs. Prueba Independiente (72)
          </h2>
          <p className="text-xs leading-relaxed text-zinc-300">
            Se aplicó una partición estratificada con semilla fija (<code>random_state=42</code>)
            para garantizar paridad exacta de clases tanto en el ajuste de subespacios como en validación:
          </p>
          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">
              <span className="text-zinc-300 font-medium">Conjunto Train (80%):</span>
              <span className="font-mono font-bold text-emerald-300">
                288 muestras (144 Gatos / 144 Perros)
              </span>
            </div>
            <div className="flex justify-between rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-2">
              <span className="text-zinc-300 font-medium">Conjunto Test (20%):</span>
              <span className="font-mono font-bold text-indigo-300">
                72 muestras (36 Gatos / 36 Perros)
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
            3. Escalado y Prevención de Data Leakage
          </span>
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-violet-400" />
            StandardScaler & Normalización
          </h2>
          <p className="text-xs leading-relaxed text-zinc-300">
            Dado que descriptores como la varianza Laplaciana (<MathFormula formula="\sim 10^3" />) y los
            histogramas normalizados (<MathFormula formula="\in [0, 1]" />) operan en escalas dispares, se
            aplicó estandarización <MathFormula formula="z = (x - \mu_{\text{train}}) / \sigma_{\text{train}}" />{" "}
            ajustada <strong>exclusivamente sobre las 288 muestras de entrenamiento</strong>, evitando cualquier
            fuga de información hacia el conjunto de test.
          </p>
        </div>
      </section>

      {/* 2. Componente Visual Interactivo: Letterbox Zero-Padding 256x256 */}
      <section>
        <ZeroPaddingVisualizer examples={data.letterbox_examples} />
      </section>

      {/* 3. Desglose Didáctico de las 349 Características Multimodales */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            Ingeniería de Características Visuales
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Extracción de Características Multimodales (Vector <MathFormula formula="\mathbf{x} \in \mathbb{R}^{349}" />)
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            Cada imagen acondicionada en el lienzo negro <MathFormula formula="256 \times 256" /> se transforma en un
            vector numérico compacto de <strong>349 descriptores complementarios</strong> que capturan morfología,
            cromaticidad, bordes y textura de alta frecuencia.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.feature_groups.map((fg, index) => (
            <div
              key={fg.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-indigo-500/40"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-bold text-indigo-300">
                    Familia {index + 1} • {fg.category}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-extrabold text-emerald-300">
                    {fg.count} descriptores
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-100">{fg.name}</h3>
                <p className="text-xs leading-relaxed text-zinc-300">
                  {fg.description}
                </p>
              </div>

              <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950/80 px-4 py-2">
                <MathFormula formula={fg.formula} display />
              </div>
            </div>
          ))}
        </div>

        {/* Nota técnica sobre máscara de primer plano */}
        <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/15 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Enmascaramiento Inteligente del Fondo Negro (Foreground Masking)
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Para evitar que los bordes de ceros del Letterbox contaminen los promedios de color y textura, el extractor
              calcula dinámicamente la máscara activa <MathFormula formula="\Omega = \{(x,y) \mid I_{\text{gray}}(x,y) > 10\}" />{" "}
              y evalúa los momentos estadísticos únicamente sobre los píxeles pertenecientes al animal.
            </p>
          </div>
          <div className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2.5 font-mono text-xs text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4" />
            Matriz Final: 360 × 349
          </div>
        </div>
      </section>
    </div>
  );
}

