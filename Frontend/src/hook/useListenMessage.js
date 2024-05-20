import React, { useEffect } from 'react'
import Conversation from '../pages/zustand/zustand'
import { useSocketContext } from '../context/socketContext';

const useListenMessage = () => {
  const {selectedUser, messages, setMessages} = Conversation();
  const {socket} = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
        // newMessage.shouldShake = true;
        // const sound = new Audio(notificationSound);
        // sound.play();
        setMessages([...messages, newMessage]);
    });

    return () => socket?.off("newMessage");
  },[socket, setMessages, messages, selectedUser?._id])
}
export default useListenMessage