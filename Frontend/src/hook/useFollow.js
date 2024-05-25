import axios from 'axios';
import React, { useState } from 'react'

const useFollow = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowCount, setIsFollowCount] = useState([])

  const postFollow = async (userId) => {
    try{
        console.log('userId: ', userId)
        const token = localStorage.getItem('online-user');
        const res = await axios.post(`https://website-s9ue.onrender.com/api/action/follow/${userId._id}`, {}, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        });
        const data = res.data;
        if(!data){
            throw new Error('issue with data')
        }
        setIsFollow(data)
    }catch(error){
        console.log('client follow error :', error.message)
    }
  }
  return {isFollow, isFollowCount, postFollow}
}

export default useFollow