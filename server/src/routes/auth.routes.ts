import express from "express";
import { signIn } from "../controllers/auth.controller";
const authRoutes = express.Router();

authRoutes.post("/signin", signIn);

export default authRoutes;
