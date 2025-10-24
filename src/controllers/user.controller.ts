import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";

//only admin can access
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find().select("-password");
        if (!users.length) return res.status(404).json({ error: "No users found!" });
        return res.status(200).json({success:true, users });
    } catch (error) {
        next(error);
    }
}

