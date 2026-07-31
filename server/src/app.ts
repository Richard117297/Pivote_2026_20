import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { petRouter } from "./routes/petRoutes.js";

export const app = express();

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "pixelpets-api" });
});
app.use("/api/pets", petRouter);

if (process.env.NODE_ENV === "production") {
  const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
  const clientDirectory = path.resolve(currentDirectory, "../../client/dist");

  app.use(express.static(clientDirectory));
  app.get("*", (_request, response) => {
    response.sendFile(path.join(clientDirectory, "index.html"));
  });
} else {
  app.use(notFoundHandler);
}

app.use(errorHandler);
