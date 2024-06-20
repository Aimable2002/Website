import mongoose from "mongoose";

const privateSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        default: [], // Set default value as an empty array
    },
    totalLikes: {
        type: Number,
        default: 0, // Default value is 0
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
    imageURL: {
        type: String,
    },
    type: {
        type: String
    },
    videoURL: {
        type: String,
    }
}, {timestamps: true})

const Private = new mongoose.model("Private", privateSchema);

export default Private