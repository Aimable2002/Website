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
            const res = await axios.get(`https://website-s9ue.onrender.com/api/message/${selectedUser._id}`, {
                headers: {
                    Authorization: `${JSON.parse(token).token}`
                }
            });
            const data = res.data;
            console.table('data fetched :', data)
            if(!data){
                throw new Error('data error ')
            }
            setMessages(data)
            console.log('data :', data)
        }catch(error){
            console.log('error in get message', error.message)
        }finally{
            setLoading(false)
        }
      }
      if (selectedUser?._id) {
        getMessages();
      } else {
        setMessages([]); // Clear messages when selectedUser changes
      }
  },[selectedUser?._id, setMessages])
  return { loading, messages }
}

export default useGetMessage
