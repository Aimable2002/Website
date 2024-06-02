import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Conversation from '../zustand/zustand.jsx';
import Messages from '../home/messages.jsx';
import SmInput from './smInput.jsx';
import useGetMessage from '../../hook/useGetMessage.js';
import { useAuthContext } from '../../context/authContext.jsx';

import { useSocketContext } from '../../context/socketContext.jsx'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const smChat = () => {

    const [isClick, setIsClick] = useState();
    const handleClick = () => {
        setIsClick(!isClick);
    }
    const {selectedUser, setUser} = Conversation();
  const {onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(selectedUser?._id)
  const resetBack = (e) => {
    e.preventDefault();
    localStorage.removeItem("selectedUser")
    setUser(null);
  }
const navigate = useNavigate();
  const handleReset = (selectedUser) => {
    setUser(null);
    localStorage.removeItem('selectedUser');
    navigate('/')
  }
  const { loading, messages } = useGetMessage();
  const {AuthUser} = useAuthContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  const getProfileImageUrl = (selectedUser) => {
    return selectedUser.profile && selectedUser.profile.trim() !== '' ? selectedUser.profile : selectedUser.avatar;
  };
// console.log('authUser :', AuthUser._id)
  return (
    <div className='w-screen h-screen'>
        <div className='hdr w-full top-0  relative flex bg-base-100' style={{zIndex: '1'}}>
            <div className='hdr-ct px-2 py-1 w-full fixed bg-base-100  flex flex-row justify-between'>
                <div className='pfl flex  flex-row gap-2'>
                    <div className='flex  justify-center self-center' onClick={() => handleReset(selectedUser)}><KeyboardArrowLeftIcon /></div>
                    <div className='flex align-middle'>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={getProfileImageUrl(selectedUser)} />
                            </div>
                        </div>
                    </div>
                    <div className='dtl flex align-middle flex-col self-center'>
                        <div style={{fontSize: '14px', alignItems: 'center'}}>{selectedUser.userName}</div>
                        <div style={{fontSize: '12px', alignItems: 'center'}}>{isOnline ? 'online' : 'offline'}</div>
                    </div>
                </div>
                <div className='drop-rgt'>
                    <div onClick={handleClick}>Tool</div>
                    {isClick && (
                    <div className='absolute flex flex-row gap-3' style={{right: '-10px', top: '0', transform: 'translate(-50%)'}}>
                        <div>icon</div>
                        <div>icons</div>
                        <div>iconxx</div>
                    </div>
                    )}
                </div>
            </div>
        </div>
        <div className='relative flex overflow-y-auto w-full' style={{marginTop: '18vh', marginBottom: '14vh'}}>
          <Messages />
          <SmInput />
        </div>
    </div>
  )
}

export default smChat