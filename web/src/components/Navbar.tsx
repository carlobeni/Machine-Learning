"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cpu,
  BarChart3,
  Sigma,
  Sparkles,
  Database,
  GitBranch,
  Menu,
  X,
  FileCode2,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Resumen & TP4", icon: Cpu },
  { href: "/dataset", label: "Dataset & EDA", icon: Database },
  { href: "/svd-theory", label: "Teoría SVD", icon: Sigma },
  { href: "/eigen-gallery", label: "Eigen-Animals", icon: Sparkles },
  { href: "/benchmark", label: "Benchmark & Resultados", icon: BarChart3 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 shadow-sm shadow-indigo-500/10 transition group-hover:border-indigo-400 group-hover:bg-indigo-500/20">
            <Sigma className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-zinc-100">
              SVD Subspaces <span className="text-indigo-400">ML1</span>
            </span>
            <span className="text-[11px] font-medium text-zinc-400">
              FIUNA • Ingeniería Electrónica
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-xs"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/70 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <FileCode2 className="h-3.5 w-3.5 text-indigo-400" />
            Notebooks (.ipynb)
          </a>
          <a
            href="https://github.com/carlobeni/Machine-Learning"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-500/20 transition hover:bg-indigo-500"
          >
            <GitBranch className="h-3.5 w-3.5" />
            GitHub
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center justify-center rounded-lg border border-zinc-800 p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white md:hidden"
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 md:hidden">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-800 pt-3">
            <a
              href="https://github.com/carlobeni/Machine-Learning/blob/project-web/models/clasificacion_subespacios_svd_y_modelos.ipynb"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 py-2 text-xs font-medium text-zinc-200"
            >
              <FileCode2 className="h-4 w-4 text-indigo-400" />
              Explorar Notebooks (.ipynb)
            </a>
            <a
              href="https://github.com/carlobeni/Machine-Learning"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2 text-xs font-semibold text-white"
            >
              <GitBranch className="h-4 w-4" />
              Repositorio en GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
