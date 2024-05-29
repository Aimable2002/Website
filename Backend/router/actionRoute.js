import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { follow, likesCount, unFollow, updateLike } from '../controller/actionController.js';
import Follow from '../Model/followModel.js';
import User from '../Model/userModel.js';

const router = express.Router();


router.post('/like/:id', protectRoute, likesCount);
router.get('/updateLike/:id', protectRoute, updateLike)
router.post('/follow/:id', protectRoute, follow);
router.delete('/unfollow/:id', protectRoute, unFollow)

router.get('/followers/:id', protectRoute, async(req, res) => {
    try{
        const userId = req.params.id;
        const followers = await Follow.find({following: userId}).populate('follower')
        // const followers = await Follow.countDocuments({following: userId})
        res.status(201).json(followers)
    }catch(error){
        console.log('internal server get Follower error :', error.message)
        res.status(500).json({error: 'internal server get follower error'})
    }
})


router.get('/following/:id', protectRoute, async(req, res) => {
    try{
        const userId = req.params.id;
        console.log('userId :', userId)
        const user = req.user._id
        const following = await Follow.find({follower: userId }).populate('following')
        //const following = await Follow.find({partcipant: {$all: [user, userId]}}).populate('following')
        // const followers = await Follow.countDocuments({following: userId})
        console.log('following :', following)
        res.status(201).json(following)
    }catch(error){
        console.log('internal server get Following error :', error.message)
        res.status(500).json({error: 'internal server get following error'})
    }
})



export default router