import express from "express";
import {
  getAllBlog,
  getOneBlog,
  isLikedBlog,
  likeAndUnlikeBlog,
  otherFromUser,
  postBlog,
  searchByQuery,
} from "../controllers/blog.controller";
import requireUser from "../middleware/requireUser";
import validate from "../middleware/validate";
const blogRoutes = express.Router();

blogRoutes.post("/", requireUser, postBlog);
blogRoutes.get("/", getAllBlog);
blogRoutes.get("/search", searchByQuery);
blogRoutes.get("/:id", getOneBlog);
blogRoutes.get("/other-from-user/:id", otherFromUser);
blogRoutes.patch("/like-blog/:blogId", requireUser, likeAndUnlikeBlog);
blogRoutes.get("/is-liked/:blogId", requireUser, isLikedBlog);

export default blogRoutes;
