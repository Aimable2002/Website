import React, { useState, useEffect } from 'react'
import { useAuthContext } from '../context/authContext';
import axios from 'axios';

const unread = ({user}) => {

    const userId = user._id
    //console.log('userId :', userId)
    const { AuthUser } = useAuthContext();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      try {
        const token = localStorage.getItem('online-user')
        const response = await axios.get('/api/message/unreadCount', {
            headers: {
                Authorization: `${JSON.parse(token).token}`
            }
        });
        const counts = response.data.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
        setUnreadCount(counts[userId] || 0);
      } catch (error) {
        console.error('Error fetching unread counts:', error);
      }
    };

    fetchUnreadCounts();
  }, [AuthUser._id, userId]);
  return (
    <div>{unreadCount}unread</div>
  )
}

export default unread