import express from "express";
import requireUser from "../middleware/requireUser";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
import userRoutes from "./user.routes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);
router.use("/user", requireUser, userRoutes);

export default router;
