import express from "express";
import { signIn, validateToken } from "../controllers/auth.controller";
import validate from "../middleware/validate";
import { signInSchema, validateTokenSchema } from "../validation/auth.schema";
const authRoutes = express.Router();

authRoutes.post("/signin", validate(signInSchema), signIn);
authRoutes.get("/validate-token", validate(validateTokenSchema), validateToken);

export default authRoutes;
