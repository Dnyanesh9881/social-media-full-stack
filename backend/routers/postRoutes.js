import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  createPost,
  deletePost,
  feedPosts,
  getPost,
  getUserPosts,
  likeUnlikePost,
  replyToPost,
} from "../controllers/postControllers.js";

const postRoutes = express.Router();

postRoutes.get("/feed", protectRoute, feedPosts);
postRoutes.get("/:id", getPost);
postRoutes.get("/user/:username", getUserPosts);
postRoutes.post("/create", protectRoute, createPost);
postRoutes.delete("/delete", protectRoute, deletePost);
postRoutes.put("/reply/:id", protectRoute, replyToPost);
postRoutes.put("/like/:id", protectRoute, likeUnlikePost);

export default postRoutes;