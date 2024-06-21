import React, { useState, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom';



import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import HomeIcon from '@mui/icons-material/Home';

import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';
import ContrastIcon from '@mui/icons-material/Contrast';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import FavoriteIcon from '@mui/icons-material/Favorite';

import useGetUser from '../../hook/useGetUser';
import Conversation from '../zustand/zustand';
import privateRequest from '../../hook/privateRequest';
import { Button } from '@nextui-org/react';
import useLogout from '../../hook/useLogout';
import usegetLoggedIn from '../../hook/usegetLoggedIn';
import uploadRequest from '../../hook/uploadRequest';
import useGetPost from '../../hook/useGetPost';

import SmFollow from '../../compound/smFollow';
import Like from '../../compound/like';
import SmPoster from '../../compound/smPost';

import useSendMessage from '../../hook/useSendMessage';

import MessageSkeleton from '../../skeleton/skeleton';
import { useSocketContext } from '../../context/socketContext';
import useGetPrivatePost from '../../hook/useGetPrivatePost';

const AlbmPrive = ({user, post}) => {
    const {loading, users} = useGetUser();
  
    const {selectedUser, setUser} = Conversation();

    const [search, setSearch] = useState('')
    
    const addProfile = useRef();

    const handleFileRef = () => {
      addProfile.current.click();
    }
    const handleProfileChange = async (e) => {
      setFileChange(e.target.files[0])
      await uploadProfile(e.target.files[0])
    }
  const addPost = useRef();

  const handleRefPost = () => {
    addPost.current.click();
  }
  const {upload} = privateRequest();

const [privateChange, setPrivateChange] = useState();
const handlePost = async (e) => {
    const file = e.target.files[0];
    await upload(file);
  setPrivateChange(new Date().getTime());
}

const navigate = useNavigate(); // For navigation


const [isMenu, setIsMenu] = useState();
  const handleMenu = (e) => {
    e.preventDefault();
    setIsMenu(!isMenu)
  }
  const {logout} = useLogout();
  const {logUser} = usegetLoggedIn();


  const {privates} = useGetPrivatePost(privateChange);

  const useron = localStorage.getItem('selectedUser');
  const getUser = useron ? JSON.parse(useron).user._id : null;
  //console.log('getUser :', getUser);

  // Filter posts to include only those where the userId matches
  const filteredPosts = privates.filter(post => post.user._id === getUser) || null;

  const handlePath = (selectedUser) => {
    localStorage.removeItem('selectedUser')
    setUser(selectedUser.user)
    navigate(`/smChat/${selectedUser.user._id}`)
    //console.log('user to chat :', selectedUser.user._id)
  }
  const {onlineUser} = useSocketContext();
  const isOnline = onlineUser.includes(selectedUser?._id)
  const handlepostBack = () => {
    setUser(null)
    localStorage.removeItem('selectedUser')
    navigate('/smPost')
  }
  return (
    <div className=' w-screen overflow-auto'>
        <div className='header flex w-full relative bg-base-100' style={{zIndex: '1'}}>
            <div className='header-content px-2 flex w-full fixed bg-base-100'>
                <div>{selectedUser.user.userName}</div>
                <div className='flex flex-row align-middle justify-between w-2/4'>
                    <div onClick={handleRefPost}><AddCircleOutlineIcon /></div>
                        <input type="file"
                        style={{display: 'none'}}
                        ref={addPost}
                        onChange={handlePost}/>
                    
                    <div onClick={handlepostBack}><HomeIcon /></div>
                    <div className='drop-menu relative inline-block'>
                        <div onClick={handleMenu}>{isMenu ? <ClearIcon /> : <MenuIcon />}</div>
                        {isMenu && (<>
                            {logUser.map((user) => (
                        <div className='drop-ctnt absolute bg-base-100 justify-center align-middle'>
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
                        </div>))}</>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full relative flex overflow-y-auto flex-col mt-5'>
            {!loading && filteredPosts.length > 0 && filteredPosts.map((post, idx) => (
                    <div className='crd-area w-full flex  gap-1 flex-col px-1  bg-base-100'>
                        <div className=' crd w-full relative flex align-middle py-2'>
                            <div className='px-2 crd-hd w-full flex flex-row justify-between align-middle'>
                                <div className='crd-prof flex flex-row gap-4'>
                                    <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                                        <div className="w-11 rounded-full">
                                            <img src={selectedUser.user.profile && selectedUser.user.profile.trim() !== '' ? selectedUser.user.profile : selectedUser.user.gender === 'Male' ? 
                                                'https://avatar.iran.liara.run/public/boy?username=new' : 'https://avatar.iran.liara.run/public/girl?username=ange'
                                            } />
                                        </div>
                                    </div>
                                    <div className='dtl flex align-middle self-center'>
                                        <div className='username flex align-middle'>{post.user.userName}</div>
                                    </div>
                                </div>
                                <SmFollow userId={post}/>
                            </div>
                        </div>
                        
                        <div className='w-full flex justify-center align-middle'>
                            <SmPoster id={post} />
                        </div>
                    
                        <div className='flex flex-col align-middle py-2'>
                            <div className='ftr-hd flex flex-row  w-full justify-between'>
                                <div className='ft-lft flex flex-row  w-3/5 gap-4'>
                                    <div className='flex flex-row gap-2 align-middle'>
                                    </div>
                                    <Like postId={post}/>
                                    <div className='flex flex-row gap-2 align-middle'>
                                        <button></button>
                                        {/* <div><ChatBubbleOutlineIcon /></div> */}
                                    </div>
                                </div>
                                <div className='ft-rgt flex self-end  w-2/6 justify-around align-middle'>
                                    <div></div>
                                    <button onClick={() => handlePath(selectedUser)}>DM</button>
                                </div>
                            </div>
                            <div className='ft-ftr flex flex-row w-full  align-middle'>
                                {/* <div>comment content displayed here</div> */}
                            </div>
                        </div>
                    </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && selectedUser.length === 0 && (
				<p className='text-center'></p>
			)}
        </div>
        <div className='mb-40'></div>
    </div>
  )
}

export default AlbmPrive

