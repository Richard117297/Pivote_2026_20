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

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-white/10 bg-[#11152b] px-4 text-sm text-slate-100 outline-none transition hover:border-violet-300/30 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10 disabled:cursor-not-allowed disabled:opacity-60";

export function FilterPanel({
  filters,
  options,
  activeFilterCount,
  disabled,
  onFilterChange,
  onClear,
}: FilterPanelProps) {
  return (
    <section
      aria-label="Búsqueda y filtros"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl border border-white/10 bg-[#0e1227]/90 p-4 shadow-card backdrop-blur-xl sm:p-6">
        <div className="mb-4 flex flex-col items-start justify-between gap-3 min-[400px]:flex-row min-[400px]:items-center">
          <div className="flex items-center gap-2">
            <SlidersHorizontal aria-hidden="true" className="text-cyan-300" size={19} />
            <h2 className="font-display font-semibold text-white">
              Encuentra tu PixelPet
            </h2>
          </div>
          <span
            className="rounded-full bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200"
            aria-live="polite"
          >
            {activeFilterCount} {activeFilterCount === 1 ? "filtro activo" : "filtros activos"}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <div>
            <label htmlFor="pet-search" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Nombre
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                id="pet-search"
                type="search"
                value={filters.search}
                onChange={(event) => onFilterChange("search", event.target.value)}
                placeholder="Ej. Luna, Nova..."
                className="h-12 w-full rounded-xl border border-white/10 bg-[#11152b] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 hover:border-violet-300/30 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
              />
            </div>
          </div>

          <div>
            <label htmlFor="species-filter" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Especie
            </label>
            <select
              id="species-filter"
              value={filters.species}
              disabled={disabled}
              onChange={(event) =>
                onFilterChange("species", event.target.value as PetSpecies | "")
              }
              className={selectClass}
            >
              <option value="">Todas las especies</option>
              {options?.species.map((species) => (
                <option key={species} value={species}>{species}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="rarity-filter" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Rareza
            </label>
            <select
              id="rarity-filter"
              value={filters.rarity}
              disabled={disabled}
              onChange={(event) =>
                onFilterChange("rarity", event.target.value as PetRarity | "")
              }
              className={selectClass}
            >
              <option value="">Todas las rarezas</option>
              {options?.rarities.map((rarity) => (
                <option key={rarity} value={rarity}>{rarity}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort-filter" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Orden
            </label>
            <select
              id="sort-filter"
              value={filters.sort}
              disabled={disabled}
              onChange={(event) =>
                onFilterChange("sort", event.target.value as PetSort)
              }
              className={selectClass}
            >
              <option value="">Orden original</option>
              {options?.sort.map((sortOption) => (
                <option key={sortOption.value} value={sortOption.value}>
                  {sortOption.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={onClear}
              disabled={activeFilterCount === 0}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 xl:w-auto"
            >
              <RotateCcw aria-hidden="true" size={17} />
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
