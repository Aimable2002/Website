import React, { useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import {Button} from "@nextui-org/react";

import '../smdevice/smPost.jsx'

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import DangerousIcon from '@mui/icons-material/Dangerous';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ShieldIcon from '@mui/icons-material/Shield';
import ContrastIcon from '@mui/icons-material/Contrast';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

import usegetLoggedIn from '../../hook/usegetLoggedIn';
import uploadRequest from '../../hook/uploadRequest';
import useGetPost from '../../hook/useGetPost';
import Conversation from '../zustand/zustand';
import postRequest from '../../hook/postRequest';
import useLogout from '../../hook/useLogout.js';

import SmPoster from '../../compound/smPost.jsx';
import SmVideo from '../../compound/smVideo.jsx';
import SmPrivate from '../../compound/smPrivate.jsx';

import LockIcon from '@mui/icons-material/Lock';
import privateRequest from '../../hook/privateRequest.js';
import useGetPrivatePost from '../../hook/useGetPrivatePost.js';

const account = () => {
  const [profileChange, setProfileChange] = useState()
  const [privateChange, setPrivateChange] = useState();
  const [postChange, setPostChange] = useState();
  const {logUser} = usegetLoggedIn(profileChange);
  const {uploadProfile} = uploadRequest();

  const {logout} = useLogout();

  const addProfile = useRef();

  const handleFileRef = () => {
    addProfile.current.click();
  }
  const handleProfileChange = async (e) => {
    setFileChange(e.target.files[0])
    await uploadProfile(e.target.files[0])
  }

  const getProfileImageUrl = (selectedUser) => {
    return selectedUser.profile && selectedUser.profile.trim() !== '' ? selectedUser.profile : selectedUser.gender === 'Male' ? 'https://avatar.iran.liara.run/public/boy?username=new' : 'https://avatar.iran.liara.run/public/girl?username=ange';
  };

  const[fileChange, setFileChange] = useState();
  
  const handleFileChange = async(e) => {
    const file = e.target.files[0];
    await uploadProfile(file);
    // setFileChange('')
    setProfileChange(new Date().getTime());
  }
  const { posts } = useGetPost(postChange);
  const { privates, loading } = useGetPrivatePost(privateChange);
  const useron = localStorage.getItem('online-user');
  const getUser = useron ? JSON.parse(useron)._id : null;
  //console.log('getUser :', getUser);

  // Filter posts to include only those where the userId matches
  const filteredPosts = posts.filter(post => post.userId._id === getUser);
  const filteredprivates = privates.filter(post => post.userId._id === getUser);

  const filterUserLoggedIn = posts.filter(post => post.user._id === getUser)

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

  const [isMenu, setIsMenu] = useState();
  const handleMenu = (e) => {
    e.preventDefault();
    setIsMenu(!isMenu)
  }
  const [isAdd, setIsAdd] = useState();

  const checkAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd)
  }
  const addPost = useRef();
  const addPrivate = useRef();

  const handleRefPost = () => {
    addPost.current.click();
  }
  const handleRefPrivate = () => {
    addPrivate.current.click();
  }
  const {upload} = postRequest();
  const {uploadPrivate} = privateRequest();


const handlePost = async (e) => {
  const file = e.target.files[0];
    await upload(file);
    setPostChange(new Date().getTime());
}
const handlePrivate = async (e) => {
  const file = e.target.files[0];
    await uploadPrivate(file);
    setPrivateChange(new Date().getTime());

}

