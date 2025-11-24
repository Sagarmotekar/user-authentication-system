import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

//SignUp
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exist = await User.findOne({ email });
    if(exist) {
        return res.json({success:false,message:"User already exists"})
    }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = new User({name,email,password:hashedPassword})
        await user.save();
        res.json({success:true,message:"user registered successfully"})
    
  } catch (error) {
    res.json({success:false,message:error.message});
  }
});


//Login
router.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        const match  = await bcrypt.compare(password,user.password);
        if(!match) {
            return res.json({success:false,message:"Wrong Password"})
        }
        const token =  jwt.sign({id:user._id},
            "SECRET_KEY",{expiresIn:"7d"});
        
            res.json({success:true,message:"Login successfully", token, userName: user.name});
    }
    catch (error) {
        res.json({success:false,message:error.message});
    }
})
export default router;