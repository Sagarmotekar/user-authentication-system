import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library"; // <-- ADD THIS

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 

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

router.post("/google", async (req, res) => {
  const { token } = req.body;
  try {
    // 1. Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // 2. Check if user exists in database
    let user = await User.findOne({ email });

    // 3. If user doesn't exist, create them
    if (!user) {
      user = new User({
        name: name,
        email: email,
        // Google users don't have a local password
      });
      await user.save();
    }

    // 4. Generate your local JWT
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "SECRET_KEY", { expiresIn: "7d" });

    // 5. Send response
    res.json({
      success: true,
      message: "Google login successful",
      token: jwtToken,
      userName: user.name,
    });

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
});
export default router;