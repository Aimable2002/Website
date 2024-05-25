import React, { useEffect, useState } from 'react'
import { useAuthContext } from './authContext';
import { io } from 'socket.io-client';
import { createContext, useContext } from 'react';

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const {AuthUser} = useAuthContext();

    useEffect(() => {
        if(AuthUser){
            const socket = io ('https://website-s9ue.onrender.com', {
                query: {
                    userId: AuthUser._id
                },
            });
            setSocket(socket)
            //console.log('authuser :', AuthUser)
            socket.on('getOnlineUser', (users) => {
                setOnlineUser(users)
            });
            console.log('socket :', socket)
            return () => socket.close()

        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[AuthUser])
    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}