import type { ErrorRequestHandler, RequestHandler } from "express";
import { ZodError } from "zod";

export const notFoundHandler: RequestHandler = (_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "El recurso solicitado no existe.",
    },
  });
};

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request,
  response,
  next,
) => {
  void next;
  if (error instanceof ZodError) {
    response.status(400).json({
      error: {
        code: "INVALID_QUERY",
        message: "Los parámetros de consulta no son válidos.",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
    });
    return;
  }

  console.error("Error no controlado en PixelPets API", error);
  response.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message: "No fue posible procesar la solicitud.",
    },
  });
};
