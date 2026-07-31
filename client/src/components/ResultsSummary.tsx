import { LayoutGrid } from "lucide-react";

interface ResultsSummaryProps {
  filtered: number;
  total: number;
  isLoading: boolean;
}

export function ResultsSummary({
  filtered,
  total,
  isLoading,
}: ResultsSummaryProps) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Catálogo
        </p>
        <h2 id="catalog-title" className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl">
          Criaturas encontradas
        </h2>
      </div>
      <div
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300"
        role="status"
        aria-live="polite"
      >
        <LayoutGrid aria-hidden="true" size={17} className="text-violet-300" />
        {isLoading ? (
          <span>Actualizando…</span>
        ) : (
          <span>
            <strong className="text-white">{filtered}</strong>
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> de </span>
            {total}
          </span>
        )}
      </div>
    </div>
  );
}
