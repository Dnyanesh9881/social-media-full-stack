import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    following: {
      type: [String],
      default: [],
    },
    follower: {
      type: [String],
      default: [],
    },
    isFreez: {
      type: Boolean,
      default: false,
    },
    isEmailVerified:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const User=mongoose.model("User", userSchema);

export default User;