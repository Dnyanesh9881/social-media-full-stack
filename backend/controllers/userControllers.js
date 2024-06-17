import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary"
import { generateToken, sendVerificationEmail } from "../utils/emailVerification.js";
import jwt from "jsonwebtoken"
import Post from "../models/postModel.js";

const signupUser = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) res.status(400).json({ error: "User already exits with this email or username" });

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      const verifiedToken = generateToken(email);
      sendVerificationEmail(email, verifiedToken);

      res.status(201).json({ message: 'Registration Successful Please Verify Email Then Login' });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in signupUser", error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user.isEmailVerified) {
      return res.status(400).json({error:"Verify Your Email First"});
     }
    const isPasswordCorrect = await bcryptjs.compare(password, user?.password || "")
    if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" });
    generateTokenAndSetCookie(user._id, res);
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json("logout successful");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in logoutUser", error.message);
  }
};

const followUnfollow = async (req, res) => {
  let userId = req.user._id;
  let { id } = req.params;
  try {
    let userToFollow = await User.findById(id);
    if (!userToFollow) res.status(400).json({ Error: "User not found" });
    if (userId === id) {
      res.status(400).json({ Error: "You can not follow/unfollow yourself" });
    }
    let isFollowing = req.user.following.includes(id);
    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { follower: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(201).json({message:"Unfollow successfull"});
    } else {
      await User.findByIdAndUpdate(id, { $push: { follower: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(201).json({ message: "follow successfull" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  const { name, username, email, password, bio, profilePic } = req.body;
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user is authorized to update the profile
    if (id !== req.user._id.toString()) {
      return res.status(403).json({ error: "You cannot update another user's profile" });
    }

    // Update password if provided
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt);
      user.password = hashPassword;
    }

    // Update profile picture if provided
    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      user.profilePic = uploadedResponse.secure_url;
    }

    // Update other user fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    // Save the updated user
    await user.save();

    await Post.updateMany(
			{ "replies.userId": req.user._id },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": req.user._id }] }
		);
    // Remove password from the response object
    user.password = undefined;

    // Send the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  // We will fetch user profile either with username or userId
  // query is either username or userId
  const { query } = req.params;

  try {
    let user;

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
    } else {
      // query is username
      user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
    }

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error in getUserProfile: ", err.message);
  }
};
const verifyEmail = async (req, res) => {
  const token = req.params.token;

  const userEmail = jwt.verify(token, process.env.SECRET_KEY);

  try {
    const userDb = await User.findOneAndUpdate({ email: userEmail }, { isEmailVerified: true });
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Internal server error",
      error: error
    })
  }
}
export { signupUser, loginUser, logoutUser, followUnfollow, updateUser, getUserProfile, verifyEmail };