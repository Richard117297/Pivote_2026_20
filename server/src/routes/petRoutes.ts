import { Router } from "express";
import { getPetOptions, getPets } from "../controllers/petController.js";

export const petRouter = Router();

petRouter.get("/options", getPetOptions);
petRouter.get("/", getPets);
