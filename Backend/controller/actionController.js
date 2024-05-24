import express from 'express';
import Post from '../Model/postModel.js';
import User from '../Model/userModel.js';
import Follow from '../Model/followModel.js';


export const likesCount = async (req, res) => {
    try{
        const {_id: user } = req.user;
        console.log('user :', user)
        const postId  = req.params.id;
        console.log('postId :', postId)
        
        const post = await Post.findById({_id: postId})
        
        if(!post){
            return res.status(404).json('post not found')
        }
        console.log('post :', post)
        const newPost = post._id.toString()
        console.log('new :', newPost)
        if(newPost !== postId){
            return res.status(400).json('not post match')
        }
        
        const isLiked = post.likes ? post.likes.includes(user) : false;
        console.log('isLiked: ', isLiked)
        if (isLiked) {
        post.likes.pull(user);
        // post.totalLikes -= 1;
        } else {
        post.likes.push(user);
        // post.totalLikes += 1;
        }
        post.totalLikes = post.likes.length
    await post.save();
    res.status(200).json({ isLiked: isLiked ? false : true, likes: post.likes.length });
    // res.status(200).json({ isLiked: isLiked ? false : true, likes: totalLikes });
    }catch(error){
        console.log('internal server likeCount error:', error.message)
        res.status(500).json({error: 'internal server likeCount error'})
    }
}



export const follow = async (req, res) => {
    try{
        const userId = req.user._id;
        console.log('userId: ', userId)
        const userToFollow = req.params.id;
        console.log('userToFollow :', userToFollow)

        if(userToFollow === userId.toString()){
            return res.status(409).json('cant follow yrself')
        }
        const user = await User.findById(userToFollow)
        if(!user){
            return res.status(400).json('user not found')
        }
        const follow = await Follow.findOne({ follower: userId, following: userToFollow })
        if(follow){
            return res.status(400).json('already following')
        }
        const newFollow = new Follow({follower: userId, following: userToFollow })
        //console.log('newFollow :', newFollow)
        await newFollow.save();

        await User.findByIdAndUpdate(userId, {$inc: {totalFollowing: 1}})
        await User.findByIdAndUpdate(userToFollow, {$inc: {totalFollower: 1}})

        res.status(200).json(newFollow)

    }catch(error){
        console.log('internal server Follow error :', error.message)
        res.status(500).json({error: 'internal server Follow error '})
    }
}


export const unFollow = async (req, res) => {
    try{
        const userId = req.user._id;
        const userToUnFollow = req.params.id;

        const follow = await Follow.findByIdAndDelete({follower: userId, following: userToUnFollow})
        if(!follow){
            return res.status(404).json('not able to unfollow')
        }

        await User.findByIdAndUpdate(userToUnFollow, {$inc: {totalFollower: -1}})
        await User.findByIdAndUpdate(userId, {$inc: {totalFollowing: -1}})

        res.status(201).json({message: 'unfollowed user'})
    }catch(error){
        console.log('internal server unFollow error :', error.message)
        res.status(500).json({error: 'internal server unfollow error'})
    }
}


