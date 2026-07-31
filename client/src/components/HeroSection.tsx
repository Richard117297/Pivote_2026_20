import { Orbit, Stars } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20 lg:px-8">
      <div className="hero-orb hero-orb-left" aria-hidden="true" />
      <div className="hero-orb hero-orb-right" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          <Orbit aria-hidden="true" size={15} />
          Colección temporada 01
        </div>
        <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          Tu próxima aventura
          <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
            tiene compañía
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Explora criaturas digitales únicas, compara sus habilidades y encuentra
          al compañero perfecto para recorrer el universo PixelPets.
        </p>
        <div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-400">
          <Stars aria-hidden="true" size={17} className="text-violet-300" />
          Busca, filtra y ordena sin salir de la galaxia
        </div>
      </div>
    </section>
  );
}
