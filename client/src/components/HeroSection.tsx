import { Orbit, Stars } from "lucide-react";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-[1480px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="sunset-panel overflow-hidden rounded-2xl border border-[#e6cdb9] bg-[#fffaf5] px-5 py-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-7 sm:py-6">
        <div className="max-w-3xl">
          <div className="mb-2 flex w-fit items-center gap-2 rounded-full border border-[#fdba74] bg-[#fff1e6] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#9a3412]">
            <Orbit aria-hidden="true" size={14} />
            Colección temporada 01
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-[-0.025em] text-[#2b1b14] sm:text-4xl">
            Tu próxima aventura{" "}
            <span className="text-[#c2410c]">tiene compañía</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f5040] sm:text-base">
            Explora criaturas digitales únicas, compara sus habilidades y
            encuentra al compañero perfecto para recorrer el universo
            PixelPets.
          </p>
        </div>

        <div className="mt-4 flex shrink-0 items-center gap-2 border-t border-[#edd8c7] pt-4 text-sm font-bold text-[#7c2d12] sm:mt-0 sm:max-w-[240px] sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
          <Stars aria-hidden="true" size={18} className="text-[#ea580c]" />
          Busca, filtra y ordena sin salir de la galaxia
        </div>
      </div>
    </section>
  );
}
