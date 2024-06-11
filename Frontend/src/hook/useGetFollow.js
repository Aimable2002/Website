import axios from 'axios'
import React, { useEffect, useState } from 'react'


const useGetFollow = (userId) => {
  const [follower, setFollower] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getFollowers = async () => {
        setLoading(true)
        try{
            const token = localStorage.getItem('online-user');
            const res = await axios.get(`/api/action/followers/${userId._id}`, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            })

            const data = res.data;

            if(!data){
                throw new Error('no data fetched')
            }

            setFollower(data)

        }catch(error){
            console.log('fail to fetch follwer to client')
        }finally{
            setLoading(false)
        }
    }
    if(userId?._id){
        getFollowers()
    }else{
        setFollower([])
    }
  },[userId?._id])
  return {loading, follower}
}

export default useGetFollow


