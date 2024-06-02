
import React from 'react'
import Message from './Message'
import useListenMessage from '../../hook/useListenMessage'

const messages = () => {
  useListenMessage()

  return (
    <div className='w-full flex' style={{zIndex: '-1'}}>
        <Message/>
    </div>
  )
}

export default messages
