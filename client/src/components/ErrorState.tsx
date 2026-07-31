import { RefreshCw, WifiOff } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-3xl border border-rose-400/20 bg-rose-400/[0.05] px-5 py-16 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-rose-400/10 text-rose-200">
        <WifiOff aria-hidden="true" size={30} />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-white">
        La señal interestelar falló
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-300">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b1c]"
      >
        <RefreshCw aria-hidden="true" size={17} />
        Reintentar conexión
      </button>
    </div>
  );
}
