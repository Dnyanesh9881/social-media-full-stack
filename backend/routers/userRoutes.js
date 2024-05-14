import express from "express";
import {
  followUnfollow,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from "../controllers/userControllers.js";
import protectRoute from "../middlewares/protectRoute.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logoutUser);
userRoutes.post("/follow/:id", protectRoute, followUnfollow);
userRoutes.post("/update/:id", protectRoute, updateUser);

export default userRoutes;
