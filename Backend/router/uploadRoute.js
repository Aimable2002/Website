import express from 'express'
import multer from 'multer';
import path from 'path'
import protectRoute from '../middleware/protectRoute.js';
import Post from '../Model/postModel.js';
import User from '../Model/userModel.js';
import Follow from '../Model/followModel.js'
import {io} from '../socket/socket.io.js'


import { v2 as cloudinary } from 'cloudinary';

import Private from '../Model/private.js';

const router = express.Router();



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Frontend/public/images')
//     },


//     filename: (req, file, cb) => {
//         const userId = req.user._id;
//         const fileName = `${userId}-${file.originalname}`;
//         cb(null, fileName);
//     }
// })

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




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

const uploadToCloudinary = (buffer, folderName) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });
  };
  
router.post('/profile', protectRoute, upload.single("file"), async (req, res) => {
    try {
        console.log('req file :', req.file)
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }
            let folderName = 'profile_upload'
            const result = await uploadToCloudinary(req.file.buffer, folderName);
            console.log('result :', result)

            const userId = req.user._id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            user.profile = result.secure_url;
            await user.save();
            console.log('upload complete:', result.secure_url);
            res.status(201).json({ message: 'Upload complete', url: result.secure_url });
    } catch (error) {
        console.error('Failed to upload', error.message);
        res.status(500).json({ error: 'Failed to upload' });
    }
});



// router.post('/posted', protectRoute, upload.single("file"), async(req, res) => {
//   try {
//       if (!req.file) {
//           return res.status(400).json('no file found');
//       }

//       const userId = req.user._id;
//       const fileExtension = path.extname(req.file.originalname).toLowerCase();
//       let fileType = 'image';

//       if (fileExtension === '.mp4' || fileExtension === '.mov' || fileExtension === '.avi') {
//           fileType = 'video';
//       }

//       let url;
//       if (fileType === 'video') {
//           url = `https://website-s9ue.onrender.com/images/${userId}-${req.file.originalname}`;
          
//       } else {
//           url = `https://website-s9ue.onrender.com/images/${userId}-${req.file.originalname}`;
//       }

      

//       let user = await Post.findById(userId);
//       if (!user) {
//           user = await Post.create({
//               userId: userId,
//               type: fileType,
//               imageURL: fileType === 'image' ? url : '',
//               videoURL: fileType === 'video' ? url : '',
//           });
//           await user.save();
//       } else {
//           user.type = fileType;
//           user.imageURL = fileType === 'image' ? url : '';
//           user.videoURL = fileType === 'video' ? url : '';
//           await user.save();
//       }

//       io.emit('postUploaded', { type: fileType, url: url });
//       console.log('upload complete:', req.file);
//       res.status(201).json({ message: 'post upload complete', type: fileType, imageURL: url });
//   } catch (error) {
//       console.log('fail to upload', error.message);
//       res.status(500).json({ error: 'fail to upload' });
//   }
// });

const uploadToCloudinaryPost = (buffer, folderName, resourceType) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder: folderName },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(buffer);
    });
  }
router.post('/posted', protectRoute, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json('no file found');
      }
  
      const userId = req.user._id;
      console.log('userId :', userId)
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      let resourceType = 'image';
      let folderName = 'post_upload';
  
      if (['.mp4', '.mov', '.avi', '.mpeg', '.webm', '.3gpp'].includes(fileExtension)) {
        resourceType = 'video';
      }
  
      const result = await uploadToCloudinaryPost(req.file.buffer, folderName, resourceType);
      const url = result.secure_url;
      console.log('resourceType :', resourceType)
    //   const user = await Post.findById(userId);

      const post = new Post({
        userId: userId,
        type: resourceType,
        imageURL: resourceType === 'image' ? url : '',
        videoURL: resourceType === 'video' ? url : '',
      });
      await post.save();
      io.emit('postUploaded', { type: resourceType, url: url });
  
      console.log('upload complete:', url);
      res.status(201).json({ message: 'post upload complete', type: resourceType, imageURL: url });
    } catch (error) {
      console.log('fail to upload', error.message);
      res.status(500).json({ error: 'fail to upload' });
    }
  });


  router.post('/private', protectRoute, upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json('no file found');
      }
  
      const userId = req.user._id;
      console.log('userId :', userId)
      const fileExtension = path.extname(req.file.originalname).toLowerCase();
      let resourceType = 'image';
      let folderName = 'private_upload';
  
      if (['.mp4', '.mov', '.avi', '.mpeg', '.webm', '.3gpp'].includes(fileExtension)) {
        resourceType = 'video';
      }
  
      const result = await uploadToCloudinaryPost(req.file.buffer, folderName, resourceType);
      const url = result.secure_url;
      console.log('resourceType :', resourceType)
    //   const user = await Post.findById(userId);

      const privatePost = new Private({
        userId: userId,
        type: resourceType,
        imageURL: resourceType === 'image' ? url : '',
        videoURL: resourceType === 'video' ? url : '',
      });
      await privatePost.save();
      io.emit('privateUploaded', { type: resourceType, url: url });
  
      console.log('upload complete:', url);
      res.status(201).json({ message: 'private upload complete', type: resourceType, imageURL: url });
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


router.get('/getPrivate', protectRoute, async(req, res) => {
  try{
      const currentUserId = req.user._id;

      const privatePost = await Private.find().populate('userId').lean().sort({createdAt: -1});

      const following = await Follow.find({ follower: currentUserId }).lean();
      const followingSet = new Set(following.map(f => f.following.toString()));

      const privateWithFollowInfo = privatePost.map(post => {
          const user = post.userId;
          const isFollowing = followingSet.has(user._id.toString());
          return {
              ...post,
              user: user,
              isFollowing: isFollowing
          };
      });
      //console.log('postwithfollowinfo :', postsWithFollowInfo)
      res.status(200).json(privateWithFollowInfo);
  }catch(error){
      console.log('internal server get post error', error.message);
      res.status(500).json({error: 'internal server post error'})
  }
})



export default router

