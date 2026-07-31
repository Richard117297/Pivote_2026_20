import request from "supertest";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import { app } from "./app.js";

const petListResponseSchema = z.object({
  data: z.array(z.unknown()),
  meta: z.object({
    total: z.number(),
    filtered: z.number(),
  }),
});

const errorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

describe("PixelPets API", () => {
  it("GET /api/health informa el estado del servidor", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: "ok",
      service: "pixelpets-api",
    });
  });

  it("GET /api/pets devuelve el catálogo y sus metadatos", async () => {
    const response = await request(app).get("/api/pets");
    const body = petListResponseSchema.parse(response.body as unknown);
    expect(response.status).toBe(200);
    expect(body.data.length).toBe(18);
    expect(body.meta).toMatchObject({ total: 18, filtered: 18 });
  });

  it("responde 400 ante parámetros inválidos", async () => {
    const response = await request(app).get("/api/pets?rarity=Ultra");
    const body = errorResponseSchema.parse(response.body as unknown);
    expect(response.status).toBe(400);
    expect(body.error).toMatchObject({
      code: "INVALID_QUERY",
      message: "Los parámetros de consulta no son válidos.",
    });
  });

  it("responde 200 y una colección vacía cuando no hay coincidencias", async () => {
    const response = await request(app).get("/api/pets?search=NoExiste");
    const body = petListResponseSchema.parse(response.body as unknown);
    expect(response.status).toBe(200);
    expect(body.data).toEqual([]);
    expect(body.meta.filtered).toBe(0);
  });
});
