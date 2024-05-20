import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Conversation from '../zustand/zustand.jsx';
import Messages from '../home/messages.jsx';
import ChatInput from '../home/ChatInput.jsx';
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
    navigate('/smHome')
  }
  return (
    <div className='w-screen'>
        <div className='hdr w-full flex h-3/4  relative'>
            <div className='hdr-ct px-2 py-1 w-full fixed  flex flex-row justify-between'>
                <div className='pfl flex  flex-row gap-2'>
                    <div className='flex  justify-center self-center' onClick={() => handleReset(selectedUser)}><KeyboardArrowLeftIcon /></div>
                    <div className='flex align-middle'>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                    <div className='dtl flex align-middle flex-col self-center'>
                        <div style={{fontSize: '14px', alignItems: 'center'}}>username</div>
                        <div style={{fontSize: '12px', alignItems: 'center'}}>online</div>
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
        <div className='relative' style={{marginTop: '9vh'}}>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
            </div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-bubble">It was you who would bring balance to the Force</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS chat bubble component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className="chat-bubble">Not leave it in Darkness</div>
            </div>
        </div>
    </div>
  )
}

export default smChat