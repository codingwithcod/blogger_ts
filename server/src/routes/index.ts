import express from "express";
import authRoutes from "./auth.routes";
import blogRoutes from "./blog.routes";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/blog", blogRoutes);

export default router;
