import React, { useState } from 'react'
import './home.css';
import './chatCount.css'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Conversation from '../zustand/zustand';
import Messages from './messages.jsx';
import ChatInput from './ChatInput';
import { useSocketContext } from '../../context/socketContext.jsx'

const chatCont = () => {

    const [isRest, setIsRest] = useState();
    const {selectedUser, setUser} = Conversation();
  const {onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(selectedUser?._id)
  const resetBack = (e) => {
    e.preventDefault();
    localStorage.removeItem("selectedUser")
    setUser(null);
  }

  const getProfileImageUrl = (selectedUser) => {
    return selectedUser.profile && selectedUser.profile.trim() !== '' ? selectedUser.profile : selectedUser.avatar;
  };

  return (
    <div className='flex w-full flex-col overflow-y-auto'>
        <div className='header' style={{zIndex: '1'}}>
          <div className='header-content2 px-2 bg-base-100' style={{width: 'calc(100% - 50%)'}}>
            <div className='w-3/12 flex align-middle py-1 gap-2 flex-row'>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={getProfileImageUrl(selectedUser)} />
                </div>
              </div>
              <div className='flex flex-row w-2/5'>
                <div className='flex align-middle flex-col'>
                  <div>{selectedUser.userName}</div>
                  <div className=''>{isOnline ? 'online' : 'offline'}</div>
                </div>
              </div>
            </div>
            <div className='flex flex-row align-middle justify-between w-2/4'>
              <div></div>
              <div></div>
              <div className='cursor-pointer' onClick={resetBack}><ArrowForwardIcon /></div>
            </div>
          </div>
        </div>
        {/* <div className='' style={{borderBottom: '1px solid #ccc'}}></div> */}
        <div className='mb-20 mt-10'>
          <Messages />
          <ChatInput />
        </div>
    </div>
  )
}

export default chatCont