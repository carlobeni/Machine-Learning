import React from "react";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  badge?: string;
  icon: LucideIcon;
  accent?: "indigo" | "emerald" | "violet" | "amber";
}

const accentStyles = {
  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-500/60",
    iconBg: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    value: "text-indigo-300",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/60",
    iconBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    value: "text-emerald-300",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-500/60",
    iconBg: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    value: "text-violet-300",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/60",
    iconBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    value: "text-amber-300",
  },
};

export default function MetricCard({
  title,
  value,
  subtitle,
  badge,
  icon: Icon,
  accent = "indigo",
}: MetricCardProps) {
  const style = accentStyles[accent];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-zinc-900/60 p-5 backdrop-blur-sm transition-all duration-200 ${style.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {title}
          </p>
          <p className={`mt-2 text-3xl font-extrabold tracking-tight ${style.value}`}>
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${style.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-xs text-zinc-400 leading-snug">{subtitle}</p>
        {badge && (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style.badge}`}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

