
import axios from 'axios';
import React, { useState } from 'react'


const useToggleLike = () => {
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState([]);
    const [postLikes, setPostLiked] = useState()

    //const {likes, selectedPoset, setLikes} = 

  const toggleLike = async (postId) => {
    try{
        console.log('postId :', postId._id)
        const token = localStorage.getItem('online-user');
        //console.log('token :', JSON.parse(token).token)

        const res = await axios.post(`/api/action/like/${postId._id}`, {}, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })

        const data = res.data;
        console.log('data :', data)
        if(!data){
            throw new Error('error of data')
        }
        const likeData = JSON.parse(localStorage.getItem('like')) || {};
        const updatedLikeData = {
            ...likeData,
            likes: data.likes,
            postLiked: data.postLiked
        };

        setIsLike(data)
        setLikesCount(data.likes)
        setPostLiked(data.postLiked)
        // likeData[postId] = { likes: likesCount, postLiked: postLiked };
        localStorage.setItem('like', JSON.stringify(updatedLikeData))
        // console.log('number of likes :', data.likes)
    }catch(error){
        console.log('error :', error.message)
    }
  }
  return {isLike, likesCount, postLikes, toggleLike}
}

export default useToggleLike
