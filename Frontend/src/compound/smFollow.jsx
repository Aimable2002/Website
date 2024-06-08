import React, { useState, useEffect } from 'react'

import axios from 'axios';

const smFollow = ({userId}) => {

    const [IsFollowing, setIsFollowing] = useState(null);
      const user = userId.user._id
    useEffect(() => {
      const fetchFollow = async () => {
        try {
          const token = localStorage.getItem('online-user');
          const response = await axios.get(`http://localhost:4000/api/action/follow/${user}`, {}, {
            headers: {
              Authorization: `${JSON.parse(token).token}`
            }
          });
          setIsFollowing(response.data.isFollowing);
          console.log('data :', response.data.isFollowing)
        } catch (error) {
          console.error('There was an error fetching the follow!', error);
        }
      };
  
          fetchFollow();
    }, [userId]);
  
    const handleFollow = async () => {
      try {
        const token = localStorage.getItem('online-user');
        const response = await axios.post(`http://localhost:4000/api/action/follow/${user}`, {}, {
          headers: {
            Authorization: `${JSON.parse(token).token}`
          }
        });
        setIsFollowing(response.data.isFollowing);
      } catch (error) {
        console.error('There was an error follow the user!', error);
      }
    };
    //console.log('user :', userId)

  return (
    <div className='crd-rgt flex self-center justify-around '>
        {IsFollowing ? (
            <div className="border-none badge badge-outline cursor-pointer py-1 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" 
            onClick={handleFollow}>Following
        </div>
        ) : (
            <>
                {userId.isFollowing ? (
                    <div className="border-none badge badge-outline cursor-pointer py-1 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" 
                        onClick={handleFollow}>Following
                    </div>
                ) : (
                    <div className="border-none badge badge-outline cursor-pointer py-1" 
                        onClick={handleFollow}>Follow
                    </div>
                )}
            </>
        )}
        <div className='ml-4 badge badge-outline border-none cursor-pointer'>Subscribe</div>
    </div>
  )
}

export default smFollow