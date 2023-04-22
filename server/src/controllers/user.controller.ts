import { RequestHandler } from "express-serve-static-core";
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
