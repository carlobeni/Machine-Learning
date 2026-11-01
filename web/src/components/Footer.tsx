import React from "react";
import Link from "next/link";
import { GraduationCap, GitBranch, FileCode2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/90 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-zinc-100">
              <GraduationCap className="h-5 w-5 text-indigo-400" />
              <span className="font-bold tracking-tight">
                FIUNA • Ingeniería Electrónica
              </span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Facultad de Ingeniería — Universidad Nacional de Asunción (FIUNA).
              <br />
              Cátedra: <strong>Machine Learning 1 (23433)</strong> — Semestre 2026.
              <br />
              Trabajo Práctico 4 (TP4): Reportería Técnica Interactiva de Clasificación
              Binaria mediante Subespacios Ortogonales SVD y Modelos Supervisados.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Módulos del Informe (Criterios TP4)
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition">
                  Criterios 1, 2 y 6: Portada, Definición del Problema y Conclusiones
                </Link>
              </li>
              <li>
                <Link href="/dataset" className="hover:text-indigo-400 transition">
                  Criterio 3: Conjunto de Datos, Letterbox 256×256 y 349 Features
                </Link>
              </li>
              <li>
                <Link href="/svd-theory" className="hover:text-indigo-400 transition">
                  Criterio 4A: Modelado Matemático SVD y Teorema de Gavish-Donoho
                </Link>
              </li>
              <li>
                <Link href="/eigen-gallery" className="hover:text-indigo-400 transition">
                  Criterio 4B: Galería de Eigen-Animals y Reconstrucción Eckart-Young
                </Link>
              </li>
              <li>
                <Link href="/benchmark" className="hover:text-indigo-400 transition">
                  Criterio 5: Resultados en Test (N=72), Matrices de Confusión y Discusión
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-200">
              Reproducibilidad y Cuadernos Oficiales
            </h3>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="https://github.com/carlobeni/Machine-Learning/blob/project-web/data/preprocesamiento_datos.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-indigo-400 transition"
              >
                <FileCode2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>data/preprocesamiento_datos.ipynb</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <a
                href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-indigo-400 transition"
              >
                <FileCode2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>models/clasificacion_subespacios_svd_y_modelos.ipynb</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <a
                href="https://github.com/carlobeni/Machine-Learning"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-indigo-400 transition"
              >
                <GitBranch className="h-3.5 w-3.5 text-indigo-400" />
                <span>github.com/carlobeni/Machine-Learning</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            </div>
            <div className="pt-2 text-[11px] text-zinc-500">
              Arquitectura 100% Frontend Estático (Next.js + Tailwind CSS + KaTeX).
              Optimizado para despliegue nativo en Vercel.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between border-t border-zinc-800/60 pt-6 text-xs text-zinc-500 sm:flex-row">
          <p>
            © 2026 Facultad de Ingeniería UNA (FIUNA) • Carrera de Ingeniería Electrónica
          </p>
          <p className="mt-2 sm:mt-0">
            Autor: <span className="text-zinc-300 font-medium">Carlos Benítez</span> • Machine Learning 1 (23433)
          </p>
        </div>
      </div>
    </footer>
  );
}
