import React, { useEffect, useState } from 'react';

import axios from 'axios';

const useGetUser = () => {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async() => {
        setLoading(true)
        try{
        const token = localStorage.getItem('online-user')
        //console.log('token :', token)
        const res = await axios.get('https://website-s9ue.onrender.com/api/users/allUser', {
            headers: {
                Authorization: `${JSON.parse(token).token}`,   
            }
        });
        const data = res.data;
        if(data.error){
            throw new Error('data has issue' + error.message)
        }
        setUsers(data)
        }catch(error){
            console.log('error :', error.message)
        }finally{
            setLoading(false)
        }
    }
    getUsers();
  },[])
  return {loading, users}
}

export default useGetUser