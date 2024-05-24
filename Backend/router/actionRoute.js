import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { follow, likesCount, unFollow } from '../controller/actionController.js';
import Follow from '../Model/followModel.js';
import User from '../Model/userModel.js';

const router = express.Router();


router.post('/like/:id', protectRoute, likesCount);
router.post('/follow/:id', protectRoute, follow);
router.delete('/unfollow/:id', protectRoute, unFollow)

router.get('/followers/:id', protectRoute, async(req, res) => {
    try{
        const userId = req.params.id;
        //const followers = await Follow.find({following: userId}).populate('follower')
        const followers = await Follow.countDocuments({following: userId})
        res.status(201).json(followers)
    }catch(error){
        console.log('internal server get Follower error :', error.message)
        res.status(500).json({error: 'internal server get follower error'})
    }
})



export default router