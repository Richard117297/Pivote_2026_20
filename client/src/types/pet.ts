export type PetSpecies =
  | "Dragón"
  | "Gato Cósmico"
  | "Robot"
  | "Zorro Místico"
  | "Ave Fantástica"
  | "Criatura Acuática";

export type PetRarity = "Común" | "Raro" | "Épico" | "Legendario";
export type PetSort = "" | "price-asc" | "price-desc";

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
  species: string;
  rarity: string;
  sort: PetSort;
}

export interface PetResponse {
  data: Pet[];
  meta: {
    total: number;
    filtered: number;
    appliedFilters: PetFilters;
  };
}

export interface PetOptions {
  species: PetSpecies[];
  rarities: PetRarity[];
  sort: Array<{
    value: Exclude<PetSort, "">;
    label: string;
  }>;
}
