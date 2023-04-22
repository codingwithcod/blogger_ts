import { RequestHandler } from "express";
import blogModel from "../models/blog.model";

/** ---------- saving blog here --------- */
export const postBlog: RequestHandler = async (req, res, next) => {
  const { userId } = res.locals?.user;
  const { isPublish } = req.body;
  try {
    const blog = await blogModel.create({ ...req.body, userId });
    res.status(201).json({
      success: true,
      message: isPublish
        ? "Blog published successfully"
        : "Blog saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/** ---------- geting all blog ----------- */
export const getAllBlog: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await blogModel
      .find({ isPublish: true })
      .populate("userId", { name: 1, email: 1, picture: 1 })
      .select("-content");
    res
      .status(200)
      .json({ success: true, message: "Blog fetched successfully", blogs });
  } catch (error) {
    next(error);
  }
};

/** ---------- geting one blog ----------- */
export const getOneBlog: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await blogModel
      .findById(id)
      .populate("userId", { name: 1, email: 1, picture: 1 });
    res
      .status(200)
      .json({ success: true, message: "Blog fetched successfully", blog });
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
