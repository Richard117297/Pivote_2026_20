export function LoadingState() {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3"
      role="status"
      aria-label="Cargando criaturas"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div
          key={index}
          className="h-[320px] rounded-2xl border border-[#dfcdbd] bg-[#fffdf9]"
          aria-hidden="true"
        >
          <div className="h-32 rounded-t-2xl border-b border-[#eaded3] bg-[#f5e9de]" />
          <div className="space-y-3 p-4">
            <div className="h-5 w-1/2 rounded bg-[#eaded3]" />
            <div className="h-3 w-1/3 rounded bg-[#f1e7de]" />
            <div className="h-10 rounded bg-[#f4ebe4]" />
            <div className="h-2 rounded bg-[#eaded3]" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando el catálogo de PixelPets…</span>
    </div>
  );
}
