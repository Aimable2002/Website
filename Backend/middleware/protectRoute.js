import jwt, { decode } from 'jsonwebtoken';
import User from '../Model/userModel.js'



const protectRoute = async(req, res, next) => {
    try{
        const result = req.headers.authorization;
        //console.log('result :', result)
        const token = result.slice(' tokenpart :'); // Split the token string by space
        //console.log(token);

        if(!token){
            return res.status(401).json({error: "Not token found"})   
        }

        const decoded = jwt.verify(token, process.env.SECRET);

        if(!decoded){
            return res.status(409).json({error: "invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        

        if(!user){
            return res.status(409).json({error: "user not found invalid data"})
        }
        req.user = user
        //console.log('user :', req.user)
        next();
    }catch(error){
        console.log("internal server protect error")
        res.status(500).json({error: "internal server protect error"})
    }
}


export default protectRoute