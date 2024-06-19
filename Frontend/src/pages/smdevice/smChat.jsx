// import React, { useState } from 'react'

// import { useNavigate } from 'react-router-dom';

// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// import Conversation from '../zustand/zustand.jsx';
// import Messages from '../home/messages.jsx';
// import SmInput from './smInput.jsx';
// import useGetMessage from '../../hook/useGetMessage.js';
// import { useAuthContext } from '../../context/authContext.jsx';

// import { useSocketContext } from '../../context/socketContext.jsx'
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// const smChat = () => {

//     const [isClick, setIsClick] = useState();
//     const handleClick = () => {
//         setIsClick(!isClick);
//     }
//     const {selectedUser, setUser} = Conversation();
//   const {onlineUser} = useSocketContext();
//   const isOnline = onlineUser.includes(selectedUser?._id)
//   const resetBack = (e) => {
//     e.preventDefault();
//     localStorage.removeItem("selectedUser")
//     setUser(null);
//   }
// const navigate = useNavigate();
//   const handleReset = (selectedUser) => {
//     setUser(null);
//     localStorage.removeItem('selectedUser');
//     navigate('/')
//   }
//   const { loading, messages } = useGetMessage();
//   const {AuthUser} = useAuthContext();

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   const getProfileImageUrl = (selectedUser) => {
//     return selectedUser.profile && selectedUser.profile.trim() !== '' ? selectedUser.profile : selectedUser.avatar;
//   };
// console.log('authUser :', AuthUser._id)
//   return (
//     <div className='w-screen h-screen'>
//         <div className='hdr w-full relative flex bg-base-100' style={{zIndex: '1'}}>
//             <div className='hdr-ct px-2 py-1 w-full fixed bg-base-100  flex flex-row justify-between'>
//                 <div className='pfl flex  flex-row gap-2'>
//                     <div className='flex  justify-center self-center' onClick={() => handleReset(selectedUser)}><KeyboardArrowLeftIcon /></div>
//                     <div className='flex align-middle'>
//                         <div className="avatar">
//                             <div className="w-12 rounded-full">
//                                 <img src={getProfileImageUrl(selectedUser)} />
//                             </div>
//                         </div>
//                     </div>
//                     <div className='dtl flex align-middle flex-col self-center'>
//                         <div style={{fontSize: '14px', alignItems: 'center'}}>{selectedUser.userName}</div>
//                         <div style={{fontSize: '12px', alignItems: 'center'}}>{isOnline ? 'online' : 'offline'}</div>
//                     </div>
//                 </div>
//                 <div className='drop-rgt'>
//                     <div onClick={handleClick}>Tool</div>
//                     {isClick && (
//                     <div className='absolute flex flex-row gap-3' style={{right: '-10px', top: '0', transform: 'translate(-50%)'}}>
//                         <div>icon</div>
//                         <div>icons</div>
//                         <div>iconxx</div>
//                     </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//         <div className='relative flex overflow-y-auto w-full' style={{marginTop: '9vh', marginBottom: '14vh'}}>
//           <Messages />
//           <SmInput />
//         </div>
//     </div>
//   )
// }

// export default smChat





import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import Conversation from '../zustand/zustand.jsx';
import Messages from '../home/messages.jsx';
import SmInput from './smInput.jsx';
import useGetMessage from '../../hook/useGetMessage.js';
import { useAuthContext } from '../../context/authContext.jsx';

import { useSocketContext } from '../../context/socketContext.jsx'


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
   return selectedUser.profile || selectedUser.user.profile && selectedUser.user.profile.trim() || selectedUser.profile.trim()  !== '' ? selectedUser.profile || selectedUser.user.profile : selectedUser.gender || selectedUser.user.gender === "Male" ? 'https://avatar.iran.liara.run/public/boy?username=new' : 'https://avatar.iran.liara.run/public/girl?username=ange';
 };
  return (
    <div className='w-full flex flex-col overflow-auto'>
      <div className='flex relative w-full mb-14 bg-base-100'>
            <div className='fixed  w-full flex flex-row bg-base-100 py-2 px-2 justify-between'>
                <div className='flex flex-row gap-3' style={{width: 'calc(100% - 91%', color: '#00FFF5'}}>
                    <div className='flex  justify-center self-center' onClick={() => handleReset(selectedUser)}><KeyboardArrowLeftIcon /></div>
                    <div className='flex align-middle'>
                        <div className="avatar">
                            <div className="w-8 rounded-full">
                                <img src={getProfileImageUrl(selectedUser)} />
                            </div>
                        </div>
                    </div>
                    <div className='dtl flex align-middle flex-row self-center gap-1 w-full'>
                        <div style={{fontSize: '14px', alignItems: 'center'}}>{selectedUser.userName || selectedUser.user.userName}</div>
                        <div style={{fontSize: '14px', alignItems: 'center'}}>Is</div>
                        <div style={{fontSize: '14px', alignItems: 'center'}}>{isOnline ? 'online' : 'offline'}</div>
                    </div>
                </div>
                
                {/* <div className='flex flex-row  justify-around' style={{width: 'calc(100% - 60%)'}}>
                    <div className='cursor-pointer'><HomeIcon /></div>
                    <div className='cursor-pointer'><AddCircleOutlineIcon /></div>
                    <div className='cursor-pointer'><MonetizationOnIcon /></div>
                </div> */}
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
        <Messages />
        <SmInput />
    </div>
  )
}

export default smChat