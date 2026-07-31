import { Coins, Fingerprint } from "lucide-react";
import type { Pet, PetRarity, PetSpecies } from "../types/pet";
import { HealthBar } from "./HealthBar";

const speciesArt: Record<PetSpecies, { emoji: string; gradient: string }> = {
  Dragón: { emoji: "🐉", gradient: "from-rose-500/25 via-orange-400/10 to-transparent" },
  "Gato Cósmico": { emoji: "🐈‍⬛", gradient: "from-violet-500/25 via-fuchsia-400/10 to-transparent" },
  Robot: { emoji: "🤖", gradient: "from-cyan-500/25 via-blue-400/10 to-transparent" },
  "Zorro Místico": { emoji: "🦊", gradient: "from-fuchsia-500/25 via-violet-400/10 to-transparent" },
  "Ave Fantástica": { emoji: "🦅", gradient: "from-amber-500/25 via-yellow-400/10 to-transparent" },
  "Criatura Acuática": { emoji: "🐙", gradient: "from-blue-500/25 via-cyan-400/10 to-transparent" },
};

const rarityStyle: Record<PetRarity, string> = {
  Común: "border-slate-400/25 bg-slate-400/10 text-slate-200",
  Raro: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Épico: "border-violet-400/35 bg-violet-400/10 text-violet-200",
  Legendario: "border-amber-300/40 bg-amber-300/10 text-amber-200",
};

export function PetCard({ pet }: { pet: Pet }) {
  const art = speciesArt[pet.species];

  return (
    <article className="pet-card group overflow-hidden rounded-3xl border border-white/10 bg-[#10142a] shadow-card">
      <div className={`relative grid h-40 place-items-center overflow-hidden bg-gradient-to-br ${art.gradient}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />
        <span
          className="relative text-7xl drop-shadow-[0_12px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110"
          role="img"
          aria-label={`Representación de ${pet.species}`}
        >
          {art.emoji}
        </span>
        <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-bold ${rarityStyle[pet.rarity]}`}>
          {pet.rarity}
        </span>
        <span className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-lg bg-[#090b1c]/75 px-2 py-1 font-mono text-[0.68rem] text-slate-300 backdrop-blur">
          <Fingerprint aria-hidden="true" size={13} />
          {pet.id}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-xl font-bold text-white">{pet.name}</h3>
            <p className="mt-1 text-sm font-medium text-cyan-300">{pet.species}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-xl bg-amber-300/10 px-3 py-2 text-amber-200">
            <Coins aria-hidden="true" size={17} />
            <span className="font-mono text-sm font-bold tabular-nums">{pet.price}</span>
            <span className="sr-only">monedas virtuales</span>
          </div>
        </div>

        <p className="my-5 min-h-10 text-sm leading-5 text-slate-400">{pet.description}</p>
        <HealthBar health={pet.health} />
      </div>
    </article>
  );
}
