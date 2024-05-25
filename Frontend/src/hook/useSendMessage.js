import React, { useState } from 'react'
import Conversation from '../pages/zustand/zustand';
import axios from 'axios';

const useSendMessage = () => {
  const [loading, setLoading] = useState();

  const {messages, selectedUser, setMessages} = Conversation();

  const sendMessages = async (message) => {
    setLoading(true)
    try{
        const token = localStorage.getItem('online-user')
        const res = await axios.post(`https://website-s9ue.onrender.com/api/message/send/${selectedUser._id}`, {message}, {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        });
        const data = res.data;

        if(data.error){
            throw new Error('error of data :' + error.message)
        }

        setMessages([...messages, data]);

    }catch(error){
        console.log('error in sendMessage :', error.message)
    }finally{
        setLoading(false)
    }
  }
  return {loading, sendMessages}
}

export default useSendMessage