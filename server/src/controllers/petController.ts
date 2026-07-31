import type { RequestHandler } from "express";
import { pets } from "../data/pets.js";
import {
  PET_RARITIES,
  PET_SORT_OPTIONS,
  PET_SPECIES,
} from "../domain/pet.js";
import { petQuerySchema } from "../schemas/petQuerySchema.js";
import { filterPets } from "../services/petService.js";

export const getPets: RequestHandler = (request, response, next) => {
  try {
    const filters = petQuerySchema.parse(request.query);
    const matches = filterPets(filters);

    response.json({
      data: matches,
      meta: {
        total: pets.length,
        filtered: matches.length,
        appliedFilters: filters,
      },
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getPetOptions: RequestHandler = (_request, response) => {
  response.json({
    data: {
      species: PET_SPECIES,
      rarities: PET_RARITIES,
      sort: [
        { value: PET_SORT_OPTIONS[0], label: "Precio: menor a mayor" },
        { value: PET_SORT_OPTIONS[1], label: "Precio: mayor a menor" },
      ],
    },
  });
};
