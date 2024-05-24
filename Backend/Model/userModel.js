import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true,
        enum: ["Male", "Female"],
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: 'Number',
        require: true
    },
    avatar: {
        type: String,
        default: ''
    },
    profile: {
        type: String,
        default: ''
    },
    totalFollower: {
        type: Number,
        default: 0
    },
    totalFollowing: {
        type: Number,
        default: 0
    },
},{timestamps: true})


const  User = mongoose.model("User", userSchema);

export default User;