import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

const signupUser = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    const user = await User.findOne({ or: [{ username }, { email }] });
    if (user) res.status(400).json({ error: "User already exits" });

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
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
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
    let user = await User.findOne({ username });
    if (!username) {
      res.status(400).json({ error: "User Not Found" });
    }
    let isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(200).json({ error: "Incorrect Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in loginUser", error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "logout successful" });
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
      res.status(201).json("Unfollow sucessfull");
    } else {
      await User.findByIdAndUpdate(id, { $push: { follower: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(201).json("follow sucessfull");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("error in logoutUser", error.message);

  }
};
 const updateUser=async(req, res)=>{
  let {name, username, email, password, bio}=req.body;
  let {profilePic}=req.body
  let {id}=req.params;

     try {
         let user=await User.findById(id);
         if(!user)res.status(404).json({Error:"user not found"});
         if(password){
          let salt=await bcryptjs.genSalt(10);
          let hashPassword=await bcryptjs.hash(password, salt);
          user.password=hashPassword;
         }
         user.name=name || user.name;
         user.username= username || user.username;
         user.bio=bio || user.bio;
         user.email=email || user.email;

         await user.save();

         res.status(200).json("profile updated sucessfully");
     } catch (error) {
      res.status(500).json({ error: error.message });
    console.log("error in logoutUser", error.message);

     }
 }


export { signupUser, loginUser, logoutUser, followUnfollow, updateUser };
