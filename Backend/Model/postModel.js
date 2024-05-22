import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: 'Number',
        default: '',
    },
    created_at: [{
        type: Date,
        default: new Date(),
    }],
    imageURL: {
        type: String,
    }
}, {timestamps: true})

const Post = new mongoose.model("Post", postSchema);

export default Post