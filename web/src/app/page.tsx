import React from "react";
import Link from "next/link";
import MetricCard from "@/components/MetricCard";
import InteractiveResidualDemo from "@/components/InteractiveResidualDemo";
import MathFormula from "@/components/MathFormula";
import datasetData from "@/data/dataset_summary.json";
import { DatasetSummaryPayload } from "@/lib/types";
import {
  GraduationCap,
  GitBranch,
  FileCode2,
  BarChart3,
  Trophy,
  Sigma,
  Database,
  Layers,
  Target,
  CheckCircle2,
  AlertTriangle,
  Rocket,
  Mail,
  ArrowRight,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

const summary = datasetData as unknown as DatasetSummaryPayload;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-16">
      {/* =====================================================================
          SECCIÓN 1: PORTADA E IDENTIFICACIÓN ACADÉMICA (Criterio 1 del TP4)
         ===================================================================== */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/90 via-zinc-900/50 to-zinc-950 p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/40 bg-indigo-500/15 px-3 py-1 text-indigo-300">
            <GraduationCap className="h-4 w-4" />
            Facultad de Ingeniería - Universidad Nacional de Asunción (FIUNA)
          </span>
          <span className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-800/80 px-3 py-1 text-zinc-300">
            Carrera de Ingeniería Electrónica
          </span>
          <span className="inline-flex items-center rounded-full border border-violet-500/40 bg-violet-500/15 px-3 py-1 text-violet-300">
            Machine Learning 1 (23433) - Semestre 2026
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl leading-tight">
          Clasificador de Gatos y Perros mediante Análisis de Subespacios{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
            SVD (Descomposición en Valores Singulares)
          </span>{" "}
          y Comparativa Multimodelo
        </h1>

        <p className="mt-4 max-w-4xl text-sm sm:text-base leading-relaxed text-zinc-300">
          Investigación experimental e implementación de un clasificador geométrico por{" "}
          <strong>mínima norma residual euclidiana</strong> sobre bases ortonormales truncadas{" "}
          <MathFormula formula="U_{\text{cat}}^{(r)}" /> y{" "}
          <MathFormula formula="U_{\text{dog}}^{(r)}" />, con eliminación óptima de ruido estocástico
          mediante el teorema de <strong>Gavish-Donoho</strong>, preprocesamiento isométrico en lienzo
          negro <MathFormula formula="256 \times 256" /> y evaluación frente a{" "}
          <strong>XGBoost, SVM (Kernel RBF) y Regresión Logística</strong>.
        </p>

        {/* Botones de Acción Principales (Hero Section) */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/carlobeni/Machine-Learning"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/25 transition hover:bg-indigo-500"
          >
            <GitBranch className="h-4 w-4" />
            Ver Repositorio en GitHub
          </a>
          <a
            href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/90 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-100 transition hover:border-indigo-500/50 hover:bg-zinc-800"
          >
            <FileCode2 className="h-4 w-4 text-indigo-400" />
            Explorar Notebooks (.ipynb)
          </a>
          <Link
            href="/benchmark"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
          >
            <BarChart3 className="h-4 w-4" />
            Ver Comparativa de Modelos
          </Link>
        </div>

        {/* Tarjeta de Integrantes del Equipo / Autoría Académica */}
        <div className="mt-8 border-t border-zinc-800/80 pt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
            Integrante del Proyecto & Identificación Académica (Criterio 1 TP4)
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 sm:flex-row sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-zinc-100">
                    Carlos Benítez
                  </span>
                  <span className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                    Autor Principal
                  </span>
                </div>
                <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-indigo-400" />
                  <span>carlos.benitez@ing.una.py</span>
                </p>
                <p className="text-[11px] text-zinc-500">
                  Ingeniería Electrónica • Facultad de Ingeniería UNA (FIUNA)
                </p>
              </div>
              <a
                href="https://github.com/carlobeni"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:border-indigo-500 hover:text-indigo-300 transition"
              >
                <GitBranch className="h-3.5 w-3.5" />
                @carlobeni
              </a>
            </div>

            <div className="flex flex-col justify-center rounded-xl border border-zinc-800 bg-zinc-950/70 p-4 space-y-1.5 text-xs text-zinc-400">
              <div className="font-semibold text-zinc-200">
                Cuadernos Reproducibles en el Repositorio Oficial:
              </div>
              <a
                href="https://github.com/carlobeni/Machine-Learning/blob/project-web/data/preprocesamiento_datos.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-1"
              >
                1. <code>data/preprocesamiento_datos.ipynb</code> (Letterbox 256×256 & 349 Features)
              </a>
              <a
                href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:underline flex items-center gap-1"
              >
                2. <code>models/clasificacion_subespacios_svd_y_modelos.ipynb</code> (SVD, Gavish-Donoho & Benchmark)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tarjetas de Métricas Clave */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Mejor Rendimiento Global"
          value="84.72%"
          subtitle="XGBoost (150 Árboles) • F1: 85.71% | Recall: 91.67%"
          badge="Top Accuracy"
          icon={Trophy}
          accent="emerald"
        />
        <MetricCard
          title="Clasificador SVD Subespacios"
          value="79.17%"
          subtitle="Precisión líder: 83.87% (r=20) • Supera a SVM y LogReg"
          badge="Menor Norma ℓ₂"
          icon={Sigma}
          accent="indigo"
        />
        <MetricCard
          title="Vector Multimodal"
          value="349 vars"
          subtitle="HOG (128) + HSV (128) + Sobel (48) + Laplaciano (45)"
          badge="Sin Data Leakage"
          icon={Layers}
          accent="violet"
        />
        <MetricCard
          title="Dataset Balanceado"
          value="360 imgs"
          subtitle="180 Gatos / 180 Perros • 288 Train (80%) / 72 Test (20%)"
          badge="Letterbox 256×256"
          icon={Database}
          accent="amber"
        />
      </section>

      {/* =====================================================================
          SECCIÓN 2: DEFINICIÓN DEL PROBLEMA Y JUSTIFICACIÓN (Criterio 2 del TP4)
         ===================================================================== */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Sección 2 • Criterio 2 del TP4
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Definición del Problema, Justificación de Machine Learning y Objetivos
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 1. Contextualización del Problema Real */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-indigo-500/30 bg-indigo-500/15 text-indigo-400">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Contextualización del Problema Real
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              La clasificación visual binaria de especies domésticas (<strong>Gatos vs. Perros</strong>) constituye un
              problema clásico de alta complejidad en <strong>visión artificial y reconocimiento de patrones</strong>.
              Las fotografías reales presentan una severa <strong>variabilidad intra-clase</strong>: decenas de razas con
              morfologías dispares, pelajes de colores similares entre especies, posturas no rígidas, oclusiones parciales,
              fondos heterogéneos y cambios drásticos de iluminación.
            </p>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950/70 p-3 text-xs text-zinc-400">
              <strong className="text-zinc-200">Tipo de Tarea de Aprendizaje:</strong> Clasificación binaria supervisada con
              codificación canónica <span className="font-mono text-indigo-300">Etiqueta 0: Gato</span> y{" "}
              <span className="font-mono text-amber-300">Etiqueta 1: Perro</span>.
            </div>
          </div>

          {/* 2. Justificación de Machine Learning frente a heurísticas tradicionales */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/30 bg-violet-500/15 text-violet-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Justificación frente a Heurísticas Tradicionales
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              Los sistemas clásicos basados en <strong>reglas geométricas fijas, umbrales manuales de color o filtros rígidos</strong>{" "}
              fracasan porque ningún umbral estático soporta rotaciones cefálicas ni cambios de iluminación. Por el contrario, el{" "}
              <strong>aprendizaje estadístico y la proyección en subespacios ortogonales SVD</strong> descubren automáticamente las
              direcciones de máxima covarianza morfológica (<MathFormula formula="U_{\text{cat}}^{(r)}" /> y{" "}
              <MathFormula formula="U_{\text{dog}}^{(r)}" />), aislando la estructura anatómica intrínseca de cada clase y descartando el
              ruido estocástico del entorno.
            </p>
          </div>

          {/* 3. Objetivo General y Objetivos Específicos */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/15 text-emerald-400">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-zinc-100">
              Objetivos del Proyecto
            </h3>
            <p className="text-xs leading-relaxed text-zinc-300">
              <strong className="text-emerald-300">Objetivo General:</strong> Diseñar, entrenar y validar un pipeline completo de
              clasificación de imágenes basado en subespacios SVD y contrastarlo frente a modelos supervisados de referencia
              (XGBoost, SVM RBF, Regresión Logística).
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>1. Acondicionar las imágenes mediante <strong>Letterbox Zero-Padding (256×256)</strong> preservando la relación de aspecto anatómica.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>2. Extraer un vector multimodal compacto de <strong>349 características</strong> discriminantes (HOG, HSV, Sobel, Laplacian).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>3. Construir las matrices de entrenamiento y obtener las bases ortonormales <MathFormula formula="U_{\text{cat}}" /> y <MathFormula formula="U_{\text{dog}}" /> mediante SVD truncado.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>4. Aplicar el umbral óptimo de <strong>Gavish-Donoho</strong> para eliminación rigurosa de ruido estocástico.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>5. Implementar el clasificador por <strong>mínima norma residual</strong> y evaluar su desempeño en test independiente (<MathFormula formula="N=72" />).</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Simulador Interactivo en Cliente */}
      <section>
        <InteractiveResidualDemo samples={summary.demo_samples} />
      </section>

      {/* Explorador Rápido de Módulos del Portal (Criterios 3, 4 y 5) */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-100">
          Módulos Especializados del Informe Técnico (Criterios 3, 4 y 5 del TP4)
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dataset"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-indigo-500/60 hover:bg-zinc-900"
          >
            <span className="text-[11px] font-bold uppercase text-indigo-400">
              Criterio 3 TP4
            </span>
            <h3 className="mt-1 text-base font-bold text-zinc-100 group-hover:text-indigo-300 flex items-center justify-between">
              Dataset & EDA
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Interactivo Antes vs. Después de Letterbox 256×256, desglose de las 349 características y prevención de Data Leakage.
            </p>
          </Link>

          <Link
            href="/svd-theory"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-indigo-500/60 hover:bg-zinc-900"
          >
            <span className="text-[11px] font-bold uppercase text-indigo-400">
              Criterio 4A TP4
            </span>
            <h3 className="mt-1 text-base font-bold text-zinc-100 group-hover:text-indigo-300 flex items-center justify-between">
              Teoría SVD & 6 Paneles
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Formulación matemática en KaTeX, proyecciones ortogonales, teorema de Gavish-Donoho y visor interactivo de 6 paneles.
            </p>
          </Link>

          <Link
            href="/eigen-gallery"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-indigo-500/60 hover:bg-zinc-900"
          >
            <span className="text-[11px] font-bold uppercase text-indigo-400">
              Criterio 4B TP4
            </span>
            <h3 className="mt-1 text-base font-bold text-zinc-100 group-hover:text-indigo-300 flex items-center justify-between">
              Galería Eigen-Animals
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Modos principales (Eigen-Gatos y Eigen-Perros) y slider interactivo de reconstrucción truncada de Eckart-Young.
            </p>
          </Link>

          <Link
            href="/benchmark"
            className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-indigo-500/60 hover:bg-zinc-900"
          >
            <span className="text-[11px] font-bold uppercase text-emerald-400">
              Criterio 5 TP4
            </span>
            <h3 className="mt-1 text-base font-bold text-zinc-100 group-hover:text-emerald-300 flex items-center justify-between">
              Benchmark & Discusión
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </h3>
            <p className="mt-2 text-xs text-zinc-400">
              Tabla dinámica en Test Set (N=72), matrices de confusión por modelo y discusión analítica de eficiencia y overfitting.
            </p>
          </Link>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 6: CONCLUSIONES Y TRABAJO FUTURO (Criterio 6 del TP4)
         ===================================================================== */}
      <section className="space-y-6">
        <div className="border-b border-zinc-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Sección 6 • Criterio 6 del TP4
          </span>
          <h2 className="mt-1 text-2xl font-bold text-zinc-100">
            Conclusiones Principales, Limitaciones y Líneas de Trabajo Futuro
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Conclusiones principales */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
              <CheckCircle2 className="h-5 w-5" />
              <h3>Conclusiones Principales del Estudio</h3>
            </div>
            <ul className="space-y-2.5 text-xs leading-relaxed text-zinc-300">
              <li>
                <strong>1. Eficacia de la reducción dimensional guiada por matemática (SVD):</strong> El clasificador de
                subespacios SVD alcanza un notable <strong>79.17% de Accuracy</strong> y la{" "}
                <strong>mayor Precisión del estudio (83.87%)</strong> en el conjunto de prueba independiente, superando a
                modelos supervisados clásicos como SVM RBF (77.78%) y Regresión Logística L2 (75.00%) sin requerir optimización
                iterativa ni cajas negras.
              </li>
              <li>
                <strong>2. Importancia crítica del Letterbox Zero-Padding (256×256):</strong> Preservar la relación de aspecto
                anatómica evita la distorsión de los ángulos de gradientes HOG en orejas y hocicos, elevando el rendimiento en
                más de +18 puntos porcentuales respecto a pipelines con redimensionado deformante.
              </li>
              <li>
                <strong>3. Filtrado riguroso de ruido con Gavish-Donoho:</strong> El truncamiento espectral elimina componentes
                espurias de fondo e iluminación, reteniendo únicamente las direcciones ortonormales de señal morfológica pura.
              </li>
            </ul>
          </div>

          {/* Limitaciones del enfoque */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
              <AlertTriangle className="h-5 w-5" />
              <h3>Limitaciones del Enfoque Actual</h3>
            </div>
            <ul className="space-y-2.5 text-xs leading-relaxed text-zinc-300">
              <li>
                <strong>1. Sensibilidad a oclusiones y posturas extremas:</strong> Dado que los subespacios{" "}
                <MathFormula formula="U_k^{(r)}" /> son combinaciones lineales globales sobre el vector de características, las
                oclusiones parciales severas o animales fotografiados de espaldas incrementan la norma residual en ambos
                subespacios simultáneamente.
              </li>
              <li>
                <strong>2. Fondos con texturas de alta frecuencia:</strong> Pasto denso, alfombras o barrotes cercanos al cuerpo
                del animal introducen gradientes Sobel y varianza Laplaciana parasitaria que compiten con los bordes reales del pelaje.
              </li>
              <li>
                <strong>3. Linealidad de la variedad por clase:</strong> Un único subespacio plano por clase aproxima de forma
                rígida una variedad morfológica intrínsecamente curva (múltiples razas de perros con anatomías muy distintas).
              </li>
            </ul>
          </div>

          {/* Trabajo Futuro */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/10 p-6 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-base">
              <Rocket className="h-5 w-5" />
              <h3>Líneas de Investigación y Trabajo Futuro</h3>
            </div>
            <ul className="space-y-2.5 text-xs leading-relaxed text-zinc-300">
              <li>
                <strong>1. Arquitecturas de Deep Learning (CNNs y ViTs):</strong> Incorporar extractores convolucionales
                preentrenados (<em>ResNet-50, EfficientNet-B0</em> o <em>Vision Transformers</em>) mediante Transfer Learning
                para obtener representaciones invariantes a traslación y escala.
              </li>
              <li>
                <strong>2. Fusión de Características Profundas con Subespacios SVD:</strong> Construir los subespacios ortogonales{" "}
                <MathFormula formula="U_{\text{cat}}^{(r)}" /> y <MathFormula formula="U_{\text{dog}}^{(r)}" /> directamente sobre los
                embeddings penúltimos de una CNN, combinando el poder semántico profundo con la interpretabilidad y velocidad
                algebraica de SVD.
              </li>
              <li>
                <strong>3. Data Augmentation Geométrica y Fotométrica:</strong> Aplicar rotaciones leves, flips horizontales y
                perturbación controlada de brillo/contraste en tiempo de entrenamiento para reducir la brecha Train-Test.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
