import React, { useState } from 'react'

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import useSendMessage from '../../hook/useSendMessage';

const smInput = () => {
    const [message, setMessage] = useState('')
    const {loading, sendMessages} = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!message.trim())return;

        await sendMessages(message)
        setMessage('')
    }

  return (
    <div className='flex w-screen fixed bottom-0 bg-base-300'>
        <div className='flex flex-row justify-around align-middle gap-2 w-full'>
            <div className='flex self-center'><AttachFileIcon /></div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea 
                    type="text"
                    rows='2'
                    placeholder='Type Message....' 
                    className='bg-base-100 px-2 w-full flex align-middle border-none outline-none' 
                    style={{borderRadius: '8px'}}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                
            </form>
            <button onClick={handleSubmit} className='flex self-center'><SendIcon /></button>
        </div>
    </div>
  )
}

export default smInput