import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeRoles = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized: No user found" });
        }

        // check role
        if (!roles.includes((req.user as any).role)) {
            return res.status(403).json({ error: "Forbidden: Access denied" });
        }

        next();
    };
};
