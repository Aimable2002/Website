import express from 'express'
import multer from 'multer';
import protectRoute from '../middleware/protectRoute.js';
import Post from '../Model/postModel.js';
import User from '../Model/userModel.js';

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Frontend/public/images')
    },
    // filename: (req, file, cb) => {
    //     cb(null, file.originalname)
    // }

    // filename: (req, file, cb) => {
    //     const userId = req.user._id.toString();
    //     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    //     const newFilename = `${userId}-${uniqueSuffix}-${file.originalname}`;
        
    //     cb(null, newFilename);
    // }


    filename: (req, file, cb) => {
        const userId = req.user._id;
        const fileName = `${userId}-${file.originalname}`;
        cb(null, fileName);
    }
})


const upload = multer({storage: storage})

router.post('/profile', protectRoute, upload.single("file"), async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json('not file found')
        }
        const userId = req.user._id;
        console.log('userId :', userId);
        const profile = `http://localhost:2000/images/${userId}-${req.file.originalname}`;

        
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json('user not found')
        }
        user.profile = profile
        await user.save()

        console.log('upload complete :', req.file);
        res.status(201).json('upload complete')
    }catch(error){
        console.log('fail to upload', error.message);
        res.status(500).json({error: 'fail to upload'})
    }
})

router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
    try{
        if(!req.file){
            return res.status(400).json('no file found')
        }
        const userId = req.user._id
        const imageUrl = `http://localhost:2000/images/${userId}-${req.file.originalname}`;

        let user = await Post.findById(userId);
        if(!user){
            user = await Post.create({
                userId: userId,
                imageURL: imageUrl,
            })
            await user.save();
        }else{
            user.imageURL = imageUrl
            await user.save();
        }
        
        console.log('upload complete :', req.file);
        res.status(201).json('upload complete')
    }catch(error){
        console.log('fail to upload', error.message);
        res.status(500).json({error: 'fail to upload'})
    }
})


// router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
//     try{
//         if(!req.file){
//             return res.status(400).json('no file found')
//         }
//         const userId = req.user._id
//         const imageUrl = `http://localhost:2000/images/${userId}-${req.file.originalname}`;

//         const user = await User.findById(userId);
//         if(!user){
//             return res.status(400).json('user not found')
//         }

//         user.post = imageUrl;
//         await user.save();
//         console.log('upload complete :', req.file);
//         res.status(201).json('upload complete')
//     }catch(error){
//         console.log('fail to upload', error.message);
//         res.status(500).json({error: 'fail to upload'})
//     }
// })

router.get('/getPost', protectRoute, async(req, res) => {
    try{
        const userReqId = req.user._id;
        const filterPost = await Post.find(userReqId);
        res.status(200).json(filterPost)
    }catch(error){
        console.log('internal server get post error', error.message);
        res.status(500).json({error: 'internal server post error'})
    }
})


export default router

