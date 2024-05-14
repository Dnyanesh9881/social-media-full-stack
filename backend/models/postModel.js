import mongoose from "mongoose";

const postShema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    img: {
      type: String,
    },
    text: {
      type: String,
      required: true,
      maxLength: 500,
    },
    likes: {
      type: [String],
      ref: "User",
      defaultL: [],
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        userProfilePic: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postShema);

export default Post;
