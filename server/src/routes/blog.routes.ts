import express from "express";
import {
  getAllBlog,
  getOneBlog,
  postBlog,
} from "../controllers/blog.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validate";
const blogRoutes = express.Router();

blogRoutes.post("/", requireUser, postBlog);
blogRoutes.get("/", getAllBlog);
blogRoutes.get("/:id", getOneBlog);

export default blogRoutes;
