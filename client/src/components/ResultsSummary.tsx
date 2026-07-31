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
    <div className="mb-4 flex items-end justify-between gap-3 border-b border-[#dfcdbd] pb-3">
      <div>
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[#c2410c]">
          Catálogo
        </p>
        <h2 id="catalog-title" className="font-display text-2xl font-bold leading-tight text-[#2f211a] sm:text-3xl">
          Criaturas encontradas
        </h2>
      </div>
      <div
        className="flex shrink-0 items-center gap-2 rounded-full border border-[#f1b486] bg-[#fff7ed] px-3 py-1.5 text-sm font-bold text-[#7c2d12]"
        role="status"
        aria-live="polite"
      >
        <LayoutGrid aria-hidden="true" size={16} className="text-[#ea580c]" />
        {isLoading ? (
          <span>Actualizando…</span>
        ) : (
          <span>
            <strong className="text-[#c2410c]">{filtered}</strong>
            <span aria-hidden="true"> / </span>
            <span className="sr-only"> de </span>
            {total}
          </span>
        )}
      </div>
    </div>
  );
}
