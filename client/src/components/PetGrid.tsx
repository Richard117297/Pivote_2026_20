import type { Pet } from "../types/pet";
import { PetCard } from "./PetCard";

export function PetGrid({ pets }: { pets: Pet[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
