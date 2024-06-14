import React, { useRef, useState } from 'react'

import { Link } from 'react-router-dom';

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
const account = () => {
  const [profileChange, setProfileChange] = useState()
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
  const { posts } = useGetPost();
  const useron = localStorage.getItem('online-user');
  const getUser = useron ? JSON.parse(useron)._id : null;
  //console.log('getUser :', getUser);

  // Filter posts to include only those where the userId matches
  const filteredPosts = posts.filter(post => post.userId._id === getUser);

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

  const addPost = useRef();

  const handleRefPost = () => {
    addPost.current.click();
  }
  const {upload} = postRequest();

const [postChange, setPostChange] = useState();
const handlePost = async (e) => {
  setPostChange(e.target.files[0]);
  await upload(e.target.files[0])

}

const getPostInfo = (userId) => {
  const userPosts = posts.filter(post => post.userId._id === userId);
  const totalLikes = userPosts.reduce((acc, post) => acc + post.totalLikes, 0); 
  // console.log('userPost :', userPosts);
  // console.log('totalLikes :', totalLikes);
  return { postCount: userPosts.length, totalLikes };
};

  return (
    <div className='w-screen flex flex-col overflow-auto'>
        <div className='flex relative w-full mb-10 h-10 bg-base-100' style={{zIndex: '1'}}>
            <div className='fixed self-center px-2  h-5 w-full flex flex-row justify-between'>
                {logUser.map((user) => (<div>{user.userName}</div>))} 
                <div className='flex flex-row justify-around gap-2'>
                <div className='flex flex-row align-middle justify-between gap-2'>
                    <Link to='/smPost'><div><HomeIcon /></div></Link>
                    <div onClick={handleRefPost}><AddCircleOutlineIcon /></div>
                        <input type="file"
                        style={{display: 'none'}}
                        ref={addPost}
                        onChange={handlePost}/>
                    
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
        <div className='w-full flex flex-row align-middle justify-around py-2'>
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
        </div>
        {logUser.map((user, idx) => {
          const { postCount, totalLikes } = getPostInfo(user._id);
          return (
          <div className='w-full flex flex-row align-middle justify-around py-1 bg-base-100'>
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
          <div><PhotoLibraryIcon /></div>
          <div><FeaturedVideoIcon /></div>
          <div><FolderSpecialIcon /></div>
        </div>
        
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
    </div>
  )
}

export default account