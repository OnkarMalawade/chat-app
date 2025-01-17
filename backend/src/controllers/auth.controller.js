import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
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

export const signin = (req, res) => {
    res.send("Sign In route");
};

export const logout = (req, res) => {
    res.send("Log Out route");
};