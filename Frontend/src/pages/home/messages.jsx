// import React from 'react'
// import Message from './Message'
// import useGetMessage from '../../hook/useGetMessage'

// const messages = () => {
//     const {messages, loading} = useGetMessage();

//   return (
//     <div>
//         {!loading && messages.length > 0 &&
//         messages.map((message) => (
//         <div key={message?._id}>
//             <Message message={message}/>
//         </div>
//     ))}
//     {!loading && messages.length === 0 && (
//         <p>start conversation</p>
//     )}
//     </div>
//   )
// }

// export default messages



import React from 'react'
import Message from './Message'
import useListenMessage from '../../hook/useListenMessage'

const messages = () => {
  useListenMessage()

  return (
    <div>
        <Message/>
    </div>
  )
}

export default messages