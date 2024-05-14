 import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 const protectRoute=async(req, res, next)=>{

    try {
         let token= req.cookies.jwt;
         if(!token) res.status(400).json({error: "Unauthorized please login again"});
         let decoded= jwt.verify(token, process.env.SECRET_KEY);
        //  console.log(decoded, token);
         const user=await User.findById(decoded.userId).select("-password");
         req.user=user;
         next();
    } catch (error) {
        res.status(500).json({error:error.message})
        console.log("Error in protectRoute", error.message);
    }
 }
 
 export default protectRoute;