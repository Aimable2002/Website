import React, { useState } from 'react'
import './home.css';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Conversation from '../zustand/zustand';
import Message from './Message';
import ChatInput from './ChatInput';

const chatCont = () => {

    const [isRest, setIsRest] = useState();
    const {setUser} = Conversation();

  const resetBack = (e) => {
    e.preventDefault();
    localStorage.removeItem("selectedUser")
    setUser(null);
  }

  return (
    <div className='flex w-full flex-col bg-slate-600'>
        <div className='header'>
          <div className='header-content px-2'>
            <div className='w-3/12 flex align-middle py-1 gap-2 flex-row'>
                <div className="avatar">
                    <div className="w-8 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div className='flex align-middle flex-col'>
                    <div>username</div>
                    <div className=''>online</div>
                </div>
            </div>
            <div className='flex flex-row align-middle justify-between w-2/4'>
              <div></div>
              <div></div>
              <div onClick={resetBack}><ArrowForwardIcon /></div>
            </div>
          </div>
        </div>
        {/* <div className='' style={{borderBottom: '1px solid #ccc'}}></div> */}
        <div>
            <Message />
            <ChatInput />
        </div>
    </div>
  )
}

export default chatCont