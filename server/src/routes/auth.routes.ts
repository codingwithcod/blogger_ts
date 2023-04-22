import express from "express";
import { signIn, validateToken } from "../controllers/auth.controller";
const authRoutes = express.Router();

authRoutes.post("/signin", signIn);
authRoutes.get("/validate-token", validateToken);

export default authRoutes;
