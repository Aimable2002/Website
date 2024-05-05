import mongoose from "mongoose";


const connectDB = async() => {
    try{
        const URI = process.env.URI;

        await mongoose.connect(URI)

        console.log('connect database')
    }catch(error){
        console.log('fail to connect database')
    }
}


export default connectDB