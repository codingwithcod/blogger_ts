import { RequestHandler } from "express-serve-static-core";
import blogModel from "../models/blog.model";
import userModel from "../models/user.model";

export const getMe: RequestHandler = async (req, res, next) => {
  const { userId } = res.locals.user;
  try {
    const user = await userModel
      .findById(userId)
      .select("-sub -createdAt -updatedAt");
    res.status(200).json({
      success: true,
      message: "User has been fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

/** user follow and unfollow handle in both user */
export const followAnUnfollowUser: RequestHandler = async (req, res, next) => {
  const { userId } = res.locals.user;
  const { new_follow } = req.params;

  try {
    if (!new_follow)
      return res
        .status(404)
        .json({ success: false, message: "Follow user id not found" });

    /** upate follow for Main user */
    const user = await userModel.findById(userId);
    if (user?.followings.includes(new_follow)) {
      await user.updateOne({ $pull: { followings: new_follow } });
      res
        .status(200)
        .json({ success: true, message: "Unfollowed successfully" });
    } else {
      await user?.updateOne({ $push: { followings: new_follow } });
      res.status(200).json({ success: true, message: "Followed successfully" });
    }

    /** upate follow for Another user */
    const secondUser = await userModel.findById(new_follow);
    if (secondUser?.followers.includes(userId)) {
      await secondUser.updateOne({ $pull: { followers: userId } });
    } else {
      await secondUser?.updateOne({ $push: { followers: userId } });
    }
  } catch (error) {
    next(error);
  }
};

// /** for check if user followed or not */
export const isUserFollowed: RequestHandler = async (req, res, next) => {
  const { userId } = res.locals.user;
  const { id } = req.params;
  try {
    if (userId == id) {
      res.status(200).json({
        success: true,
        isSelf: true,
      });
    }
    const user = await userModel.findById(userId);
    const isFollowed = user?.followings.includes(id);

    res.status(200).json({
      success: true,
      isFollowed,
    });
  } catch (error) {
    next(error);
  }
};

// /** boiler plate code picse */
export const example: RequestHandler = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "hey you are in controller" });
  } catch (error) {
    next(error);
  }
};
