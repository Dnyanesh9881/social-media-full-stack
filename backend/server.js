import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRoutes.js";
import postRoutes from "./routers/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: '50mb' }));                                                                                                   
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})