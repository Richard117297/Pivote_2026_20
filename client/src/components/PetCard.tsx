import { Coins, Fingerprint } from "lucide-react";
import type { Pet, PetRarity, PetSpecies } from "../types/pet";
import { HealthBar } from "./HealthBar";

const speciesArt: Record<PetSpecies, { emoji: string; gradient: string }> = {
  Dragón: { emoji: "🐉", gradient: "from-[#ffe1cf] via-[#fff4e8] to-[#fffaf5]" },
  "Gato Cósmico": { emoji: "🐈‍⬛", gradient: "from-[#f4dfd4] via-[#fff0e6] to-[#fffaf5]" },
  Robot: { emoji: "🤖", gradient: "from-[#f8dfc4] via-[#fff2df] to-[#fffaf5]" },
  "Zorro Místico": { emoji: "🦊", gradient: "from-[#ffd9c2] via-[#ffecdc] to-[#fffaf5]" },
  "Ave Fantástica": { emoji: "🦅", gradient: "from-[#ffe9b8] via-[#fff4d8] to-[#fffaf5]" },
  "Criatura Acuática": { emoji: "🐙", gradient: "from-[#f1ddd2] via-[#ffede4] to-[#fffaf5]" },
};

const rarityStyle: Record<PetRarity, string> = {
  Común: "border-[#c9b8aa] bg-[#f2e9e1] text-[#604b3e]",
  Raro: "border-[#f3a56d] bg-[#fff0e4] text-[#9a3412]",
  Épico: "border-[#ea7a3a] bg-[#ffdec8] text-[#7c2d12]",
  Legendario: "border-[#c2410c] bg-[#ea580c] text-white",
};

export function PetCard({ pet }: { pet: Pet }) {
  const art = speciesArt[pet.species];

  return (
    <article className="pet-card overflow-hidden rounded-2xl border border-[#dfcdbd] bg-[#fffdf9]">
      <div className={`relative grid h-32 place-items-center overflow-hidden border-b border-[#eaded3] bg-gradient-to-br ${art.gradient}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
        <span
          className="relative text-5xl drop-shadow-[0_8px_10px_rgba(95,48,25,0.16)]"
          role="img"
          aria-label={`Representación de ${pet.species}`}
        >
          {art.emoji}
        </span>
        <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-xs font-bold ${rarityStyle[pet.rarity]}`}>
          {pet.rarity}
        </span>
        <span className="absolute bottom-2.5 left-3 flex items-center gap-1 rounded-md border border-[#dbc5b4] bg-[#fffaf5]/95 px-2 py-1 text-[0.66rem] font-bold text-[#725848]">
          <Fingerprint aria-hidden="true" size={13} />
          {pet.id}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-xl font-bold leading-tight text-[#2f211a]">{pet.name}</h3>
            <p className="mt-0.5 text-sm font-bold text-[#c2410c]">{pet.species}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#fdba74] bg-[#fff7ed] px-2.5 py-1.5 text-[#9a3412]">
            <Coins aria-hidden="true" size={17} />
            <span className="text-sm font-bold tabular-nums">{pet.price}</span>
            <span className="sr-only">monedas virtuales</span>
          </div>
        </div>

        <p className="my-3 min-h-10 text-sm leading-5 text-[#765b4b]">{pet.description}</p>
        <HealthBar health={pet.health} />
      </div>
    </article>
  );
}
