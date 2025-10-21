import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { constants } from "../constants";

export interface AuthRequest extends Request {
    user?: { id: string; username?: string | undefined };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: "No authrization header" });

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Maformed token" });

    const token = parts[1];

    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
        const decoded = jwt.verify(token, constants.JWT_SECRET) as { id: string; username?: string; iat?: number; exp?: number };
        (req as AuthRequest).user = { id: decoded.id, username: decoded.username };
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invaild or expired token" })
    }
}