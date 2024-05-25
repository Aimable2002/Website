import axios from 'axios'
import React, { useState } from 'react'

const useLogin = () => {
  const [loading, setLoading] = useState(false)

  const login = async ({userName, password}) => {
    setLoading(true)
    try{
        const res = await axios.post('https://website-s9ue.onrender.com/api/auth/login', {
            userName,
            password
        });

        const data = res.data;

        if(data.error){
            throw new Error('data has issue' + data.error.message)
        }
        console.log('login posted successfully')
        localStorage.setItem('online-user', JSON.stringify(data))
        window.location = '/'
    }catch(error){
        console.log('error in login hook', error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading, login}
}

export default useLogin