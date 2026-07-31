import { pets } from "../data/pets.js";
import type { Pet, PetFilters } from "../domain/pet.js";

export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLocaleLowerCase("es");
}

export function filterPets(
  filters: PetFilters,
  catalog: readonly Pet[] = pets,
): Pet[] {
  const normalizedSearch = normalizeText(filters.search.trim());

  const matches = catalog
    .map((pet, originalIndex) => ({ pet, originalIndex }))
    .filter(({ pet }) => {
      const matchesSearch =
        normalizedSearch === "" ||
        normalizeText(pet.name).includes(normalizedSearch);
      const matchesSpecies =
        filters.species === "" || pet.species === filters.species;
      const matchesRarity =
        filters.rarity === "" || pet.rarity === filters.rarity;

      return matchesSearch && matchesSpecies && matchesRarity;
    });

  if (filters.sort !== "") {
    const direction = filters.sort === "price-asc" ? 1 : -1;
    matches.sort(
      (first, second) =>
        (first.pet.price - second.pet.price) * direction ||
        first.originalIndex - second.originalIndex,
    );
  }

  return matches.map(({ pet }) => pet);
}
