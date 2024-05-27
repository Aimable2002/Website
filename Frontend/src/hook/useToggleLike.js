
import axios from 'axios';
import React, { useState } from 'react'

const useToggleLike = () => {
    const [isLike, setIsLike] = useState(false);
    const [likesCount, setLikesCount] = useState([]);

  const toggleLike = async (postId) => {
    try{
        console.log('postId :', postId._id)
        const token = localStorage.getItem('online-user');
        //console.log('token :', JSON.parse(token).token)

        const res = await axios.post(`http://localhost:4000/api/action/like/${postId._id}`, {}, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        })

        const data = res.data;

        if(!data){
            throw new Error('error of data')
        }
        setIsLike(data.isLiked)
        setLikesCount(data.likes)
        console.log('number of likes :', data.likes)
    }catch(error){
        console.log('error :', error.message)
    }
  }
  return {isLike, likesCount, toggleLike}
}

export default useToggleLike