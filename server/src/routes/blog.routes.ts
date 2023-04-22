import express from "express";
import {
  getAllBlog,
  getOneBlog,
  ohterFromUser,
  postBlog,
} from "../controllers/blog.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validate";
const blogRoutes = express.Router();

blogRoutes.post("/", requireUser, postBlog);
blogRoutes.get("/", getAllBlog);
blogRoutes.get("/:id", getOneBlog);
blogRoutes.get("/other-from-user/:id", ohterFromUser);

export default blogRoutes;
