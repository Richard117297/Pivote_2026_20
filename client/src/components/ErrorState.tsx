import { RefreshCw, WifiOff } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-2xl border border-[#d98c74] bg-[#fff4ef] px-5 py-12 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#f8ddd4] text-[#9f3f2f]">
        <WifiOff aria-hidden="true" size={27} />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold text-[#2f211a]">
        La señal interestelar falló
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-[#765b4b]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#b94a32] px-5 py-2 text-sm font-bold text-white hover:bg-[#973b29] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b94a32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff4ef]"
      >
        <RefreshCw aria-hidden="true" size={17} />
        Reintentar conexión
      </button>
    </div>
  );
}
