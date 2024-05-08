import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,
        require: true,
        ref: "User",
    },
    recieverId: {
        type: String,
        require: true,
        ref: "User",
    },
    message: {
        type: String,
        require: true
    }
}, {timestamps: true})


const Message = new mongoose.model("Message", messageSchema);

export default Message