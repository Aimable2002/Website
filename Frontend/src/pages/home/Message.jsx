import React from 'react';
import useGetMessage from '../../hook/useGetMessage.js';
import { useAuthContext } from '../../context/authContext.jsx';
import Conversation from '../zustand/zustand.jsx';

const Message = () => {
  const { loading, messages } = useGetMessage();
  const {AuthUser} = useAuthContext();


  if (loading) {
    return <div>Loading...</div>;
  }
console.log('authUser :', AuthUser._id)
  return (
    <div className='relative flex flex-col overflow-y-auto w-full'>
        {messages.length === 0 ? (
            <div>start conversation</div>
        ) : (
      messages.map((message) => (
        <div key={message._id} className={`chat ${message.senderId === AuthUser._id ? 'chat-end' : 'chat-start'}`}>
          {/* <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="User avatar" src={message.senderId === AuthUser ? AuthUser.profile :  selectedUser.profile} />
            </div>
          </div> */}
          <div className="chat-bubble">{message.message}</div>
        </div>
      ))
    )}
    </div>
  );
};

export default Message;
