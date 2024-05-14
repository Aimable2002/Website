import axios from 'axios';
import React, { useState } from 'react'

const useLogout = () => {
  const [loading, setLoading] = useState();

  const logout = async () => {
    setLoading(true)
    try{
        const res = await axios.post('https://website-s9ue.onrender.com/api/auth/logout')

    const data = res.data;

    if(data.error){
        throw new Error('data has issue' + data.error.message)
    }

    console.log('logout posted successfully')
    localStorage.removeItem('online-user')
    }catch(error){
        console.log('data logout has issue')
    }finally{
        setLoading(true)
    }
  }
  return {loading, logout}
}

export default useLogout