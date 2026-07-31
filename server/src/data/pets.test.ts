import { describe, expect, it } from "vitest";
import { pets } from "./pets.js";

describe("catálogo de PixelPets", () => {
  it("contiene mascotas", () => {
    expect(pets.length).toBeGreaterThan(0);
  });

  it("utiliza identificadores únicos", () => {
    const ids = pets.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("no contiene nombres vacíos", () => {
    expect(pets.every(({ name }) => name.trim().length > 0)).toBe(true);
  });

  it("contiene precios válidos", () => {
    expect(pets.every(({ price }) => price >= 0)).toBe(true);
  });

  it("mantiene la salud entre 0 y 100", () => {
    expect(pets.every(({ health }) => health >= 0 && health <= 100)).toBe(true);
  });
});
