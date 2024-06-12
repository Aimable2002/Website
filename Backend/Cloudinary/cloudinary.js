import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';

dotenv.config();

const connectCloud = async() => {
    try{
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        });
        console.log('connection provided')
    }catch(error){
        console.log('fail to connect cloud ')
    }
}


export default connectCloud