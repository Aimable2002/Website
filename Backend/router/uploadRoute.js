import express from 'express'
import multer from 'multer';
import path from 'path'
import protectRoute from '../middleware/protectRoute.js';
import Post from '../Model/postModel.js';
import User from '../Model/userModel.js';
import Follow from '../Model/followModel.js'
import {io} from '../socket/socket.io.js'

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Frontend/public/images')
    },


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
        const profile = `https://website-s9ue.onrender.com/images/${userId}-${req.file.originalname}`;

        
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


// router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
//     try{
//         if(!req.file){
//             return res.status(400).json('no file found')
//         }
//         const userId = req.user._id
//         const imageUrl = `http://localhost:2000/images/${userId}-${req.file.originalname}`;

//         let user = await Post.findById(userId);
//         if(!user){
//             user = await Post.create({
//                 userId: userId,
//                 imageURL: imageUrl,
//             })
//             await user.save();
//         }else{
//             user.imageURL = imageUrl
//             await user.save();
//         }
//         io.emit('postUploaded', { imageURL: imageUrl });
//         console.log('upload complete :', req.file);
//         res.status(201).json({message: 'post upload complete', pstImage: imageUrl})
//     }catch(error){
//         console.log('fail to upload', error.message);
//         res.status(500).json({error: 'fail to upload'})
//     }
// })


// router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
//     try {
//       if (!req.file) {
//         return res.status(400).json('no file found');
//       }
  
//       const userId = req.user._id;
//       const fileExtension = path.extname(req.file.originalname).toLowerCase();
//       let fileType = 'image';
  
//       if (fileExtension === '.mp4' || fileExtension === '.mov' || fileExtension === '.avi') {
//         fileType = 'video';
//       }
//       const imageUrl = `http://localhost:2000/images/${userId}-${req.file.originalname}`;
  
//       let user = await Post.findById(userId);
  
//       if (!user) {
//         user = await Post.create({
//           userId: userId,
//           type: fileType,
//           imageURL: imageUrl,
//         });
//         await user.save();
//       } else {
//         user.type = fileType;
//         user.imageURL = imageUrl
//         await user.save();
//       }
  
//       io.emit('postUploaded', { type: fileType, imageURL: imageUrl });
//       console.log('upload complete:', req.file);
//       res.status(201).json({ message: 'post upload complete', type: fileType, imageURL: imageUrl });
//     } catch (error) {
//       console.log('fail to upload', error.message);
//       res.status(500).json({ error: 'fail to upload' });
//     }
//   });


router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json('no file found');
      }

      const userId = req.user._id;
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      let fileType = 'image';

      if (fileExtension === '.mp4' || fileExtension === '.mov' || fileExtension === '.avi') {
          fileType = 'video';
      }

      let url;
      if (fileType === 'video') {
          url = `https://website-s9ue.onrender.com/images/${userId}-${req.file.originalname}`;
      } else {
          url = `https://website-s9ue.onrender.com/images/${userId}-${req.file.originalname}`;
      }

      let user = await Post.findById(userId);

      if (!user) {
          user = await Post.create({
              userId: userId,
              type: fileType,
              imageURL: fileType === 'image' ? url : '',
              videoURL: fileType === 'video' ? url : '',
          });
          await user.save();
      } else {
          user.type = fileType;
          user.imageURL = fileType === 'image' ? url : '';
          user.videoURL = fileType === 'video' ? url : '';
          await user.save();
      }

      io.emit('postUploaded', { type: fileType, url: url });
      console.log('upload complete:', req.file);
      res.status(201).json({ message: 'post upload complete', type: fileType, imageURL: url });
  } catch (error) {
      console.log('fail to upload', error.message);
      res.status(500).json({ error: 'fail to upload' });
  }
});


router.get('/getPost', protectRoute, async(req, res) => {
    try{
        const currentUserId = req.user._id;

        const posts = await Post.find().populate('userId').lean().sort({createdAt: -1});

        const following = await Follow.find({ follower: currentUserId }).lean();
        const followingSet = new Set(following.map(f => f.following.toString()));

        const postsWithFollowInfo = posts.map(post => {
            const user = post.userId;
            const isFollowing = followingSet.has(user._id.toString());
            return {
                ...post,
                user: user,
                isFollowing: isFollowing
            };
        });
        //console.log('postwithfollowinfo :', postsWithFollowInfo)
        res.status(200).json(postsWithFollowInfo);
    }catch(error){
        console.log('internal server get post error', error.message);
        res.status(500).json({error: 'internal server post error'})
    }
})



export default router

