import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Conversation from '../pages/zustand/zustand'
import useGetMessage from './useGetMessage';
import useSendMessage from './useSendMessage';

const useGetConversations = (user) => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState(null);
  const { messages, selectedUser, setMessages} = Conversation();
  //const {messages } = useGetMessage()

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('online-user');
        const res = await axios.get(`/api/message/getAllConv/${user}`, {
          headers: {
            Authorization: `${JSON.parse(token).token}`
          }
        });
        const data = res.data;
        //console.log('data conv :', data)
        setConversations(data)
      } catch (error) {
        console.log('Error fetching conversations', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
