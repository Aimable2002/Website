import React, { useState, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import './sm.css';

import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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

import FavoriteIcon from '@mui/icons-material/Favorite';

import useGetUser from '../../hook/useGetUser';
import Conversation from '../zustand/zustand';
import postRequest from '../../hook/postRequest';
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
import ImageSkeleton from '../../skeleton/imageSkeleton';
import videoSkeleton from '../../skeleton/videoSkeleton';

const smPost = ({user, post}) => {

    const [postersFetched, setPostersFetched] = useState({});

    const handlePosterFetched = (postId) => {
        setPostersFetched((prev) => ({ ...prev, [postId]: true }));
      };

    const {loading, users} = useGetUser();
  
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

  const addPost = useRef();

  const handleRefPost = () => {
    addPost.current.click();
  }
  const {upload} = postRequest();

const [postChange, setPostChange] = useState();
const handlePost = async (e) => {
    const file = e.target.files[0];
    await upload(file);
  setPostChange(new Date().getTime());
}

const [activeButton, setActiveButton] = useState('All');
const navigate = useNavigate(); // For navigation

  const handleButtonClick = (button) => {
    setActiveButton(button);

    // Define navigation logic or other actions based on the button
    // switch (button) {
    //   case 'All':
    //     navigate('/all');
    //     break;
    //   case 'Available':
    //     navigate('/available');
    //     break;
    //   case 'Live':
    //     navigate('/live');
    //     break;
    //   case 'Hook up':
    //     navigate('/hookup');
    //     break;
    //   case 'Stars':
    //     navigate('/stars');
    //     break;
    //   case 'Sure deal':
    //     navigate('/suredeal');
    //     break;
    //   default:
    //     break;
    // }
  };
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

  const {posts: initialValue} = useGetPost(postChange);

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId)
  }
  const filterPost = initialValue.filter((post) => {
    const user = getUserById(post.userId)
  })
  
const [message, setMessage] = useState('');
  const {sendMessages} = useSendMessage()
const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message.trim())return;

    await sendMessages(message)
    setMessage('')
  }
  const [path, setPath] = useState()
  const handlePath = (post) => {
    setUser(post)
    navigate(`/private/${post.user._id}`)

  }
  return (
    <div className=' w-screen overflow-auto'>
        <div className='header flex w-full relative bg-base-100' style={{zIndex: '1'}}>
            <div className='header-content px-2 flex w-full fixed bg-base-100'>
                <div className=''>WebApp</div>
                <div className='flex flex-row align-middle justify-between w-2/4'>
                    <div onClick={()=>document.getElementById('my_modal_3').showModal()}><SearchIcon /></div>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
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
                        </dialog>
                    <div onClick={handleRefPost}><AddCircleOutlineIcon /></div>
                        <input type="file"
                        style={{display: 'none'}}
                        ref={addPost}
                        onChange={handlePost}/>
                    
                    <Link to='/'><div><ChatBubbleOutlineIcon /></div></Link> 
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
        {/* <div className='w-full flex-row flex gap-2 py-1 mt-10 bg-base-100 mb-3' style={{zIndex: '-1'}}>
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
        </div> */}
        {/* <div className='w-full flex flex-row overflow-x-auto mt-8'> 
            <div className='btn'>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('All')}
                    className={`${activeButton === 'All' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    All
                </Button>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('Available')}
                    className={`${activeButton === 'Available' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    Available
                </Button>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('Live')}
                    className={`${activeButton === 'Live' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    Live
                </Button>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('Hook up')}
                    className={`${activeButton === 'Hook up' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    Hook up
                </Button>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('Stars')}
                    className={`${activeButton === 'Stars' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    Stars
                </Button>
                <Button
                    size='sm'
                    onClick={() => handleButtonClick('Sure deal')}
                    className={`${activeButton === 'Sure deal' ? 'bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' : ''}`}
                >
                    Sure deal
                </Button>
            </div>
        </div> */}
        <div className='w-full relative flex overflow-y-auto flex-col mt-5'>
            {/*{users
            .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
            .map((user, idx) => ( */}
            {!loading && initialValue.length > 0 && initialValue.map((post, idx) => (      
                    <div key={idx} className='crd-area w-full flex  gap-1 flex-col px-1  bg-base-100'>
                        <div className=' crd w-full relative flex align-middle py-2'>
                            <div className='px-2 crd-hd w-full flex flex-row justify-between align-middle'>
                                <div className='crd-prof flex flex-row gap-4'>
                                    <div className="avatar">
                                        <div className="w-11 rounded-full">
                                            <img src={post.user.profile && post.user.profile.trim() !== '' ? post.user.profile : post.user.gender === 'Male' ? 
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
                                        {/* <button>About Me</button> */}
                                        {/* <div onClick={() => handleView(post)}>{!view ? 'view' : 'viewsss'}</div> */}
                                    </div>
                                    <Like postId={post}/>
                                    <div className='flex flex-row gap-2 align-middle'>
                                        <button></button>
                                        {/* <div><ChatBubbleOutlineIcon /></div> */}
                                    </div>
                                </div>
                                <div className='ft-rgt flex self-end  w-2/6 justify-around align-middle'>
                                    <div></div>
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button onClick={() => handlePath(post)}>See More</button>
                                    {/* <div onClick={()=>document.getElementById('my_modal_3').showModal()}>DM</div>
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box" onSubmit={handleSubmit}>
                                            <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <textarea
                                                name="" 
                                                rows='2' 
                                                id=""
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={handleKeyPress}></textarea>
                                        </div>
                                        <button>send</button>
                                    </dialog> */}
                                </div>
                            </div>
                            <div className='ft-ftr flex flex-row w-full  align-middle'>
                                {/* <div>comment content displayed here</div> */}
                            </div>
                        </div>
                    </div>
            ))}
            {loading && [...Array(3)].map((_, idx) => <ImageSkeleton key={idx} />)}
            {!loading && initialValue.length === 0 && (
				<p className='text-center'></p>
			)}
        </div>
        <div className='mb-40'></div>
    </div>
  )
}

