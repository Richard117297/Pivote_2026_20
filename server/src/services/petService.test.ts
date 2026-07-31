import { describe, expect, it } from "vitest";
import { pets } from "../data/pets.js";
import type { PetFilters } from "../domain/pet.js";
import { filterPets } from "./petService.js";

const noFilters: PetFilters = {
  search: "",
  species: "",
  rarity: "",
  sort: "",
};

describe("filterPets", () => {
  it("encuentra un nombre completo", () => {
    expect(filterPets({ ...noFilters, search: "Luna" }).map(({ name }) => name)).toEqual(["Luna"]);
  });

  it("encuentra coincidencias parciales", () => {
    expect(filterPets({ ...noFilters, search: "lun" })[0]?.name).toBe("Luna");
  });

  it("ignora mayúsculas y minúsculas", () => {
    expect(filterPets({ ...noFilters, search: "nOvA" })[0]?.name).toBe("Nova");
  });

  it("elimina espacios externos de la búsqueda", () => {
    expect(filterPets({ ...noFilters, search: "  Byte  " })[0]?.name).toBe("Byte");
  });

  it("tolera búsquedas sin tildes", () => {
    expect(filterPets({ ...noFilters, search: "orbita" })[0]?.name).toBe("Órbita");
  });

  it("devuelve todo el catálogo ante una búsqueda vacía", () => {
    expect(filterPets({ ...noFilters, search: "   " })).toEqual(pets);
  });

  it("filtra por especie", () => {
    const result = filterPets({ ...noFilters, species: "Robot" });
    expect(result.length).toBeGreaterThan(1);
    expect(result.every(({ species }) => species === "Robot")).toBe(true);
  });

  it("filtra por rareza", () => {
    const result = filterPets({ ...noFilters, rarity: "Épico" });
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.every(({ rarity }) => rarity === "Épico")).toBe(true);
  });

  it("combina los filtros de especie y rareza", () => {
    const result = filterPets({
      ...noFilters,
      species: "Gato Cósmico",
      rarity: "Común",
    });
    expect(result.map(({ name }) => name)).toEqual(["Milo"]);
  });

  it("ordena el precio de menor a mayor de forma estable", () => {
    const result = filterPets({ ...noFilters, sort: "price-asc" });
    expect(result.map(({ price }) => price)).toEqual(
      [...result].map(({ price }) => price).sort((a, b) => a - b),
    );
    expect(result.filter(({ price }) => price === 180).map(({ id }) => id)).toEqual([
      "PP-002",
      "PP-012",
    ]);
  });

  it("ordena el precio de mayor a menor", () => {
    const result = filterPets({ ...noFilters, sort: "price-desc" });
    expect(result.map(({ price }) => price)).toEqual(
      [...result].map(({ price }) => price).sort((a, b) => b - a),
    );
  });

  it("combina búsqueda y filtros", () => {
    const result = filterPets({
      ...noFilters,
      search: "lu",
      species: "Gato Cósmico",
      rarity: "Raro",
    });
    expect(result.map(({ name }) => name)).toEqual(["Luna"]);
  });

  it("ordena únicamente el resultado filtrado", () => {
    const result = filterPets({
      ...noFilters,
      species: "Robot",
      sort: "price-desc",
    });
    expect(result.every(({ species }) => species === "Robot")).toBe(true);
    expect(result.map(({ price }) => price)).toEqual([760, 510, 160]);
  });

  it("devuelve una colección vacía cuando no hay coincidencias", () => {
    expect(filterPets({ ...noFilters, search: "inexistente" })).toEqual([]);
  });

  it("no modifica el catálogo original", () => {
    const originalOrder = pets.map(({ id }) => id);
    filterPets({ ...noFilters, sort: "price-desc" });
    expect(pets.map(({ id }) => id)).toEqual(originalOrder);
  });
});
