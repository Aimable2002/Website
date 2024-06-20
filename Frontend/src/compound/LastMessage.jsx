import React, { useState, useEffect } from 'react'
import useGetConversations from '../hook/useGetAllConversation'
import { useAuthContext } from '../context/authContext';
import Unread from './unread';

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
  
 
  return (
    // <>
    //   {conversations.map((message) => (
    //     <div className='w-4/5'>{message.message}</div>
    //   ))}
    // </>
    <>
      {/* <div className='w-4/5' style={{color: '#337AFF'}}>{truncateString(messages.message, 35)}</div> */}
      <div className='w-4/5' style={{color: '#337AFF'}}>{truncateString(conversations.message, 35)}</div>
      {/* <Unread user={userId} /> */}
    </>
  );
}



export default LastMessage