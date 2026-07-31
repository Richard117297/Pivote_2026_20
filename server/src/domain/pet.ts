import { z } from "zod";

export const PET_SPECIES = [
  "Dragón",
  "Gato Cósmico",
  "Robot",
  "Zorro Místico",
  "Ave Fantástica",
  "Criatura Acuática",
] as const;

export const PET_RARITIES = ["Común", "Raro", "Épico", "Legendario"] as const;

export const PET_SORT_OPTIONS = ["price-asc", "price-desc"] as const;

export type PetSpecies = (typeof PET_SPECIES)[number];
export type PetRarity = (typeof PET_RARITIES)[number];
export type PetSort = (typeof PET_SORT_OPTIONS)[number];

export const petSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1),
  species: z.enum(PET_SPECIES),
  rarity: z.enum(PET_RARITIES),
  price: z.number().nonnegative(),
  health: z.number().min(0).max(100),
  description: z.string().trim().min(1).max(140),
});

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  rarity: PetRarity;
  price: number;
  health: number;
  description: string;
}

export interface PetFilters {
  search: string;
  species: PetSpecies | "";
  rarity: PetRarity | "";
  sort: PetSort | "";
}
