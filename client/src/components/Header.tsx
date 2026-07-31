import { PawPrint, Sparkles } from "lucide-react";

interface HeaderProps {
  total: number;
}

export function Header({ total }: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#090b1c]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#catalogo"
          className="group flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          aria-label="PixelPets, ir al catálogo"
        >
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:-rotate-6">
            <PawPrint aria-hidden="true" size={23} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-bold leading-none tracking-tight text-white">
              Pixel<span className="text-cyan-300">Pets</span>
            </span>
            <span className="mt-1 hidden text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400 min-[360px]:block">
              Digital creatures
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 rounded-full border border-violet-300/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 sm:text-sm">
          <Sparkles aria-hidden="true" className="text-amber-300" size={16} />
          <span className="tabular-nums text-white">{total}</span>
          <span className="hidden sm:inline">criaturas disponibles</span>
          <span className="hidden min-[400px]:inline sm:hidden">criaturas</span>
        </div>
      </div>
    </header>
  );
}
