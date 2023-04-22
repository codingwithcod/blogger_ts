import express from "express";
import { getMe } from "../controllers/user.controller";

import requireUser from "../middleware/requireUser";
const userRoutes = express.Router();

userRoutes.get("/", requireUser, getMe);

export default userRoutes;
