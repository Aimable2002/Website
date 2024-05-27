import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Conversation from '../pages/zustand/zustand'

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const { selectedUser} = Conversation();

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('online-user');
        const res = await axios.get('http://localhost:4000/api/message/getAllConv', {
          headers: {
            Authorization: `${JSON.parse(token).token}`
          }
        });
        const data = res.data;
        console.log('data conv :', data)
        setConversations(data);
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
