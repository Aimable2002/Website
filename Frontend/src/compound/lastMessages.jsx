import React from 'react'

import Last from '../compound/LastMessage.jsx'
import useListenMessage from '../hook/useListenMessage';

const lastMessages = ({userId}) => {
    useListenMessage();
  return (
    <>
        <Last userId={userId}/>
    </>
  )
}

export default lastMessages