import React from 'react'
import useGetConversations from '../hook/useGetAllConversation'
import { useAuthContext } from '../context/authContext';

const truncateString = (str, maxLength) => {
  if(str.length <= maxLength ){
    return str;
  }else{
    const truncatedString = str.slice(0, maxLength);
    return truncatedString + (truncatedString.endsWith('') ? '..' : '...');
  }
}

const LastMessage = ({userId}) => {
  const user = userId._id
  const { loading, conversations } = useGetConversations(user);
  
  

  if (loading) {
    return <div className='loading loading-dots'></div>;
  }

  if (!conversations) {
    return <div></div>;
  }
  const [unreadCounts, setUnreadCounts] = useState({});
  const { AuthUser } = useAuthContext();

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      try {
        const response = await axios.get(`/api/message/unreadCount/${AuthUser._id}`);
        const counts = response.data.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {});
        setUnreadCounts(counts);
      } catch (error) {
        console.error('Error fetching unread counts:', error);
      }
    };

    fetchUnreadCounts();
  }, [AuthUser._id]);
  return (
    // <>
    //   {conversations.map((message) => (
    //     <div className='w-4/5'>{message.message}</div>
    //   ))}
    // </>
    <>
      <div className='w-4/5' style={{color: '#337AFF'}}>{truncateString(conversations.message, 35)}</div>
      <div>{unreadCounts[user._id] || 0} unread messages</div>
    </>
  );
}

export default LastMessage