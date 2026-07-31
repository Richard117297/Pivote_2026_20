import { z } from "zod";
import { PET_RARITIES, PET_SORT_OPTIONS, PET_SPECIES } from "../domain/pet.js";

export const petQuerySchema = z
  .object({
    search: z.string().max(80).optional().default(""),
    species: z.union([z.enum(PET_SPECIES), z.literal("")]).optional(),
    rarity: z.union([z.enum(PET_RARITIES), z.literal("")]).optional(),
    sort: z.union([z.enum(PET_SORT_OPTIONS), z.literal("")]).optional(),
  })
  .strict()
  .transform((query) => ({
    search: query.search.trim(),
    species: query.species ?? "",
    rarity: query.rarity ?? "",
    sort: query.sort ?? "",
  }));
