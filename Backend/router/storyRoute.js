import express from 'express'
import multer from 'multer';
import protectRoute from '../middleware/protectRoute.js';
import Post from '../Model/postModel.js';
import User from '../Model/userModel.js';

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Frontend/public/status')
    },


    filename: (req, file, cb) => {
        const userId = req.user._id;
        const fileName = `${userId}-${file.originalname}`;
        cb(null, fileName);
    }
})


const upload = multer({storage: storage})

router.post('/status', protectRoute, upload.single("file"), async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json('not file found')
        }
        const userId = req.user._id;
        console.log('userId :', userId);
        const status = `https://website-s9ue.onrender.com/status/${userId}-${req.file.originalname}`;

        
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json('user not found')
        }
        user.status = status
        await user.save()

        console.log('upload complete :', req.file);
        res.status(201).json('upload complete')
    }catch(error){
        console.log('fail to upload', error.message);
        res.status(500).json({error: 'fail to upload'})
    }
})


export default router