"use client";

import React, { useState } from "react";
import { ModelMetric } from "@/lib/types";
import { ArrowUpDown, Trophy, Sparkles, Clock, Cpu } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface BenchmarkTableProps {
  models: ModelMetric[];
}

type SortKey = "accuracy" | "precision" | "recall" | "f1_score" | "inference_time_ms";

export default function BenchmarkTable({ models }: BenchmarkTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("accuracy");
  const [sortAsc, setSortAsc] = useState(false);

  const maxAccuracy = Math.max(...models.map((m) => m.accuracy));
  const maxPrecision = Math.max(...models.map((m) => m.precision));
  const maxRecall = Math.max(...models.map((m) => m.recall));
  const maxF1 = Math.max(...models.map((m) => m.f1_score));

  const sortedModels = [...models].sort((a, b) => {
    const diff = a[sortKey] - b[sortKey];
    return sortAsc ? diff : -diff;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(key === "inference_time_ms");
    }
  };

  const chartData = models.map((m) => ({
    name: m.shortName,
    Accuracy: m.accuracy,
    Precision: m.precision,
    Recall: m.recall,
    "F1-Score": m.f1_score,
  }));

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 shadow-lg">
        <div className="flex flex-col justify-between gap-2 border-b border-zinc-800 bg-zinc-900/90 px-6 py-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Tabla Comparativa Oficial en Conjunto de Test Independiente (N = 72)
            </h3>
            <p className="text-xs text-zinc-400">
              Haz clic en los encabezados para ordenar dinámicamente. Los valores líderes por métrica se resaltan con insignia.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            Partición Estratificada 80/20 (36 Gatos / 36 Perros)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/60 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <th className="px-6 py-3.5">Modelo / Arquitectura</th>
                <th className="px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("accuracy")}
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    Accuracy (%)
                    <ArrowUpDown className="h-3.5 w-3.5 text-indigo-400" />
                  </button>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("precision")}
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    Precision (%)
                    <ArrowUpDown className="h-3.5 w-3.5 text-indigo-400" />
                  </button>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("recall")}
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    Recall (%)
                    <ArrowUpDown className="h-3.5 w-3.5 text-indigo-400" />
                  </button>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("f1_score")}
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    F1-Score (%)
                    <ArrowUpDown className="h-3.5 w-3.5 text-indigo-400" />
                  </button>
                </th>
                <th className="px-4 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleSort("inference_time_ms")}
                    className="inline-flex items-center gap-1 hover:text-zinc-100"
                  >
                    Inferencia
                    <ArrowUpDown className="h-3.5 w-3.5 text-indigo-400" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/70">
              {sortedModels.map((m) => {
                const isSvd = m.id === "svd";
                return (
                  <tr
                    key={m.id}
                    className={`transition-colors hover:bg-zinc-800/40 ${
                      isSvd ? "bg-indigo-950/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-zinc-100">{m.name}</span>
                          {isSvd && (
                            <span className="rounded-md border border-indigo-500/40 bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                              Foco Principal TP4
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-400 mt-0.5">{m.family}</span>
                        <span className="text-[11px] text-zinc-500 font-mono mt-1">
                          {m.hyperparameters}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${
                          m.accuracy === maxAccuracy
                            ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                            : "text-zinc-200"
                        }`}
                      >
                        {m.accuracy.toFixed(2)}%
                        {m.accuracy === maxAccuracy && (
                          <Trophy className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${
                          m.precision === maxPrecision
                            ? "border border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                            : "text-zinc-200"
                        }`}
                      >
                        {m.precision.toFixed(2)}%
                        {m.precision === maxPrecision && (
                          <Trophy className="h-3.5 w-3.5 text-indigo-400" />
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${
                          m.recall === maxRecall
                            ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                            : "text-zinc-200"
                        }`}
                      >
                        {m.recall.toFixed(2)}%
                        {m.recall === maxRecall && (
                          <Trophy className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${
                          m.f1_score === maxF1
                            ? "border border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                            : "text-zinc-200"
                        }`}
                      >
                        {m.f1_score.toFixed(2)}%
                        {m.f1_score === maxF1 && (
                          <Trophy className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-zinc-300">
                          <Clock className="h-3 w-3 text-zinc-400" />
                          {m.inference_time_ms} ms
                        </span>
                        <span className="text-[10px] text-zinc-500 mt-0.5">
                          Train: {m.train_accuracy.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico interactivo de barras multimodelo */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6">
        <div className="mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              Perfil Comparativo Multimétrica por Modelo (%)
            </h3>
            <p className="text-xs text-zinc-400">
              Contraste visual entre Exactitud, Precisión (liderada por SVD con 83.87%), Sensibilidad y F1-Score.
            </p>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
              <YAxis domain={[60, 100]} stroke="#a1a1aa" fontSize={12} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#09090b",
                  borderColor: "#27272a",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="Accuracy" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Precision" fill="#a855f7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Recall" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="F1-Score" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

