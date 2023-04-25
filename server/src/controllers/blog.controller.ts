import { RequestHandler } from "express";
import blogModel from "../models/blog.model";
import userModel from "../models/user.model";

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
      .populate("userId", { name: 1, email: 1, picture: 1, followers: 1 });
    res
      .status(200)
      .json({ success: true, message: "Blog fetched successfully", blog });
  } catch (error) {
    next(error);
  }
};

// /** ohter blogs from user */
export const otherFromUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.query;
  try {
    let blogs = await blogModel.find({ userId, isPublish: true }).limit(5);
    blogs = blogs.filter((blog) => blog._id != id);
    if (blogs.length === 0)
      return res
        .status(200)
        .json({ success: true, message: "Blog not found", blogs });
    res
      .status(200)
      .json({ success: true, message: "Blog fetched succefully", blogs });
  } catch (error) {
    next(error);
  }
};

// /** liking and unliking  blog */
export const likeAndUnlikeBlog: RequestHandler = async (req, res, next) => {
  const { blogId } = req.params;
  const { userId } = res.locals.user;
  try {
    // update like in blog
    const blog = await blogModel.findById(blogId);
    if (blog?.likes.includes(userId)) {
      await blog.updateOne({ $pull: { likes: userId } });
    } else {
      await blog?.updateOne({ $push: { likes: userId } });
    }
    // update like in userModel
    const user = await userModel.findById(userId);
    if (user?.likedBlogs.includes(blogId)) {
      await user.updateOne({ $pull: { likedBlogs: blogId } });
    } else {
      await user?.updateOne({ $push: { likedBlogs: blogId } });
    }
    res.status(200).json({ success: true, message: "Like updated" });
  } catch (error) {
    next(error);
  }
};

// /** checking whether or not liked blog */
export const isLikedBlog: RequestHandler = async (req, res, next) => {
  const { userId } = res.locals.user;
  const { blogId } = req.params;
  try {
    const blog = await blogModel.findById(blogId);
    const isLiked = blog?.likes.includes(userId);
    res
      .status(200)
      .json({ success: true, message: "hey you are in controller", isLiked });
  } catch (error) {
    next(error);
  }
};

// /** boiler plate code picse */
export const searchByQuery: RequestHandler = async (req, res, next) => {
  const blogQuery = req.query.q
    ? {
        $or: [
          {
            heading: {
              $regex: req.query.q,
            },
          },

          {
            description: {
              $regex: req.query.q,
            },
          },
        ],
      }
    : {};

  try {
    const blogs = await blogModel
      .find({ ...blogQuery })
      .limit(10)
      .populate("userId")
      .select("-content");
    res
      .status(200)
      .json({ success: true, message: "Blogs fechted successfully", blogs });
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
