"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SVDParametersPayload } from "@/lib/types";
import MathFormula from "./MathFormula";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import { Sigma, Eye, Layers, Sparkles } from "lucide-react";

interface SVDChartsViewerProps {
  data: SVDParametersPayload;
}

const panelTabs = [
  {
    id: 1,
    short: "1. Espectro σ_i (Log)",
    title: "Panel 1: Espectro de Valores Singulares σ_i en Escala Semilogarítmica",
    formula: "\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_{144} > 0",
    desc: "Muestra el decaimiento exponencial de la magnitud de las componentes principales en los subespacios centrados de Gatos y Perros. Las primeras 20-35 componentes concentran la estructura anatómica dominante.",
  },
  {
    id: 2,
    short: "2. Energía Acumulada (90%)",
    title: "Panel 2: Energía Acumulada con Umbral del 90%",
    formula: "E(r) = \\frac{\\sum_{i=1}^r \\sigma_i}{\\sum_{i=1}^{n} \\sigma_i}",
    desc: "Cuantifica la suma parcial lineal de los valores singulares respecto a la traza espectral total. La referencia horizontal marca el 90% de la energía acumulada.",
  },
  {
    id: 3,
    short: "3. Varianza Acumulada (90/95%)",
    title: "Panel 3: Varianza Explicada Acumulada con Umbrales al 90% y 95%",
    formula: "\\text{Var}(r) = \\frac{\\sum_{i=1}^r \\sigma_i^2}{\\sum_{i=1}^{n} \\sigma_i^2} = \\frac{\\|A^{(r)}\\|_F^2}{\\|A\\|_F^2}",
    desc: "Mide la proporción de varianza estadística total (norma de Frobenius al cuadrado) retenida al truncar la base ortonormal en rango r. En r = 20 se preserva ~65-69% de la varianza morfológica limpia.",
  },
  {
    id: 4,
    short: "4. Umbral Gavish-Donoho (τ)",
    title: "Panel 4: Umbral Óptimo de Corte Duro de Ruido Estocástico de Gavish-Donoho",
    formula: "\\tau = \\omega(\\beta)\\,\\sigma_{\\text{med}}, \\quad \\beta = \\frac{n}{m} = \\frac{144}{349} \\approx 0.4126, \\quad \\omega(\\beta) \\approx 2.0568",
    desc: "Separa rigurosamente la señal morfológica verdadera (σ_i > τ) del piso de ruido estocástico de Marchenko-Pastur: en Gatos τ = 21.57 (r_opt = 31) y en Perros τ = 16.75 (r_opt = 40).",
  },
  {
    id: 5,
    short: "5. Varianza Individual",
    title: "Panel 5: Distribución de Varianza Explicada Individual por Componente",
    formula: "v_i = \\frac{\\sigma_i^2}{\\sum_{j=1}^n \\sigma_j^2}",
    desc: "Aporte marginal de cada autovector u_i. Se observa el pronunciado 'codo de sedimentación' (Scree Plot) en las primeras 20 dimensiones antes de estabilizarse en componentes de ruido de alta frecuencia.",
  },
  {
    id: 6,
    short: "6. Exactitud vs Rango r",
    title: "Panel 6: Curva Empírica de Precisión (Accuracy) en Función del Rango r",
    formula: "\\hat{y}(r) = \\arg\\min_{k \\in \\{\\text{cat}, \\text{dog}\\}} \\|(I - U_k^{(r)} (U_k^{(r)})^T)(\\mathbf{x} - \\boldsymbol{\\mu}_k)\\|_2",
    desc: "Barrido paramétrico del clasificador de subespacios sobre el Test Set (N=72). Alcanza su máximo de 79.17% en r = 20. Rangos excesivos (r > 60) sobreajustan el ruido y reducen la distancia residual de ambas clases hacia cero.",
  },
];

