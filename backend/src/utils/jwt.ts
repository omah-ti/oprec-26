import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/jwtcookies";
import { TokenPayload, AuthTokens } from "../types/tokens";
import { Response } from "express";
export const generateTokens = (payload: TokenPayload): AuthTokens => {
    const accessToken = jwt.sign(payload, JWT_CONFIG.ACCESS_TOKEN_SECRET, {
        expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRY
    });

    const refreshToken = jwt.sign(payload, JWT_CONFIG.REFRESH_TOKEN_SECRET, {
        expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRY
    })

    return { accessToken, refreshToken };
}

export const verifyToken = (token: string, secret: string): TokenPayload => {
    return jwt.verify(token, secret) as TokenPayload;
}

export const setCookies = (res: Response, tokens: {accessToken: string, refreshToken: string}, COOKIE_CONFIG: any) => {
    res.cookie('accessToken', tokens.accessToken, COOKIE_CONFIG);
    res.cookie('refreshToken', tokens.refreshToken, COOKIE_CONFIG);
}

export const clearAuthCookies = (res: Response): void => {
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/',
        domain: process.env.COOKIE_DOMAIN || undefined
    };
    
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
    
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none' as const,
        path: '/'
    });
};