import dotenv from "dotenv";
dotenv.config();


import express from "express";
import uploadRoutes from "./routes/upload.routes";
const app = express();

app.use(express.json());

app.use("/api", uploadRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));