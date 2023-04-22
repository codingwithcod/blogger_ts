import { RequestHandler } from "express";
import { JWT_SECRET_FOR_SIGNIN } from "../config";
import verifyJwt from "../utils/verifyJwt";

const deserializeUser: RequestHandler = (req, res, next) => {
  try {
    let token: string | undefined;
    const checkToken = req.header("authorization")?.split(" ");
    if (checkToken) {
      if (checkToken[0] !== "Bearer") {
        token = undefined;
      } else {
        token = checkToken[1];
      }
    }
    const decoded = verifyJwt(token, JWT_SECRET_FOR_SIGNIN);
    if (decoded) {
      res.locals.user = decoded;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default deserializeUser;
