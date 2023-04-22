import jwt from "jsonwebtoken";

const verifyJwt = <T>(token: any, secretKey: string): T | null => {
  try {
    return jwt.verify(token, secretKey) as T;
  } catch (error) {
    return null;
  }
};

export default verifyJwt;
