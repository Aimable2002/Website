import React, { useState } from 'react'
import './chatInput.css'

import SendIcon from '@mui/icons-material/Send';

import AddIcon from '@mui/icons-material/Add';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DuoIcon from '@mui/icons-material/Duo';

import useSendMessage from '../../hook/useSendMessage';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const {loading, sendMessages} = useSendMessage()

  const[isClick, setIsclick] = useState()

  const handleInput = (e) => {
    setIsclick(!isClick)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message.trim())return;

    await sendMessages(message)
    setMessage('')
  }

  return (
    <>
    <div className='ftr align-middle'>
        <div className='flex align-middle'><AddIcon /></div>
        <div className=' px-2 frm-div bg-slate-400'>
        <form className='flex flex-row align-middle w-full' onSubmit={handleSubmit}> 
            <div className=' w-full flex align-middle'>
                <textarea 
                name="" 
                id="" 
                cols='100' 
                rows="2" 
                placeholder='Type...'
                className='border-none outline-none bg-transparent'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onClick={handleInput}
                ></textarea>
            </div>{isClick && (
            <button className='flex align-middle ml-7'><SendIcon /></button>)}
        </form> 
        </div>{!isClick && (<>
            <div className='flex align-middle'><DuoIcon /></div>
            <div className='flex align-middle'><KeyboardVoiceIcon /></div> </>)}
    </div>
    </>
  )
}

export default ChatInput