import mongoose from "mongoose";


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
}, {timestamps: true});


const Follow = mongoose.model('Follow', followSchema);

export default Follow