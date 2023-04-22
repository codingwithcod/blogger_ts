import { RequestHandler } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET_FOR_SIGNIN } from "../config";

export const signIn: RequestHandler = async (req, res, next) => {
  const { name, email, sub, picture } = req.body;
  try {
    const isUser = await userModel.findOne({ sub });
    if (!isUser) {
      const newUser = await userModel.create({
        name,
        email,
        sub,
        picture,
      });
      const access_token = jwt.sign(
        { userId: newUser._id },
        JWT_SECRET_FOR_SIGNIN
      );

      res.status(201).json({
        success: true,
        message: "User signin successfully",
        access_token,
      });
    } else {
      const access_token = jwt.sign(
        { userId: isUser._id },
        JWT_SECRET_FOR_SIGNIN
      );

      res.status(200).json({
        success: true,
        message: "User login successfully",
        access_token,
      });
    }
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
