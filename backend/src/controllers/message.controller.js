import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error at Message Check Controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId:myId, receiverId: userChatId}, 
                {senderId: userChatId, receiverId: myId}
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error at Message Get Controller: ", error.message); 
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {id:userChatId} = req.params;
        const myId = req.user._id;
        const {text, image} = req.body;

        let imageUrl = "";
        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadedResponse.secure_url;
        }

        const newMessage = new Message({
            senderId: myId, 
            receiverId: userChatId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        //const message = await Message.findById(newMessage._id).populate("senderId").populate("receiverId");

        res.status(201).json(message);

    } catch (error) {
        console.log("Error at Message Send Controller: ", error.message); 
        res.status(500).json({ message: "Internal Server Error" });
    }
}
