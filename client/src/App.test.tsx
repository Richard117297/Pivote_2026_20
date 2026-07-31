import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { EmptyState } from "./components/EmptyState";
import { ErrorState } from "./components/ErrorState";
import { FilterPanel } from "./components/FilterPanel";
import { Header } from "./components/Header";
import { PetCard } from "./components/PetCard";
import { PetGrid } from "./components/PetGrid";
import { ResultsSummary } from "./components/ResultsSummary";
import { fetchPetOptions, fetchPets } from "./services/petApi";
import type { Pet, PetFilters, PetOptions, PetResponse } from "./types/pet";

vi.mock("./services/petApi", () => ({
  fetchPets: vi.fn(),
  fetchPetOptions: vi.fn(),
}));

const luna: Pet = {
  id: "PP-001",
  name: "Luna",
  species: "Gato Cósmico",
  rarity: "Raro",
  price: 420,
  health: 96,
  description: "Navega entre constelaciones.",
};

const byte: Pet = {
  id: "PP-003",
  name: "Byte",
  species: "Robot",
  rarity: "Común",
  price: 160,
  health: 88,
  description: "Compañero programable.",
};

const options: PetOptions = {
  species: ["Gato Cósmico", "Robot"],
  rarities: ["Común", "Raro", "Épico", "Legendario"],
  sort: [
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
  ],
};

const response: PetResponse = {
  data: [luna, byte],
  meta: {
    total: 2,
    filtered: 2,
    appliedFilters: { search: "", species: "", rarity: "", sort: "" },
  },
};

const filters: PetFilters = { search: "", species: "", rarity: "", sort: "" };

beforeEach(() => {
  vi.mocked(fetchPetOptions).mockResolvedValue(options);
  vi.mocked(fetchPets).mockResolvedValue(response);
});

describe("interfaz de PixelPets", () => {
  it("renderiza el encabezado", () => {
    render(<Header total={18} />);
    expect(screen.getByText("Pixel")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
  });

  it("renderiza el campo de búsqueda", () => {
    render(
      <FilterPanel
        filters={filters}
        options={options}
        activeFilterCount={0}
        disabled={false}
        onFilterChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.getByRole("searchbox", { name: "Nombre" })).toBeInTheDocument();
  });

  it("renderiza los selectores", () => {
    render(
      <FilterPanel
        filters={filters}
        options={options}
        activeFilterCount={0}
        disabled={false}
        onFilterChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );
    expect(screen.getByRole("combobox", { name: "Especie" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Rareza" })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: "Orden" })).toBeInTheDocument();
  });

  it("renderiza la cantidad de resultados", () => {
    render(<ResultsSummary filtered={2} total={18} isLoading={false} />);
    expect(screen.getByRole("status")).toHaveTextContent("2");
    expect(screen.getByRole("status")).toHaveTextContent("18");
  });

  it("renderiza las tarjetas del catálogo", () => {
    render(<PetGrid pets={[luna, byte]} />);
    expect(screen.getByRole("heading", { name: "Luna" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Byte" })).toBeInTheDocument();
  });

  it("muestra los seis datos obligatorios de una mascota", () => {
    render(<PetCard pet={luna} />);
    expect(screen.getByText("PP-001")).toBeInTheDocument();
    expect(screen.getByText("Luna")).toBeInTheDocument();
    expect(screen.getByText("Gato Cósmico")).toBeInTheDocument();
    expect(screen.getByText("Raro")).toBeInTheDocument();
    expect(screen.getByText("420")).toBeInTheDocument();
    expect(screen.getByText("96%")).toBeInTheDocument();
  });

  it("consulta nuevamente al escribir una búsqueda", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByRole("heading", { name: "Luna" });
    await user.type(screen.getByRole("searchbox", { name: "Nombre" }), "Luna");
    await waitFor(
      () => expect(fetchPets).toHaveBeenLastCalledWith(
        expect.objectContaining({ search: "Luna" }),
        expect.any(AbortSignal),
      ),
      { timeout: 1200 },
    );
  });

  it("consulta por especie", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      await screen.findByRole("combobox", { name: "Especie" }),
      "Robot",
    );
    await waitFor(
      () => expect(fetchPets).toHaveBeenLastCalledWith(
        expect.objectContaining({ species: "Robot" }),
        expect.any(AbortSignal),
      ),
      { timeout: 1200 },
    );
  });

  it("consulta por rareza", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      await screen.findByRole("combobox", { name: "Rareza" }),
      "Legendario",
    );
    await waitFor(
      () => expect(fetchPets).toHaveBeenLastCalledWith(
        expect.objectContaining({ rarity: "Legendario" }),
        expect.any(AbortSignal),
      ),
      { timeout: 1200 },
    );
  });

  it("consulta con ordenamiento por precio", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(
      await screen.findByRole("combobox", { name: "Orden" }),
      "price-desc",
    );
    await waitFor(
      () => expect(fetchPets).toHaveBeenLastCalledWith(
        expect.objectContaining({ sort: "price-desc" }),
        expect.any(AbortSignal),
      ),
      { timeout: 1200 },
    );
  });

  it("limpia todos los controles", async () => {
    const user = userEvent.setup();
    render(<App />);
    const species = await screen.findByRole("combobox", { name: "Especie" });
    await user.selectOptions(species, "Robot");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));
    expect(species).toHaveValue("");
    expect(screen.getByRole("searchbox", { name: "Nombre" })).toHaveValue("");
  });

  it("visualiza el estado sin resultados", () => {
    render(<EmptyState onClear={vi.fn()} />);
    expect(screen.getByText("Ninguna criatura coincide")).toBeInTheDocument();
  });

  it("visualiza el estado de error", () => {
    render(<ErrorState message="Servidor no disponible" onRetry={vi.fn()} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Servidor no disponible");
  });

  it("permite reintentar tras un error", async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(<ErrorState message="Error" onRetry={retry} />);
    await user.click(screen.getByRole("button", { name: "Reintentar conexión" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
