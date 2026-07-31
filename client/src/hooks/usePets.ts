import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchPetOptions, fetchPets } from "../services/petApi";
import type { Pet, PetFilters, PetOptions } from "../types/pet";

const INITIAL_FILTERS: PetFilters = {
  search: "",
  species: "",
  rarity: "",
  sort: "",
};

interface PetsState {
  pets: Pet[];
  total: number;
  options: PetOptions | null;
  filters: PetFilters;
  isLoading: boolean;
  error: string | null;
  activeFilterCount: number;
  updateFilter: <K extends keyof PetFilters>(
    name: K,
    value: PetFilters[K],
  ) => void;
  clearFilters: () => void;
  retry: () => void;
}

export function usePets(): PetsState {
  const [filters, setFilters] = useState<PetFilters>(INITIAL_FILTERS);
  const [pets, setPets] = useState<Pet[]>([]);
  const [total, setTotal] = useState(0);
  const [options, setOptions] = useState<PetOptions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const firstLoad = useRef(true);

  useEffect(() => {
    const controller = new AbortController();
    void fetchPetOptions(controller.signal)
      .then(setOptions)
      .catch((requestError: unknown) => {
        if (
          !(requestError instanceof DOMException) ||
          requestError.name !== "AbortError"
        ) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No pudimos cargar las opciones.",
          );
        }
      });

    return () => controller.abort();
  }, [requestVersion]);

  useEffect(() => {
    const controller = new AbortController();
    const delay = firstLoad.current ? 0 : 300;
    firstLoad.current = false;

    const timeoutId = window.setTimeout(() => {
      void fetchPets(filters, controller.signal)
        .then((response) => {
          setPets(response.data);
          setTotal(response.meta.total);
        })
        .catch((requestError: unknown) => {
          if (
            requestError instanceof DOMException &&
            requestError.name === "AbortError"
          ) {
            return;
          }
          setPets([]);
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No pudimos cargar la colección.",
          );
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoading(false);
        });
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [filters, requestVersion]);

  const updateFilter = useCallback(
    <K extends keyof PetFilters>(name: K, value: PetFilters[K]) => {
      setIsLoading(true);
      setError(null);
      setFilters((current) => ({ ...current, [name]: value }));
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setFilters(INITIAL_FILTERS);
  }, []);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setRequestVersion((version) => version + 1);
  }, []);

  const activeFilterCount = useMemo(
    () =>
      [filters.search, filters.species, filters.rarity, filters.sort].filter(
        (value) => value !== "",
      ).length,
    [filters],
  );

  return {
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
  };
}
