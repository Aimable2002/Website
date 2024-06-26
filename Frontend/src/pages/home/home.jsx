import React, { useState } from 'react';
import './home.css'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import DuoIcon from '@mui/icons-material/Duo';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AppsIcon from '@mui/icons-material/Apps';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import IosShareIcon from '@mui/icons-material/IosShare';
import ContrastIcon from '@mui/icons-material/Contrast';
import VerifiedIcon from '@mui/icons-material/Verified';
import PaidIcon from '@mui/icons-material/Paid';

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ShareIcon from '@mui/icons-material/Share';

import useGetUser from '../../hook/useGetUser';
import { useSocketContext } from '../../context/socketContext.jsx';
import Conversation from '../zustand/zustand.jsx';
import useGetPost from '../../hook/useGetPost.js';

import Poster from './poster.jsx';
import ChatCont from './chatCont.jsx';
import useLogout from '../../hook/useLogout.js';
import usegetLoggedIn from '../../hook/usegetLoggedIn.js';
import uploadRequest from '../../hook/uploadRequest.js';
import { useRef } from 'react';

import useGetConversations from '../../hook/useGetAllConversation.js';
import useListenMessage from '../../hook/useListenMessage.js';
import useGetMessage from '../../hook/useGetMessage.js';
// import storyRequest from '../../hook/storyRequest.js';

import Last from '../../compound/lastMessages.jsx'

const home = ({user}) => {
  const {loading, users} = useGetUser();
  const {onlineUser} = useSocketContext();
  const userWithOnlineStatus = users.map(user => ({
    ...user,
    isOnline: onlineUser.includes(user._id)
  }))
  const {selectedUser, setUser} = Conversation();

  const [search, setSearch] = useState('')
//useListenMessage();
const {messages} = useGetMessage();
// const getLatestMessage = (message) => {
//   if(!message.messages || message.messages === 0) {
//     return {text: 'no message', timestamp: ''}
//   }

//   const latestmessage = message.messages[message.messages.length -1]
//   return latestmessage
// }
  const handleSearch = (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
      if(!search)return;

      const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()))

      if(result){
        setUser(result)
        setSearch('')
      }else{
        return console.log('no user found')
      }
    }
  }
  const [isAcount, setIsAccount] = useState();

  const handleAccountClick = (e) => {
    e.preventDefault();
    setIsAccount(!isAcount)
  }

  const {logout} = useLogout();
  const [profileChange, setProfileChange] = useState()
  const {logUser} = usegetLoggedIn(profileChange);
  const {uploadProfile} = uploadRequest();
  const addProfile = useRef();

  const handleFileRef = () => {
    addProfile.current.click();
  }
  const addStatus = useRef()
const handleFileStatusRef = () => {
  addStatus.current.click();
}

// const {upload} = storyRequest();
// const [statusChange, setStatusChange] = useState()
// const handelStatusChange = async (e) => {
//   setStatusChange(e.target.files[0]);
//   await upload(e.target.files[0]);
//   setStatusChange('')
// }

