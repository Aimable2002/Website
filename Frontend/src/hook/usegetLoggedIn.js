import axios from 'axios';
import React, { useEffect, useState } from 'react'

const usegetLoggedIn = (profileChange) => {
  const [logUser, setLogUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLogged = async() => {
        setLoading(true)
        try{
            const token = localStorage.getItem('online-user')
            const res = await axios.get('/api/users/logUser', {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            });
    
            const data = res.data;
    
            if(data.error){
                throw new Error('error data :' + error.message)
            }
    
            setLogUser(data);
        }catch(error){
            console.error('error in logout :',error.message)
        }finally{
            setLoading(false)
        }
      }
      getLogged();
  },[profileChange])
  return {loading, logUser}
}

export default usegetLoggedIn