export default smPost










// import React, { useState } from 'react'

// import { useRef } from 'react';

// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import MenuIcon from '@mui/icons-material/Menu';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

// import useGetUser from '../../hook/useGetUser';
// import Conversation from '../zustand/zustand';
// import postRequest from '../../hook/postRequest';

// const smPost = () => {

//     const {loading, users} = useGetUser();
  
//     const {selectedUser, setUser} = Conversation();

//     const [search, setSearch] = useState('')

//   const handleSearch = (e) => {
//     if(e.key === 'Enter'){
//         e.preventDefault();
//       if(!search)return;

//       const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()))

//       if(result){
//         setUser(result)
//         setSearch('')
//       }else{
//         return console.log('no user found')
//       }
//     }
//   }

//   const addPost = useRef();

//   const handleRefPost = () => {
//     addPost.current.click();
//   }
//   const {upload} = postRequest();

// const [postChange, setPostChange] = useState();
// const handlePost = async (e) => {
//   setPostChange(e.target.files[0]);
//   await upload(e.target.files[0])
// }


//   return (
//     <div className=' w-screen'>
//         <div className='header'>
//           <div className='header-content px-2'>
//             <div className='w-3/12'>Edit</div>
//             <div className='flex flex-row align-middle justify-between w-2/4'>
//               <div></div>
//               <div></div>
//               <div><MenuIcon /></div>
//             </div>
//           </div>
//         </div>
//         <div className='w-full flex-row flex gap-2 py-1'>
//           <div className='px-1'><SearchIcon /></div>
//           <div>
//             <form onSubmit={handleSearch}>
//               <input 
//               type="search" 
//               placeholder='search...'
//               className='border-none'
//               value={search}
//               onChange={(e) => setSearch(e.target.value)} />
//             </form>
//           </div>
//         </div>
//         <div className='w-full relative flex overflow-y-auto'>
//             {users.map((user, idx) => (
//             <div className='crd-area w-full flex  gap-1 flex-col px-2 bg-base-100'>
//                 <div className=' crd w-full relative flex align-middle py-2'>
//                     <div className=' crd-hd w-full flex flex-row justify-between align-middle'>
//                         <div className='crd-prof flex flex-row gap-4'>
//                             <div className="avatar">
//                                 <div className="w-14 rounded-full">
//                                     <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
//                                 </div>
//                             </div>
//                             <div className='dtl flex align-middle self-center'>
//                                 <div className='username flex align-middle'>username</div>
//                             </div>
//                         </div>
//                         <div className='crd-rgt flex self-center w-2/6 justify-around'>
//                             <div>Follow</div>
//                             <div>Subscribe</div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='w-full flex'>
//                     <figure>
//                         <img src={user.profile} alt="" />
//                     </figure>
//                 </div>
//                 <div className='flex flex-col align-middle py-2'>
//                     <div className='ftr-hd flex flex-row  w-full justify-between'>
//                         <div className='ft-lft flex flex-row  w-3/5 gap-4'>
//                             <div className='flex flex-row gap-2 align-middle'>
//                                 <div>views</div>
//                                 <div>100</div>
//                             </div>
//                             <div className='flex flex-row gap-2 align-middle'>
//                                 <div><FavoriteBorderIcon /></div>
//                                 <div>10</div>
//                             </div>
//                             <div className='flex flex-row gap-2 align-middle'>
//                                 <div><ChatBubbleOutlineIcon /></div>
//                                 <div>20</div>
//                             </div>
//                         </div>
//                         <div className='ft-rgt flex self-end  w-2/6 justify-around align-middle'>
//                             <div><ShareIcon /></div>
//                             <div>DM</div>
//                         </div>
//                     </div>
//                     <div className='ft-ftr flex flex-row w-full  align-middle'>
//                         <div>cmt content</div>
//                     </div>
//                 </div>
//             </div>
//             ))}
//         </div>
//         <div className='mb-40'></div>
//     </div>
//   )
// }

// export default smPost;