const getPostInfo = (userId) => {
  const userPosts = posts.filter(post => post.userId._id === userId);
  const totalLikes = userPosts.reduce((acc, post) => acc + post.totalLikes, 0); 
  // console.log('userPost :', userPosts);
  // console.log('totalLikes :', totalLikes);
  return { postCount: userPosts.length, totalLikes };
};

  const [activeButton, setActiveButton] = useState('all');
  const [isPhoto, setIsPhoto] = useState(true)
  const [isVideo, setIsVideo] = useState(false)
  const [isPrivacy, setIsPrivacy] = useState(false)


  const handleButtonClick = (button) => {
    setActiveButton(button);

    setIsPhoto(false);
    setIsVideo(false);
    setIsPrivacy(false);
    

    switch (button) {
      case 'all':
        setIsPhoto(true)
        break;
      case 'video':
        setIsVideo(true)
        break;
      case 'privacy':
        setIsPrivacy(true)
        break;
      default:
        break;
    }
  };


  return (
    <div className='w-screen flex flex-col overflow-auto'>
        <div className='flex relative w-full mb-4 h-10' style={{zIndex: '1'}}>
            <div className='fixed self-center px-2  h-10 w-full flex flex-row justify-between bg-base-100'>
                {logUser.map((user) => (<div>{user.userName}</div>))} 
                <div className='flex flex-row justify-end gap-2 w-3/4'>
                <div className='flex flex-row align-middle gap-2 justify-end'>
                    <Link to='/smPost'><div><HomeIcon /></div></Link>
                    <div onClick={checkAdd}>{!isAdd ? <AddCircleOutlineIcon /> : <ClearIcon />}</div>
                    {isAdd && (
                      <>
                        <div className='bg-base-100 flex flex-col absolute mt-8 w-2/5'>
                          <div className='flex flex-row gap-2' onClick={handleRefPost}>
                            <div><AddCircleOutlineIcon /></div>
                            <div>Add public post</div>
                          </div>
                            <div className='flex flex-row gap-2' onClick={handleRefPrivate}>
                              <div><LockIcon /></div>
                              <div>Add private post</div>
                            </div>
                        </div>
                          <input type="file"
                            style={{display: 'none'}}
                            ref={addPost}
                            onChange={handlePost}/>
                          <input type="file"
                            style={{display: 'none'}}
                            ref={addPrivate}
                            onChange={handlePrivate}/>
                      </>
                      )}
                    <Link to='/'><div><ChatBubbleOutlineIcon /></div></Link> 
                    <div className='drop-menu relative inline-block'>
                        <div onClick={handleMenu}>{isMenu ? <ClearIcon /> : <MenuIcon />}</div>
                        {isMenu && (
                        <div className='drop-ctnt absolute bg-base-100 justify-center align-middle'>
                            <div className='ctnt flex flex-col w-full'>
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
                                            <div>personal Account</div>
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
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
        {/* <div className='w-full flex flex-row align-middle justify-around py-2'>
          <div>
            <Button size='sm' className='bg-base-100' endContent={<AccountBalanceWalletIcon />}>
              Wallet Balance
            </Button> 
          </div>
          <div>
            <Button size='sm' className='bg-base-100' endContent={<AccountBalanceWalletIcon />}>
              Subscriptions
            </Button>
          </div>
        </div> */}
        {logUser.map((user, idx) => {
          const { postCount, totalLikes } = getPostInfo(user._id);
          return (
          <div className='w-full flex flex-row align-middle justify-around py-1'>
            <div className='flex flex-col self-center'>
              <div className='flex align-middle justify-center'>{ postCount } </div>
              <div className='flex align-middle justify-center'>post</div>
            </div>
            <div className='flex flex-col self-center'>
              <div className='flex align-middle justify-center'>{user.totalFollowing}</div>
              <div className='flex align-middle justify-center'>follower</div>
            </div>
            <div></div>
            <div className='flex flex-col self-center absolute ' style={{borderRadius: '20px'}}>
              <div className='flex align-middle justify-center'>
                <div className="avatar" onClick={handleFileRef}>
                <div className="w-14 rounded-full">
                  <img src={getProfileImageUrl(user)} />
                </div>
              </div>
              <input type="file" style={{display: 'none'}}
                ref={addProfile}
                onChange={handleFileChange} />
              </div>
              {/* <div className='flex align-middle justify-center mt-2'>{user.fullName}</div>
              <div className='flex align-middle justify-center'>{user.userName}</div> */}
            </div>
            <div className='flex flex-col self-center'>
              <div className='flex align-middle justify-center'>{totalLikes}</div>
              <div className='flex align-middle justify-center'>likes</div>
            </div>
            <div className='flex flex-col self-center'>
              <div className='flex align-middle justify-center'>{user.totalFollowing}</div>
              <div className='flex align-middle justify-center'>following</div>
            </div>
          </div>
          )
        })}
        <div className='flex flex-row align-middle justify-around mt-2 py-4'>
          <button 
            onClick={() =>handleButtonClick("all")}>
              <PhotoLibraryIcon 
              className={`${activeButton === 'all' ? 'text-fuchsia-500' : ''}`}
              />
          </button>
          <button 
            onClick={() =>handleButtonClick("video")}>
              <FeaturedVideoIcon 
                className={`${activeButton === 'video' ? 'text-fuchsia-500' : ''}`}
                />
          </button>
          <button 
            onClick={() =>handleButtonClick("privacy")}>
              <FolderSpecialIcon 
                className={`${activeButton === 'privacy' ? 'text-fuchsia-500' : ''}`}
              />
          </button>
        </div>
        
        {isPhoto ? (
          <div className='pl-2 pr-2'>
          <div class="grid grid-cols-3 gap-1">
            {filteredPosts.length === 0 ? (
              <div className='w-full flex'>
                <p>No post yet</p>
              </div>
            ) : (filteredPosts.map((post) => (
              <div className='flex flex-row align-middle justify-center'>
                <SmPoster id={post} />
              </div>
              )
            ))}
          </div>
        </div>
        ) : isVideo ? (
          <div className='pl-2 pr-2'>
            <div class="grid grid-cols-3 gap-1">
              {filteredPosts.length === 0 ? (
                <div className='w-full flex'>
                  <p>No post yet</p>
                </div>
              ) : (filteredPosts.map((post) => (
                <div className='flex flex-row align-middle justify-center'>
                  <SmVideo id={post} />
                </div>
              )
              ))}
            </div>
          </div>
        ) : isPrivacy ? (
          <div className='pl-2 pr-2'>
            <div class="grid grid-cols-3 gap-1">
              {filteredprivates.length === 0 ? (
                <div className='w-full flex'>
                  <p>No post yet</p>
                </div>
              ) : (filteredprivates.map((post) => (
                <div className='flex flex-row align-middle justify-center'>
                  <SmPrivate id={post} />
                </div>
              )
              ))}
            </div>
          </div>
        ) : (
          <div>nothing here</div>
        )}
        <div className='mt-10'></div>
    </div>
  )
}

export default account