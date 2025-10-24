import { z } from "zod";

export const updateUserProfileSchema = z.object({
    username: z.string().min(3, "username msut be at least 3 char").optional(),
    password: z.string().min(6, "password must be at least 6 char").optional(),
});