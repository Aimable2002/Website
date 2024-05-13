import React from 'react'
import './chatInput.css'

import SendIcon from '@mui/icons-material/Send';

import AddIcon from '@mui/icons-material/Add';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DuoIcon from '@mui/icons-material/Duo';

const ChatInput = () => {

  return (
    <>
    <div className='ftr align-middle'>
        <div className='flex align-middle'><AddIcon /></div>
        <div className=' px-2 frm-div bg-slate-400'>
        <form className='flex flex-row align-middle w-full'> 
            <div className=' w-full flex align-middle'>
                <textarea 
                name="" 
                id="" 
                cols='100' 
                rows="2" 
                placeholder='Type...'
                className='border-none outline-none bg-transparent'
                ></textarea>
            </div>
            {/* <button className='flex align-middle'><SendIcon /></button> */}
        </form> 
        </div>
            <div className='flex align-middle'><DuoIcon /></div>
            <div className='flex align-middle'><KeyboardVoiceIcon /></div>
    </div>
    </>
  )
}

export default ChatInput