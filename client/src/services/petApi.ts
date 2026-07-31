import type { PetFilters, PetOptions, PetResponse } from "../types/pet";

interface ErrorPayload {
  error?: {
    message?: string;
  };
}

async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = "No pudimos conectar con la colección.";
    try {
      const payload = (await response.json()) as ErrorPayload;
      message = payload.error?.message ?? message;
    } catch {
      message = "No pudimos conectar con la colección.";
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}

export async function fetchPets(
  filters: PetFilters,
  signal?: AbortSignal,
): Promise<PetResponse> {
  const parameters = new URLSearchParams();

  if (filters.search.trim() !== "") parameters.set("search", filters.search.trim());
  if (filters.species !== "") parameters.set("species", filters.species);
  if (filters.rarity !== "") parameters.set("rarity", filters.rarity);
  if (filters.sort !== "") parameters.set("sort", filters.sort);

  const query = parameters.toString();
  const response = await fetch(
    `/api/pets${query === "" ? "" : `?${query}`}`,
    signal === undefined ? undefined : { signal },
  );

  return readResponse<PetResponse>(response);
}

export async function fetchPetOptions(
  signal?: AbortSignal,
): Promise<PetOptions> {
  const response = await fetch(
    "/api/pets/options",
    signal === undefined ? undefined : { signal },
  );
  const payload = await readResponse<{ data: PetOptions }>(response);
  return payload.data;
}
