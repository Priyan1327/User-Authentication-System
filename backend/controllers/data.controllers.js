import mongoose from "mongoose";
import Data from "../models/data.model.js";
import jwt from "jsonwebtoken"


export const createData = async (req , res) => {
     const data = req.body; // To creat new Data

      // 404 error is END-POINT is not found in postman.

     if( !data.password || !data.username|| !data.lastname || 
         !data.firstname || !data.email || !data.phonenumber || 
         !data.address || !data.pincode){

          return res.status(400).json({success : false , message : "please provide all Fields "})
     }

     const newData = new Data(data); //creating new Data

     try{
          await newData.save();
          res.status(201).json({success : true , data : newData})
     }catch(error){
         console.error("Error meassage :", error.message)
         res.status(500).json({success : false , message : "Server Error"})
     }
};

export const deleteData = async (req, res) => {
    const userId = req.user.userId; // comes from token

    try {
        const user = await Data.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "You Can Delete Your Own Account Only"
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateData = async (req,res) => {
    const{id} = req.params;

    const user = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success : false , message:"In User Valid ID"})
    }

    try{

        const updateuser = await Data.findByIdAndUpdate(id, user,{new : true , runValidators : true});
        if(!updateuser){
            return res.status(404).json({success:false , message : "User Not Found"})
        }
        else
           res.status(200).json({success : true , data : updateuser});

    }catch(error){
      res.status(500).json({success : false , message : error.message });
    }

};

export const getData = async (req, res) => {
  try {
    const username = req.user.username;  // from token
    const user = await Data.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);  // ✅ return user data as JSON
  } catch (error) {
    console.error("Error in getData:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received login:", username, password);

    //  1. Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    //  2. Find the user by username
    const user = await Data.findOne({ username });  

    console.log("Founduser :",user)

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    //  3. Compare password
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    //  4. Generate JWT token
    const jwtToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY || "mySecretKey",
      { expiresIn: "1h" }
    );

    //  5. Send response
    
    return res.status(200).json({ success: true, token: jwtToken });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
