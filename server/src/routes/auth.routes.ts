import express from "express";
import { getController } from "../controllers/auth.controller";
const authRoutes = express.Router();

authRoutes.get("/", getController);

export default authRoutes;
