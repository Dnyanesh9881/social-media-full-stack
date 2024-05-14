import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRoutes.js";
import postRoutes from "./routers/postRoutes.js";

dotenv.config();
connectDB();

const app=express();
const PORT=process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})