const[fileChange, setFileChange] = useState();
  // const handleFileChange = async(e) => {
  //   setFileChange(e.target.files[0]);
  //   await uploadProfile(e.target.files[0]);
  //   setFileChange('')
  //   setPostChange(new Date().getTime());
  // }
  
  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    await uploadProfile(file);
    setProfileChange(new Date().getTime());
  }

  const getProfileImageUrl = (selectedUser) => {
    return selectedUser.profile && selectedUser.profile.trim() !== '' ? selectedUser.profile : selectedUser.gender === 'Male' ? 'https://avatar.iran.liara.run/public/boy?username=new' : 'https://avatar.iran.liara.run/public/girl?username=ange';
  };

  const getStatus = (logUser) => {
    return logUser.status && logUser.status.trim() !== '' ? logUser.status : logUser.profile
  }
  const {posts} = useGetPost();

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId)
  }
  const getPostInfo = (userId) => {
    const userPosts = posts.filter(post => post.userId._id === userId);
    const totalLikes = userPosts.reduce((acc, post) => acc + post.totalLikes, 0); 
    return { postCount: userPosts.length, totalLikes };
  };

  

  return (
    <div className='flex flex-row w-screen h-screen overflow-y-auto' style={{fontSize: '12px'}}>
      <div className='flex flex-col w-3/12 overflow-y-auto'>
        <div className='header'>
          <div className='header-content px-2'>
            <div className='w-3/12'>Edit</div>
            <div className='flex flex-row align-middle justify-between w-2/4'>
              <div></div>
              <div></div>
              <div><MenuIcon /></div>
            </div>
          </div>
        </div>
        <div className='w-full flex-row flex gap-2 py-1'>
          <div className='px-1'><SearchIcon /></div>
          <div>
            <form onSubmit={handleSearch}>
              <input 
              type="search" 
              placeholder='search...'
              className='border-none'
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
        </div>
        {/* <div className='stry-row  py-2 px-2'>
          {users.map((user, idx) => (
          <div className='flex py-2 px-2 justify-center align-middle flex-col'>
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.avatar} />
              </div>
            </div>
              <div>{user.userName}</div>
          </div>))}
        </div> */}
        <div className='flex px-2 flex-row w-full'>Verified</div>
        <div className='flex flex-col w-full overflow-y-auto'>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user, index) => {
            return(
          <div key={index} className='flex flex-row w-full bg-base-100  gap-3 py-1 mb-1 cursor-pointer'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
                <div className="w-12 rounded-full">
                  <img src={getProfileImageUrl(user)} />
                </div>
              </div>
            </div>
            <div className='flex flex-col align-middle justify-center w-full'
            onClick={() => setUser(user)}>
              <div className='w-4/5'>{user.userName}</div>
              <Last userId={user}/>
            </div>
          </div>
            )
          })}
          
        <div className='flex justify-center align-middle'>Share your friend the app</div>
        </div>
      </div>
      {/**post area */}

      <div className='flex flex-col w-3/6'>
        {selectedUser ? <ChatCont /> : <Poster />}  
      </div>

      {/**status area */}

      <div className='flex flex-col w-3/12'>
        <div className='header'>
          <div className='header-content px-2'>
            <div className='w-3/12' style={{color: '#00FFF5'}}>{isAcount ? 'ChatApp' : 'Status'}</div>
              <div className='flex flex-row align-middle justify-between w-2/4'>
                <div></div>
                <div className='cursor-pointer'><DuoIcon /></div>
                <div onClick={handleAccountClick} className='cursor-pointer'>
                  {isAcount ? <ArrowForwardIcon /> : <AccountCircleIcon />}
                </div>
              </div>
          </div>
        </div>
        {!isAcount ? (
          <>
          {logUser.map((user, idx) => {
            const { postCount, totalLikes } = getPostInfo(user._id);
            return(
        <div className='flex flex-col w-full overflow-y-auto'>
          <div className='flex flex-col py-4 align-middle justify-center self-center'>
            <div className="avatar" onClick={handleFileRef}>
              <div className="w-24 rounded-full">
                <img src={getProfileImageUrl(user)} />
              </div>
            </div>
            <input type="file" style={{display: 'none'}}
            ref={addProfile}
            onChange={handleFileChange} />
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex align-middle justify-center'>{user.fullName}</div>
            <div className='flex align-middle justify-center'>{user.userName}</div>
          </div>
          <div className='flex flex-row align-middle justify-around mt-8'>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>{ postCount }</div>
              <div className='flex align-middle justify-center'>post</div>
            </div>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>{user.totalFollower}</div>
              <div className='flex align-middle justify-center'>Follower</div>
            </div>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>{user.totalFollowing}</div>
              <div className='flex align-middle justify-center'>Following</div>
            </div>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>{totalLikes}</div>
              <div className='flex align-middle justify-center'>likes</div>
            </div>
          </div>
          <div className='flex flex-col w-full mt-5'>
          <div className='flex flex-row px-5 justify-between py-3 cursor-pointer'>
              <div className='flex w-3/4 gap-4 '>
                <div><PaidIcon /></div>
                <div>Balance</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3 cursor-pointer'>
              <div className='flex w-3/4 gap-4 '>
                <div><AppsIcon /></div>
                <div>Feed</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3 cursor-pointer'>
              <div className='flex w-3/4 gap-4 '>
                <div><VerifiedIcon /></div>
                <div>Verified Account</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3'>
              <div className='flex w-3/4 gap-4'>
                <div><ContrastIcon /></div>
                <div>Style</div>
              </div>
              <div className='cursor-pointer'><input type="checkbox" className="toggle" checked /></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3 cursor-pointer'>
              <div className='flex w-3/4 gap-4'>
                <div><IosShareIcon /></div>
                <div>Tell Frient</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
            <div className='flex flex-row px-5 justify-between  py-3 cursor-pointer'>
              <div className='flex w-3/4 gap-4'>
                <div><LogoutIcon /></div>
                <div style={{color: 'red'}} onClick={logout}>Logout</div>
              </div>
              <div></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3  cursor-pointer'>
              <div className='flex w-3/4 gap-4'>
                <div><DangerousIcon /></div>
                <div style={{color: 'red'}}>Delete Account</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
          </div>
        <div className='py-10'></div>
        </div>
          )
        })}
        </>
        ) : (
        <div className='flex flex-col w-full overflow-y-auto'>
          {logUser.map((user, idx) => (
          <div className='w-full flex  py-2'>
            <div className='w-3/12 flex self-center justify-center'>
              <div className="avatar" onClick={handleFileStatusRef}>
                <div className="w-10 rounded-full">
                  <img src={getProfileImageUrl(user)} />
                </div>
              </div>
            </div>
            <input 
            type="file"
            style={{display: 'none'}}
            ref={addStatus}
            onChange={handelStatusChange} />
            <div className='w-3/4 flex flex-row gap-1'>
              <div className='w-3/5 flex flex-col self-center'>
                <div>{user.userName}</div>
                <div>am available for chat</div>
              </div>
              <div className='w-2/5 flex flex-row self-center justify-end gap-1'>
                <div className='cursor-pointer'><CameraAltIcon /></div>
                <div className='cursor-pointer'><ShareIcon /></div>
              </div>
            </div>
          </div>
          ))}
          {posts.map((post, idx) => {
            return (
          <div key={idx} className='flex flex-row w-full  gap-3 py-1 mb-1 cursor-pointer bg-base-100'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className="avatar ">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={post.user.status}/>
                </div>
              </div>
            </div>
            <div className='flex flex-col align-middle justify-center'
            onClick={() => setUser(user)}>
              <div>{post.user.userName}</div>
              <div>status context</div>
            </div>
            </div>
        ) 
      })}
        </div>
        )}
      </div>
    </div>
  )
}

export default home