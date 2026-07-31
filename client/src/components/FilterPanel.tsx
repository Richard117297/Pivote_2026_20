import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type {
  PetFilters,
  PetOptions,
  PetRarity,
  PetSort,
  PetSpecies,
} from "../types/pet";

interface FilterPanelProps {
  filters: PetFilters;
  options: PetOptions | null;
  activeFilterCount: number;
  disabled: boolean;
  onFilterChange: <K extends keyof PetFilters>(
    name: K,
    value: PetFilters[K],
  ) => void;
  onClear: () => void;
}

export function FilterPanel({
  filters,
  options,
  activeFilterCount,
  disabled,
  onFilterChange,
  onClear,
}: FilterPanelProps) {
  const selectClass = (active: boolean) =>
    `h-11 w-full appearance-none rounded-lg border bg-white px-3 text-sm text-[#38251d] outline-none focus:border-[#ea580c] focus:ring-2 focus:ring-[#fed7aa] disabled:cursor-not-allowed disabled:opacity-60 ${
      active
        ? "border-[#ea580c] bg-[#fff7ed] font-bold text-[#9a3412]"
        : "border-[#ddcdbf] hover:border-[#c99f82]"
    }`;

  return (
    <aside
      aria-label="Búsqueda y filtros"
      className="rounded-2xl border border-[#dfcdbd] bg-[#fffdf9] p-4 shadow-[0_12px_35px_rgba(87,52,34,0.08)] lg:sticky lg:top-4"
    >
      <div className="mb-4 border-b border-[#eaded3] pb-3">
        <div className="flex items-center gap-2 text-[#2f211a]">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffedd5] text-[#c2410c]">
            <SlidersHorizontal aria-hidden="true" size={17} />
          </span>
          <h2 className="font-display text-lg font-bold leading-tight">
            Encuentra tu compañero ideal
          </h2>
        </div>

        <span
          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
            activeFilterCount > 0
              ? "bg-[#ea580c] text-white"
              : "bg-[#f1e7de] text-[#765b4b]"
          }`}
          aria-live="polite"
        >
          {activeFilterCount} {activeFilterCount === 1 ? "filtro activo" : "filtros activos"}
        </span>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-1">
        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="pet-search" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-[#765b4b]">
            Nombre
          </label>
          <div className="relative">
            <Search
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-3 my-auto ${
                filters.search !== "" ? "text-[#ea580c]" : "text-[#9b8576]"
              }`}
              size={17}
            />
            <input
              id="pet-search"
              type="search"
              value={filters.search}
              onChange={(event) => onFilterChange("search", event.target.value)}
              placeholder="Ej. Luna, Nova..."
              className={`h-11 w-full rounded-lg border bg-white pl-10 pr-3 text-sm text-[#38251d] outline-none placeholder:text-[#ad9a8e] focus:border-[#ea580c] focus:ring-2 focus:ring-[#fed7aa] ${
                filters.search !== ""
                  ? "border-[#ea580c] bg-[#fff7ed] font-bold"
                  : "border-[#ddcdbf] hover:border-[#c99f82]"
              }`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="species-filter" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-[#765b4b]">
            Especie
          </label>
          <select
            id="species-filter"
            value={filters.species}
            disabled={disabled}
            onChange={(event) =>
              onFilterChange("species", event.target.value as PetSpecies | "")
            }
            className={selectClass(filters.species !== "")}
          >
            <option value="">Todas las especies</option>
            {options?.species.map((species) => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rarity-filter" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-[#765b4b]">
            Rareza
          </label>
          <select
            id="rarity-filter"
            value={filters.rarity}
            disabled={disabled}
            onChange={(event) =>
              onFilterChange("rarity", event.target.value as PetRarity | "")
            }
            className={selectClass(filters.rarity !== "")}
          >
            <option value="">Todas las rarezas</option>
            {options?.rarities.map((rarity) => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <label htmlFor="sort-filter" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.12em] text-[#765b4b]">
            Orden
          </label>
          <select
            id="sort-filter"
            value={filters.sort}
            disabled={disabled}
            onChange={(event) =>
              onFilterChange("sort", event.target.value as PetSort)
            }
            className={selectClass(filters.sort !== "")}
          >
            <option value="">Orden original</option>
            {options?.sort.map((sortOption) => (
              <option key={sortOption.value} value={sortOption.value}>
                {sortOption.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={activeFilterCount === 0}
          className={`flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-4 text-sm font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c] focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
            activeFilterCount > 0
              ? "border-[#c2410c] bg-[#ea580c] text-white hover:bg-[#c2410c]"
              : "border-[#ded0c4] bg-[#f3ebe4] text-[#9a877a] disabled:opacity-70"
          } sm:col-span-2 lg:col-span-1`}
        >
          <RotateCcw aria-hidden="true" size={16} />
          Limpiar
        </button>
      </div>
    </aside>
  );
}
