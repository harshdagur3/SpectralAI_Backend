import { Request, Response, NextFunction } from "express";
import { signupSchema, loginSchema } from "../validations/auth.validation";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { constants } from "../constants";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = signupSchema.parse(req.body);

        const exists = await User.findOne({ username: parsed.username });
        if (exists) return res.status(400).json({ error: "user already exists!" });

        const hashed = await bcrypt.hash(parsed.password, 10);
        await User.create({ username: parsed.username, password: hashed });
        return res.status(200).json({ message: "user created!" });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ error: "Invalid creadentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid creadentials" });

        const token = jwt.sign({ id: user._id }, constants.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "login succussful", token });
    } catch (error) {
        next(error);
    }
}