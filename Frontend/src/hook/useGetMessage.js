import React, { useEffect, useState } from 'react'
import Conversation from '../pages/zustand/zustand'
import axios from 'axios';

const useGetMessage = () => {
  const [loading, setLoading] = useState(false)

  const {messages, selectedUser, setMessages} = Conversation();

  useEffect(() => {
    const getMessages = async() => {
        setLoading(true);
        try{
            const token = localStorage.getItem('online-user');
            console.table('selectedUser :', selectedUser._id)
            const res = await axios.get(`http://localhost:4000/api/message/${selectedUser._id}`, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            });
            const data = res.data;
            if(data){
                throw new Error('data error :', + error.message)
            }
            setMessages(data)
        }catch(error){
            console.log('error in get message', error.message)
        }finally{
            setLoading(false)
        }
      }
        if(selectedUser?._id) getMessages();
  },[selectedUser?._id, setMessages])
  return { loading, messages }
}

export default useGetMessage
