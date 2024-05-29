
import React from 'react'
import Message from './Message'
import useListenMessage from '../../hook/useListenMessage'

const messages = () => {
  useListenMessage()

  return (
    <div className='w-full flex'>
        <Message/>
    </div>
  )
}

export default messages
