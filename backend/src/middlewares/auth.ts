import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { JWT_CONFIG } from "../config/jwtcookies";
import { IGetRequestWithUser } from "../types/getUserRequest";
import User from "../models/userModels";

export const authenticateToken = async (
  req: IGetRequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies['accessToken'];
    if (!accessToken) {
      res.status(401).json({ message: "No access token found" });
      return;
    }
    // Verify the token to get the payload
    const decoded = verifyToken(accessToken, JWT_CONFIG.ACCESS_TOKEN_SECRET);
    if(!decoded) {
      res.status(401).json({ message: "Token might be invalid or expired" });
      return;
    }
    // Find the user by ID from the token payload
    const user = await User.findById(decoded.userId);
    if (!user || user.accessToken !== accessToken) {
      res.status(401).json({ message: "Invalid or expired access token, please login again if this keeps happening" });
      return;
    }
    // Attach user data to req object
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token might be invalid or expired" });
    return;
  }
};
