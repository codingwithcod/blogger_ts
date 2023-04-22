import { RequestHandler } from "express";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET_FOR_SIGNIN } from "../config";
import verifyJwt from "../utils/verifyJwt";

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

export const validateToken: RequestHandler = async (req, res, next) => {
  const { token } = req.query;
  try {
    if (!token)
      return res
        .status(404)
        .json({ success: false, message: "Token is required for validation" });

    const decoded = verifyJwt<{ userId: string }>(token, JWT_SECRET_FOR_SIGNIN);
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid or expired" });

    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res
      .status(200)
      .json({ success: true, message: "Token validate successfully" });
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
