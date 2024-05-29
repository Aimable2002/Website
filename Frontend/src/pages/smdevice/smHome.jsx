import React, { useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';
import ContrastIcon from '@mui/icons-material/Contrast';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ShareIcon from '@mui/icons-material/Share';
import ClearIcon from '@mui/icons-material/Clear';

import useGetUser from '../../hook/useGetUser';
import { useSocketContext } from '../../context/socketContext';
import Conversation from '../zustand/zustand';
import useLogout from '../../hook/useLogout';
import usegetLoggedIn from '../../hook/usegetLoggedIn';
import uploadRequest from '../../hook/uploadRequest';

const truncateString = (str, maxLength) => {
  if(str.length <= maxLength ){
    return str;
  }else{
    const truncatedString = str.slice(0, maxLength);
    return truncatedString + (truncatedString.endsWith('') ? '' : '...');
  }
}

const smHome = ({user}) => {

  const {loading, users} = useGetUser();
  const {onlineUser} = useSocketContext();
  const userWithOnlineStatus = users.map(user => ({
    ...user,
    isOnline: onlineUser.includes(user._id)
  }))

  const {selectedUser, setUser} = Conversation();
const navigate = useNavigate();
  const handleuser = (user) => {
    setUser(user);
    navigate(`/smChat/${user._id}`)
  }

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
  const [isMenu, setIsMenu] = useState();
  const handleMenu = (e) => {
    e.preventDefault();
    setIsMenu(!isMenu)
  }
  const {logout} = useLogout();
  const {logUser} = usegetLoggedIn();
  const [fileChange, setFileChange] = useState();
  const {uploadProfile} = uploadRequest();
  
  const addProfile = useRef();
  
  const handleRefProfile = () => {
      addProfile.current.click();
  }
    const handleProfileChange = async (e) => {
      setFileChange(e.target.files[0])
      await uploadProfile(e.target.files[0])
    }
  
    const getProfileImageUrl = (user) => {
      return user.profile && user.profile.trim() !== '' ? user.profile : user.avatar;
    };
  return (
    <div className=' w-screen h-screen'>
      {/**
       * <div className='flex flex-col w-full overflow-y-auto'>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user, index) => (
          <div key={index} className='flex flex-row w-full  gap-3 py-1 mb-1 cursor-pointer'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              {user.status === 0 ? '' : (
              <div className="avatar ">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <video src={user.status}/>
                </div>
              
              </div>)}
            </div>
            <div className='flex flex-col align-middle justify-center'
            onClick={() => setUser(user)}>
              <div>{user.userName}</div>
              <div>you have message</div>
            </div>
            </div>
          ))}
        </div>
       */}
        <div className='header'>
          <div className='header-content px-2 fixed bg-base-100' style={{zIndex: '1'}}>
            <Link to='/smPost'><div className='w-3/12'>WebbApp</div></Link>
            <div className='flex flex-row align-middle justify-between w-2/4'>
              <div></div>
              <div></div>
              <div className='drop-menu relative inline-block'>
                        <div onClick={handleMenu}>{isMenu ? <ClearIcon /> : <MenuIcon />}</div>
                        {isMenu && (<>
                        {logUser.map((user) => (
                        <div className='drop-ctnt absolute bg-base-100 justify-center align-middle' style={{zIndex: '1'}}>
                            <div className='ctnt flex flex-col w-full'>
                                <div className='prfl mt-3 flex justify-center'>
                                    <div className="avatar" onClick={handleRefProfile}>
                                        <div className="w-24 rounded-full">
                                            <img src={getProfileImageUrl(user)} />
                                        </div>
                                    </div>
                                </div>
                                <input 
                                type="file" 
                                style={{display: 'none'}}
                                ref={addProfile}
                                onChange={handleProfileChange}/>
                                <div className='flex align-middle justify-center'>{user.fullName}</div>
                                <div className='flex align-middle justify-center'>{user.userName}</div>
                                <div className='mt-4 flex flex-col w-full bg-base-100 px-4'>
                                    <div className='div flex flex-row  w-full justify-between py-2'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><AddBusinessIcon /></div>
                                            <div>Business Categories</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                    <div className='div flex flex-row  w-full justify-between'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><VerifiedIcon /></div>
                                            <Link to='/account'><div>Go Account</div></Link>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                </div>

                                <div className='mt-4 flex flex-col w-full bg-base-100 px-4 py-2'>
                                    <div className='div flex flex-row  w-full justify-between py-2'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><ContrastIcon /></div>
                                            <div>Style</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                    <div className='div flex flex-row  w-full justify-between'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><ShareIcon /></div>
                                            <div>Tell Friend</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                    <div className='div flex flex-row  w-full justify-between py-2'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><ShieldIcon /></div>
                                            <div>Privacy</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                    <div className='div flex flex-row  w-full justify-between'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><SettingsIcon /></div>
                                            <div>Setting</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                </div>

                                <div className='mt-4 flex flex-col w-full bg-base-100 px-4'>
                                    <div className='div flex flex-row  w-full justify-between py-2'>
                                        <div onClick={logout} className='div-ct flex flex-row gap-4'>
                                            <div><LogoutIcon /></div>
                                            <div style={{color: '#F83939'}}>Logout</div>
                                        </div>
                                        <div></div>
                                    </div>
                                    <div className='div flex flex-row  w-full justify-between'>
                                        <div className='div-ct flex flex-row gap-4'>
                                            <div><DangerousIcon /></div>
                                            <div style={{color: '#F83939'}}>Delete Account</div>
                                        </div>
                                        <div><KeyboardArrowRightIcon /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                        </>
                        )}
                    </div>
            </div>
          </div>
        </div>
        <div className='w-full flex-row flex gap-2 py-1 mt-7'>
          <div className='px-1'><SearchIcon /></div>
          <div className='w-full'>
            <form onSubmit={handleSearch}>
              <input 
              type="search" 
              placeholder='search...'
              className='border-none w-full'
              value={search}
              onChange={(e) => setSearch(e.target.value)} />
            </form>
          </div>
        </div>
        <div className='stry-row  py-2 px-2' style={{zIndex: '-1'}}>
          {users.map((user, idx) => (
          <div className='flex py-2 px-2 justify-center align-middle flex-col self-center'>
            <div className="avatar flex self-center">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={getProfileImageUrl(user)} />
              </div>
            </div>
              <div className='flex self-center'>{truncateString(user.userName, 7)}</div>
          </div>))}
        </div>
        <div className='flex flex-row w-full justify-between align-middle'>
          <div>Verified</div>
          <div>Explore more</div>
        </div>
        <div className='flex flex-col w-full overflow-y-auto'>
          {userWithOnlineStatus
          .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
          .map((user, index) => (
          <div key={index} className='flex flex-row w-full bg-base-100  gap-3 py-1 mb-1 cursor-pointer'>
            <div className='flex py-2 px-2 justify-center align-middle'>
              <div className={`avatar ${user.isOnline ? 'online' : 'offline'}`}>
                <div className="w-12 rounded-full">
                  <img src={getProfileImageUrl(user)} />
                </div>
              </div>
            </div>
            <div className='flex flex-col align-middle justify-center'
            onClick={() => handleuser(user)}>
              <div>{user.userName}</div>
              <div>you have message</div>
            </div>
          </div>
          ))}
        </div>
        <div className='mb-40 flex justify-center w-full'>share your friend</div>
    </div>
  )
}

export default smHome