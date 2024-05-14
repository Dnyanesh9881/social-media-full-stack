import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
  const { postedBy, text } = req.body;
  //   let { img } = req.body;
  try {
    if (!postedBy || !text) {
      return res.status(400).json({ Error: "Text and PostedBy are required" });
    }

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ Error: "User not found" });

    if (user._id.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ Error: "Unauthorised to edit the profile" });
    }

    const newPost = new Post({
      postedBy,
      text,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error is about createPost", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ Error: "post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      return res.status(400).json({ Error: "Unauthorised to delete post" });
    await Post.findOneAndDelete({ _id: postId });
    res.status(200).json("post deleted successfully");
  } catch (error) {
    console.log("Error is about deletePost", error.message);
    return res.status(500).json({ Error: error.message });
  }
};
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ Error: "Post not Found" });

    res.status(200).json(post);
  } catch (error) {
    console.log("Error is about getPost", error.message);
    return res.status(500).json({ Error: error.message });
  }
};
const likeUnlikePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ Error: "Post not Found" });

    let isliked = post.likes.includes(userId);
    if (isliked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "post unliked successfully" });
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      res.status(200).json({ message: "post liked successfully" });
    }
  } catch (error) {
    console.log("Error is about likeunlike post", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getUserPosts = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ Error: " User Not Found" });
    }
    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error is about getUserPosts ", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const feedPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ Error: "User not found" });
    }

    const following = user.following;
    const feeds = await Post.find({ postedBy: { $in: following } }).sort({
      createdAt: -1,
    });

    return res.status(200).json(feeds);
  } catch (error) {
    console.log("Error in feedPosts: ", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const replyToPost = async (req, res) => {
  try {
    let userId = req.user._id;
    let postId = req.params.id;
    let userProfilePic = req.user.profilePic;
    let username = req.user.username;
    let { text } = req.body;
    if (!text) res.status(400).json({ Error: " Text can not be empty" });
    let post = await Post.findById(postId);
    if (!post) res.status(404).json({ Error: "Post not Found" });
    let reply = { userId, text, username, userProfilePic };

    post.replies.push(reply);
    await post.save();

    res.status(201).json(reply);
  } catch (error) {
    console.log("Error is about replyToPosts ", error.message);
    return res.status(500).json({ Error: error.message });
  }
};
export {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  getUserPosts,
  feedPosts,
  replyToPost,
};
