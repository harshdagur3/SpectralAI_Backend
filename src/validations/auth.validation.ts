import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3, "username msut be at least 3 char"),
    password: z.string().min(6, "password must be at least 6 char")
})

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})