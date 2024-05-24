import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
    }
}, {timestamps: true})

const Post = new mongoose.model("Post", postSchema);

export default Post