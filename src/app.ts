import dotenv from "dotenv";
dotenv.config();

import express from "express";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import connectDB from "./config/db";


connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));