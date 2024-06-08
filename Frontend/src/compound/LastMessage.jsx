import React from 'react'
import useGetConversations from '../hook/useGetAllConversation'

const LastMessage = ({userId}) => {
  const user = userId._id
  const { loading, conversations } = useGetConversations(user);
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!conversations) {
    return <div></div>;
  }

  return (
    // <>
    //   {conversations.map((message) => (
    //     <div className='w-4/5'>{message.message}</div>
    //   ))}
    // </>
    <div className='w-4/5' style={{color: '#337AFF'}}>{conversations.message}</div>
  );
}

export default LastMessage