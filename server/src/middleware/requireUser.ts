import { RequestHandler } from "express";

const requireUser: RequestHandler = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Please signin first" });
    next();
  } catch (error) {
    next(error);
  }
};

export default requireUser;
