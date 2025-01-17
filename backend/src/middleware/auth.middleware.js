import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        // get token
        const token = req.cookies.jwt;
        
        // check if token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized Access" });
        }

        // check if user exists
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Unauthorized Access By User" });
        }

        req.user = user;
        next();


    }catch(error) {
        console.log("Error at User Update Middleware: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}