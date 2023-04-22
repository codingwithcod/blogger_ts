import express from "express";
import {
  followAnUnfollowUser,
  getMe,
  isUserFollowed,
} from "../controllers/user.controller";

import requireUser from "../middleware/requireUser";
const userRoutes = express.Router();

userRoutes.get("/", getMe);
userRoutes.post("/follow/:new_follow", followAnUnfollowUser);
userRoutes.get("/is-follow/:id", isUserFollowed);

export default userRoutes;
