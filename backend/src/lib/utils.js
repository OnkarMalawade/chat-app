import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    // time allocate
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //miliseconds
        httpOnly: true, //can only be accessed by the server
        sameSite: "strict", //cookie can only be sent to the same site
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}