import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { FilterPanel } from "./components/FilterPanel";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LoadingState } from "./components/LoadingState";
import { PetGrid } from "./components/PetGrid";
import { ResultsSummary } from "./components/ResultsSummary";
import { usePets } from "./hooks/usePets";

export default function App() {
  const {
    pets,
    total,
    options,
    filters,
    isLoading,
    error,
    activeFilterCount,
    updateFilter,
    clearFilters,
    retry,
  } = usePets();

  return (
    <div className="min-h-screen overflow-hidden bg-[#090b1c] text-slate-100">
      <a
        href="#catalogo"
        className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-cyan-300 px-4 py-2 font-bold text-slate-950 transition focus:translate-y-0"
      >
        Saltar al catálogo
      </a>
      <Header total={total} />
      <main>
        <HeroSection />
        <FilterPanel
          filters={filters}
          options={options}
          activeFilterCount={activeFilterCount}
          disabled={options === null}
          onFilterChange={updateFilter}
          onClear={clearFilters}
        />

        <section
          id="catalogo"
          aria-labelledby="catalog-title"
          className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-8"
        >
          <ResultsSummary
            filtered={pets.length}
            total={total}
            isLoading={isLoading}
          />
          {error !== null ? (
            <ErrorState message={error} onRetry={retry} />
          ) : isLoading ? (
            <LoadingState />
          ) : pets.length === 0 ? (
            <EmptyState onClear={clearFilters} />
          ) : (
            <PetGrid pets={pets} />
          )}
        </section>
      </main>
      <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-500">
        <p>PixelPets · Criaturas digitales, aventuras reales.</p>
      </footer>
    </div>
  );
}
