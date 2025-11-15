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
    // Debug logs
    console.log('=== AUTH DEBUG ===');
    console.log('All cookies:', req.cookies);
    console.log('Raw cookie header:', req.headers.cookie);
    
    const accessToken = req.cookies?.accessToken || req.cookies?.['accessToken'];
    
    if (!accessToken) {
      console.log('No access token found in cookies');
      res.status(401).json({ message: "No access token found" });
      return;
    }

    console.log('Access token found:', accessToken.substring(0, 20) + '...');

    const decoded = verifyToken(accessToken, JWT_CONFIG.ACCESS_TOKEN_SECRET);
    if(!decoded) {
      console.log('Token verification failed');
      res.status(401).json({ message: "Token might be invalid or expired" });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.accessToken !== accessToken) {
      console.log('User not found or token mismatch');
      res.status(401).json({ message: "Invalid or expired access token, please login again if this keeps happening" });
      return;
    }

    console.log('Auth successful for user:', decoded.username);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Auth error:', err);
    res.status(401).json({ message: "Token might be invalid or expired" });
    return;
  }
};