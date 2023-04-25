import express from "express";
import {
  deleteBlog,
  followAnUnfollowUser,
  getMe,
  getMyPublishBlogs,
  getMySavedBlogs,
  handlePublishOrUnPublish,
  isUserFollowed,
} from "../controllers/user.controller";

const userRoutes = express.Router();

userRoutes.get("/", getMe);
userRoutes.post("/follow/:new_follow", followAnUnfollowUser);
userRoutes.get("/is-follow/:blogUserId", isUserFollowed);
userRoutes.get("/my-pulish-blog", getMyPublishBlogs);
userRoutes.get("/my-saved-blog", getMySavedBlogs);
userRoutes.patch("/publish-blog/:blogId", handlePublishOrUnPublish);
userRoutes.delete("/delete-blog/:blogId", deleteBlog);

export default userRoutes;
