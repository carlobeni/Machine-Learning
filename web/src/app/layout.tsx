import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Clasificador de Gatos y Perros mediante Subespacios SVD | FIUNA Machine Learning 1",
  description:
    "Portal académico interactivo de reportería para el Trabajo Práctico 4 (TP4) de Machine Learning 1 (23433) - Facultad de Ingeniería UNA (FIUNA). Análisis de Subespacios Ortogonales SVD, Teorema de Gavish-Donoho, Eigen-Animals y Comparativa Multimodelo (XGBoost, SVM RBF, Regresión Logística).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

