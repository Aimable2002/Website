import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useGetLikes = () => {
  const [likes, setIsLike] = useState([])

  useEffect(() => {
    const getLikes = async () => { 
        try{
            const token = localStorage.getItem('online-user');
            const res = await axios.get('https://website-s9ue.onrender.com/api/action/updateLike', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            });

            const data = res.data;

            if(!data){
                throw new Error ('data has issue')
            }
            console.log('likes data :', data)
            setIsLike(data)
        }catch(error){
            console.log('internal server get like error :', error.message)
        }
    }
    getLikes()
  },[])
  return {likes}
}

export default useGetLikes