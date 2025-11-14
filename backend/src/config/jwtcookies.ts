import { CookieOptions } from 'express';

export const JWT_CONFIG = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'gabisa',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'gabisa',
    ACCESS_TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d'
};

export const COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};