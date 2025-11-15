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
    console.log("=== AUTH DEBUG ===");
    console.log("All cookies:", req.cookies);
    console.log("Raw cookie header:", req.headers.cookie);

    let accessToken =
      req.cookies?.accessToken || req.cookies?.["accessToken"];

    // Fallback: baca dari Authorization header
    if (!accessToken) {
      const authHeader = req.headers.authorization;
      if (authHeader?.startsWith("Bearer ")) {
        accessToken = authHeader.slice(7);
        console.log("Access token from Authorization header");
      }
    }

    if (!accessToken) {
      console.log("No access token found in cookies or header");
      res.status(401).json({ message: "No access token found" });
      return;
    }

    const decoded = verifyToken(accessToken, JWT_CONFIG.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      res.status(401).json({ message: "Token might be invalid or expired" });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.accessToken !== accessToken) {
      res
        .status(401)
        .json({
          message:
            "Invalid or expired access token, please login again if this keeps happening",
        });
      return;
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.log("Auth error:", err);
    res.status(401).json({ message: "Token might be invalid or expired" });
  }
};