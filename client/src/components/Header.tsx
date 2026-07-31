import { PawPrint, Sparkles } from "lucide-react";

interface HeaderProps {
  total: number;
}

export function Header({ total }: HeaderProps) {
  return (
    <header className="border-b border-[#4b2b1e] bg-[#281711] text-white">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#catalogo"
          className="flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fb923c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#281711]"
          aria-label="PixelPets, ir al catálogo"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ea580c] text-white">
            <PawPrint aria-hidden="true" size={20} />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-xl font-bold leading-none tracking-tight text-white">
              Pixel<span className="text-[#fb923c]">Pets</span>
            </span>
            <span className="mt-0.5 hidden text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#d9b7a2] min-[360px]:block">
              Digital creatures
            </span>
          </span>
        </a>

        <div className="flex items-center gap-2 rounded-full border border-[#75412d] bg-[#3a2118] px-3 py-1.5 text-xs font-bold text-[#f4d8c5] sm:text-sm">
          <Sparkles aria-hidden="true" className="text-[#fb923c]" size={15} />
          <span className="tabular-nums text-[#ffedd5]">{total}</span>
          <span className="hidden sm:inline">criaturas disponibles</span>
          <span className="hidden min-[400px]:inline sm:hidden">criaturas</span>
        </div>
      </div>
    </header>
  );
}
