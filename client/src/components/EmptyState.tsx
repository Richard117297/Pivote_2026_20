import { SearchX } from "lucide-react";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-violet-300/25 bg-violet-300/[0.04] px-5 py-16 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-violet-400/10 text-violet-200">
        <SearchX aria-hidden="true" size={30} />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-white">
        Ninguna criatura coincide
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        Prueba otro nombre o abre los filtros para explorar más rincones de la colección.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-6 min-h-11 rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-violet-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b1c]"
      >
        Ver todas las criaturas
      </button>
    </div>
  );
}
