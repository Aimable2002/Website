import React, { useEffect } from 'react'
import Conversation from '../pages/zustand/zustand'
import { useSocketContext } from '../context/socketContext';

const useListenMessage = () => {
  const {selectedUser, messages, setMessages} = Conversation();
  const {socket} = useSocketContext();
  // const [unreadMessages, setUnreadMessages] = useState({});

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        //newMessage.shouldShake = true;
        // const sound = new Audio(notificationSound);
        // sound.play();
      //   setMessages([...messages, newMessage]);
      // setUnreadMessages(prev => ({
      //   ...prev,
      //   [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1
      // }));
    });
    
    return () => socket?.off("newMessage");
  },[socket, setMessages, messages, selectedUser?._id])
  // return unreadMessages;
}
export default useListenMessage