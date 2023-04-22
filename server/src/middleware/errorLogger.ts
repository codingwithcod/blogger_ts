import { ErrorRequestHandler } from "express";

const errorLogger: ErrorRequestHandler = (err, req, res, next) => {
  try {
    console.log("---||-----||---->", err);
    res
      .status(500)
      .json({ success: false, error: err.name, message: err.message });
  } catch (error) {
    console.log(error);
  }
};

export default errorLogger;
