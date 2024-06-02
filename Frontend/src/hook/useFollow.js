import axios from 'axios';
import React, { useState } from 'react'
import relationShip from '../pages/zustand/allZustand';

const useFollow = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowCount, setIsFollowCount] = useState([])

  const {likes, follow, setFollow, selectedpost} = relationShip();

  const postFollow = async (userId) => {
    try{
        console.log('selectedpost: ', selectedpost)
        const token = localStorage.getItem('online-user');
        const res = await axios.post(`https://website-s9ue.onrender.com/api/action/follow/${userId._id}`, {}, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        });
        const data = res.data;
        console.log('data :', data)
        if(!data){
            throw new Error('issue with data')
        }

        
        if (data.newFollow) {
        
          setIsFollow(true);
      
          const followData = JSON.parse(localStorage.getItem('follow')) || {};
          const updatedFollowData = {
      
            ...followData,
      
            newFollowed: data.userToFollow,

            newFollowing: data.userId,

            newFollow: data.newFollow,
      
            message: data.message,
          
        // [data.unFollowed]: false,
      
      };
        console.log('newFollow :', data.newFollowing)
          localStorage.setItem('follow', JSON.stringify(updatedFollowData));
      
    } else {
        
            setIsFollow(true);
        
            const followData = JSON.parse(localStorage.getItem('unFollow')) || {};
            const updatedUnFollowData = {
        
              ...followData,
        
              unFollowed: data.unFollowed,

              unFollowing: data.userId,
        
              message: data.message,
            
          // [data.unFollowed]: false,
        
        };
        console.log('unfollow data :', data.unFollowed)
            localStorage.setItem('unFollow', JSON.stringify(updatedUnFollowData));
        
      }

      setFollow(data)
    }catch(error){
        console.log('client follow error :', error.message)
    }
  }
  return {isFollow, isFollowCount, postFollow}
}

export default useFollow