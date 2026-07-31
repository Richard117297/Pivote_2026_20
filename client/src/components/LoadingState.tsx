export function LoadingState() {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      role="status"
      aria-label="Cargando criaturas"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="h-[390px] animate-pulse rounded-3xl border border-white/5 bg-white/[0.035]"
          aria-hidden="true"
        >
          <div className="h-40 rounded-t-3xl bg-white/5" />
          <div className="space-y-4 p-5">
            <div className="h-5 w-1/2 rounded bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/5" />
            <div className="h-12 rounded bg-white/5" />
            <div className="h-2 rounded bg-white/10" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando el catálogo de PixelPets…</span>
    </div>
  );
}
