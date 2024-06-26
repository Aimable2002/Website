import React, { useEffect, useState } from 'react';

import axios from 'axios';

const useGetPost = (postChange) => {
  const [loading, setLoading] = useState(false)
const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async() => {
        setLoading(true)
        try{
        const token = localStorage.getItem('online-user')
        //console.log('token :', token)
        const res = await axios.get('/api/upload/getPost', {
            headers: {
                Authorization: `${JSON.parse(token).token}`,   
            }
        });
        const data = res.data;
        
        if(data.error){
            throw new Error('data has issue' + error.message)
        }
        setPosts(data)
        //console.log('data :', data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
    }
    getPost();
  },[postChange])
  return {loading, posts}
}

export default useGetPost




