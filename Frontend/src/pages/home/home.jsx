import React, { useState } from 'react';
import './home.css'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import useGetUser from '../../hook/useGetUser';
import { useSocketContext } from '../../context/socketContext.jsx';
import Conversation from '../zustand/zustand.jsx';

const home = () => {

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
  return (
    <div className='flex flex-row w-screen h-screen'>
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
        <div className='stry-row  py-2 px-2'>
          {users.map((user, idx) => (
          <div className='flex py-2 px-2 justify-center align-middle flex-col'>
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.avatar} />
              </div>
            </div>
              <div>{user.userName}</div>
          </div>))}
        </div>
        <div className='flex flex-row w-full'>Verified</div>
        <div className='flex flex-col w-full '>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user) => (
          <div className='flex flex-row w-full  gap-3 py-1 mb-2'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
                <div className="w-12 rounded-full">
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
      </div>
      <div className='flex flex-col w-3/6'> second column</div>
      <div className='flex flex-col w-3/12'> third column</div>
    </div>
  )
}

export default home