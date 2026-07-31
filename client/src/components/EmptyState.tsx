import { SearchX } from "lucide-react";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#e7a778] bg-[#fff8f1] px-5 py-12 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ffedd5] text-[#c2410c]">
        <SearchX aria-hidden="true" size={27} />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-[#2f211a]">
        Ninguna criatura coincide
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-[#765b4b]">
        Prueba otro nombre o abre los filtros para explorar más rincones de la colección.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 min-h-10 rounded-lg bg-[#ea580c] px-5 py-2 text-sm font-bold text-white hover:bg-[#c2410c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8f1]"
      >
        Ver todas las criaturas
      </button>
    </div>
  );
}
