import React, { useEffect, useState } from 'react';

import axios from 'axios';

const useGetPrivatePost = (privateChange) => {
  const [loading, setLoading] = useState(false)
const [privates, setPrivate] = useState([]);

  useEffect(() => {
    const getPrivate = async() => {
        setLoading(true)
        try{
        const token = localStorage.getItem('online-user')
        //console.log('token :', token)
        const res = await axios.get('/api/upload/getPrivate', {
            headers: {
                Authorization: `${JSON.parse(token).token}`,   
            }
        });
        const data = res.data;
        
        if(data.error){
            throw new Error('data has issue' + error.message)
        }
        setPrivate(data)
        console.log('data :', data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
    }
    getPrivate();
  },[privateChange])
  return {loading, privates}
}

export default useGetPrivatePost




