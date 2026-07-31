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
    <div className="min-h-screen bg-[#f8f1e8] text-[#2f211a]">
      <a
        href="#catalogo"
        className="sr-only z-50 rounded-md bg-[#c2410c] px-4 py-2 font-bold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al catálogo
      </a>
      <Header total={total} />
      <main>
        <HeroSection />

        <div className="mx-auto grid max-w-[1480px] gap-6 px-4 pb-14 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start lg:px-8 xl:grid-cols-[300px_minmax(0,1fr)]">
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
            className="min-w-0 scroll-mt-4"
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
        </div>
      </main>
      <footer className="border-t border-[#dcccbc] bg-[#f1e5d8] px-4 py-5 text-center text-sm text-[#725848]">
        <p>PixelPets · Criaturas digitales, aventuras reales.</p>
      </footer>
    </div>
  );
}
