
import express from "express";
import {
  followUnfollow,
  getUserProfile,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
  verifyEmail,
} from "../controllers/userControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const userRoutes = express.Router();

userRoutes.get("/verifytoken/:token", verifyEmail);
userRoutes.put("/update/:id", protectRoute, updateUser);
userRoutes.get("/profile/:query", getUserProfile);
userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/follow/:id", protectRoute, followUnfollow);

export default userRoutes;
