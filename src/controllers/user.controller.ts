import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import { AuthRequest } from "../middlewares/auth.middleware";
import bcrypt from "bcrypt";
import { updateUserProfileSchema } from "../validations/user.validation";

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

export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: "user not found" });
        return res.status(200).json({ succuss: true, user });
    } catch (error) {
        next(error);
    }
}

export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        const { username, password } = updateUserProfileSchema.parse(req.body);
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "user not found" });
        
        if (username) {
            const exists = await User.findOne({ username });
            if (exists && exists.id != userId) {
                return res.status(409).json({ error: "User already exists!" });
            }
            user.username = username;
        }

        if (password) {
            const hashed = await bcrypt.hash(password, 10);
            user.password = hashed;
        }
        await user.save();
        
        const userObj:any = user.toObject();
        delete userObj.password;
        return res.status(200).json({ message: "Profile Updated!", userObj });
    } catch (error) {
        next(error);
    }
}