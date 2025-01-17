import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const{email, fullName, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message : "All fields are required"
            })
        }
        // hash password
        if (password.length < 8) {
            return res.status(400).json({
                message : "Password must be at least 8 characters long"
            })
        }

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({
                message : "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            fullName: fullName,
            password : hashedPassword
        });

        if(newUser){
            // generate token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id : newUser._id,
                email : newUser.email,
                fullName : newUser.fullName,
                profilePicture : newUser.profilePicture,
            })
        }else{
            res.status(400).json({
                message : "User not created"
            });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const login = async (req, res) => {
    const{email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message : "Invalid Credentials"
            });
        }

        // generate token
        generateToken(user._id, res);

        res.status(200).json({
            _id : user._id,
            email : user.email,
            fullName : user.fullName,
            profilePicture : user.profilePicture,
        });
    } catch (error) {
        console.log("Error in User Signin: ", error.message);
        res.status(500).json({ message: "Internal Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie
        res.status(200).json({ message: "Logout successful" }); // Send the response
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" }); // Handle errors
    }
};

export const updateProfile = async (req, res) => {
    const { fullName, profilePicture } = req.body;
    try {
        const {profilePicture} = req.body;
        const userId = req.user._id;

        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is required" });
        }
        
        const uploadedResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePicture: uploadedResponse.secure_url}, { new: true });
        res.status(200).json(
            updatedUser,
        );
    } catch (error) {
        console.log("Error at User Update Controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error at User Check Controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}




