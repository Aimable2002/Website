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

import useGetUser from '../../hook/useGetUser';
import { useSocketContext } from '../../context/socketContext.jsx';
import Conversation from '../zustand/zustand.jsx';

import Poster from './poster.jsx';
import ChatCont from './chatCont.jsx';
import useLogout from '../../hook/useLogout.js';
import usegetLoggedIn from '../../hook/usegetLoggedIn.js';

const home = ({conversation}) => {

  const {loading, users} = useGetUser();
  const {onlineUser} = useSocketContext();
  const userWithOnlineStatus = users.map(user => ({
    ...user,
    isOnline: onlineUser.includes(user._id)
  }))
  const {selectedUser, setUser} = Conversation();

  const [search, setSearch] = useState('')

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

  const {logUser} = usegetLoggedIn();

  return (
    <div className='flex flex-row w-screen h-screen' style={{fontSize: '12px'}}>
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
        <div className='flex flex-row w-full'>Verified</div>
        <div className='flex flex-col w-full overflow-y-auto'>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
          <div className='flex flex-row w-full bg-base-100  gap-3 py-1 mb-1 cursor-pointer'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
                <div className="w-12 rounded-full">
                  <img src={user.avatar} />
                </div>
              </div>
            </div>
            <div className='flex flex-col align-middle justify-center'
            onClick={() => setUser(user)}>
              <div>{user.userName}</div>
              <div>you have message</div>
            </div>
          </div>
          ))}
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
        {isAcount ? (
          <>
          {logUser.map((log, idx) => (
        <div className='flex flex-col w-full overflow-y-auto'>
          <div className='flex flex-col py-4 align-middle justify-center self-center'>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={log.avatar} />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex align-middle justify-center'>{log.fullName}</div>
            <div className='flex align-middle justify-center'>{log.userName}</div>
          </div>
          <div className='flex flex-row align-middle justify-around mt-8'>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>46</div>
              <div className='flex align-middle justify-center'>post</div>
            </div>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>46M</div>
              <div className='flex align-middle justify-center'>Follower</div>
            </div>
            <div className='flex flex-col w-full align-middle justify-center'>
              <div className='flex align-middle justify-center'>46K</div>
              <div className='flex align-middle justify-center'>Following</div>
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
                <div style={{color: 'red', fontSize: '18px'}} onClick={logout}>Logout</div>
              </div>
              <div></div>
            </div>
            <div className='flex flex-row px-5 justify-between py-3  cursor-pointer'>
              <div className='flex w-3/4 gap-4'>
                <div><DangerousIcon /></div>
                <div style={{color: 'red', fontSize: '18px'}}>Delete Account</div>
              </div>
              <div><KeyboardArrowRightIcon /></div>
            </div>
          </div>
        <div className='py-10'></div>
        </div>
        ))}
        </>
        ) : (
        <div className='flex flex-col w-full overflow-y-auto'>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
          <div className='flex flex-row w-full  gap-3 py-1 mb-1 cursor-pointer'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className="avatar ">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.avatar} />
                </div>
              </div>
            </div>
            <div className='flex flex-col align-middle justify-center'>
              <div>{user.userName}</div>
              <div>you have message</div>
            </div>
          </div>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}

export default home