export default function SVDChartsViewer({ data }: SVDChartsViewerProps) {
  const [activePanel, setActivePanel] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"interactive" | "figure">("interactive");

  const currentTab = panelTabs.find((t) => t.id === activePanel) || panelTabs[0];
  const spectrumTop60 = data.spectrum.slice(0, 60);
  const spectrumTop30 = data.spectrum.slice(0, 30);

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-4 lg:flex-row lg:items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            Análisis Espectral de 6 Paneles (Metodología Clase 8 FIUNA)
          </div>
          <h3 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Sigma className="h-5 w-5 text-indigo-400" />
            Selección de Dimensionalidad y Análisis del Espectro SVD
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "interactive"
                ? "bg-indigo-600 text-white"
                : "border border-zinc-700 bg-zinc-800/70 text-zinc-300 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            Gráficos Interactivos (6 Paneles)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("figure")}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === "figure"
                ? "bg-indigo-600 text-white"
                : "border border-zinc-700 bg-zinc-800/70 text-zinc-300 hover:text-white"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Figura Oficial PNG (Alta Resolución)
          </button>
        </div>
      </div>

      {viewMode === "figure" ? (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <Image
              src="/figures/svd_curva_seleccion_dimension.png"
              alt="Análisis SVD de 6 paneles y Selección Óptima de Dimensión"
              width={1800}
              height={1000}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-center text-xs text-zinc-400">
            Figura científica de 6 paneles generada por <code>models/clasificacion_subespacios_svd_y_modelos.ipynb</code> (`svd_curva_seleccion_dimension.png`).
          </p>
        </div>
      ) : (
        <>
          {/* Selector de los 6 paneles */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {panelTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePanel(tab.id)}
                className={`rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all ${
                  activePanel === tab.id
                    ? "border border-indigo-500/50 bg-indigo-600/20 text-indigo-200 shadow-xs"
                    : "border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {tab.short}
              </button>
            ))}
          </div>

          {/* Cabecera del panel activo */}
          <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/70 p-4">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-indigo-300">{currentTab.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{currentTab.desc}</p>
              </div>
              <div className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-900/90 px-4 py-1">
                <MathFormula formula={currentTab.formula} />
              </div>
            </div>
          </div>

          {/* Lienzo de visualización Recharts */}
          <div className="h-80 w-full rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
            <ResponsiveContainer width="100%" height="100%">
              {activePanel === 1 ? (
                <LineChart data={ data.spectrum }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#a1a1aa" fontSize={12} label={{ value: "Índice de Componente (k)", position: "insideBottom", offset: -4, fill: "#a1a1aa", fontSize: 11 }} />
                  <YAxis scale="log" domain={[1, 100]} stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Line type="monotone" dataKey="sigma_cat" name="σ_k Subespacio Gatos" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="sigma_dog" name="σ_k Subespacio Perros" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
                </LineChart>
              ) : activePanel === 2 ? (
                <LineChart data={ data.spectrum }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#a1a1aa" fontSize={12} />
                  <YAxis domain={[0, 100]} unit="%" stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <ReferenceLine y={90} stroke="#10b981" strokeDasharray="4 4" label={{ value: "Umbral 90% Energía", fill: "#10b981", fontSize: 11 }} />
                  <Line type="monotone" dataKey="energy_cat" name="Energía Acumulada Gatos (%)" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="energy_dog" name="Energía Acumulada Perros (%)" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
                </LineChart>
              ) : activePanel === 3 ? (
                <LineChart data={ data.spectrum }>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#a1a1aa" fontSize={12} />
                  <YAxis domain={[0, 100]} unit="%" stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <ReferenceLine y={90} stroke="#a1a1aa" strokeDasharray="3 3" label={{ value: "90% Varianza", fill: "#a1a1aa", fontSize: 11 }} />
                  <ReferenceLine y={95} stroke="#e4e4e7" strokeDasharray="5 5" label={{ value: "95% Varianza", fill: "#e4e4e7", fontSize: 11 }} />
                  <ReferenceLine x={20} stroke="#10b981" strokeWidth={2} label={{ value: "r=20 elegido", fill: "#10b981", fontSize: 11 }} />
                  <Line type="monotone" dataKey="var_cat" name="Varianza Explicada Gatos (%)" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="var_dog" name="Varianza Explicada Perros (%)" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="5 5" dot={false} />
                </LineChart>
              ) : activePanel === 4 ? (
                <LineChart data={spectrumTop60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#a1a1aa" fontSize={12} />
                  <YAxis domain={[5, 95]} stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <ReferenceLine y={data.gavish_donoho.cat.tau} stroke="#ef4444" strokeDasharray="4 4" label={{ value: `τ_cat = ${data.gavish_donoho.cat.tau} (r=31)`, fill: "#ef4444", fontSize: 11 }} />
                  <ReferenceLine y={data.gavish_donoho.dog.tau} stroke="#f97316" strokeDasharray="3 3" label={{ value: `τ_dog = ${data.gavish_donoho.dog.tau} (r=40)`, fill: "#f97316", fontSize: 11 }} />
                  <ReferenceLine x={31} stroke="#ef4444" strokeDasharray="2 2" />
                  <ReferenceLine x={40} stroke="#f97316" strokeDasharray="2 2" />
                  <Line type="monotone" dataKey="sigma_cat" name="σ_k Gatos" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="sigma_dog" name="σ_k Perros" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
                </LineChart>
              ) : activePanel === 5 ? (
                <BarChart data={spectrumTop30}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="k" stroke="#a1a1aa" fontSize={12} />
                  <YAxis unit="%" stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="ind_var_cat" name="Varianza Individual Gatos (%)" fill="#6366f1" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="ind_var_dog" name="Varianza Individual Perros (%)" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                </BarChart>
              ) : (
                <LineChart data={data.rank_sweep}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="r" stroke="#a1a1aa" fontSize={12} />
                  <YAxis domain={[60, 102]} unit="%" stroke="#a1a1aa" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", fontSize: "12px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <ReferenceLine x={20} stroke="#10b981" strokeWidth={2} label={{ value: "Óptimo r=20 (79.17%)", fill: "#10b981", fontSize: 11 }} />
                  <Line type="monotone" dataKey="test_accuracy" name="Accuracy en Test Set (N=72)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="f1_score" name="F1-Score en Test Set (%)" stroke="#6366f1" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

