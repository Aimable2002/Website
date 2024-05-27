import React, { useState, useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom';

import './sm.css';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
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
import useToggleLike from '../../hook/useToggleLike';
import useFollow from '../../hook/useFollow';

const smPost = ({user, post}) => {

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
  setPostChange(e.target.files[0]);
  await upload(e.target.files[0])
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

  const {posts} = useGetPost();

  const getUserById = (userId) => {
    return users.find((user) => user._id === userId)
  }
  const filterPost = posts.filter((post) => {
    const user = getUserById(post.userId)
  })
  
  const [isLikeClicked, setIsLikeClicked] = useState(false);


  const {isLike, likesCount, toggleLike} = useToggleLike();
  const {isFollow, isFollowCount, postFollow} = useFollow();

  const handleToggleLike2 = async (post) => {
    console.log('post liked :')
    await toggleLike(post)
  }


  const handlelikeClickedToggle2 = (e) => {
    e.preventDefault()
    console.log('like is clicked')
    setIsLikeClicked(!isLikeClicked)
  }

  const handleFollowClick = async(userId) => {
    console.log('follow clicked')
    await postFollow(userId)
  }
  const [view, setView] = useState(false)
const handleView = () => {
    console.log('view is clicked')
    setView(!view)
}
const [test, setTest] = useState(false)
const handleTest = () => {
    console.log('handle test clicked')
    setTest(!test)
}
const [test1, setTest1] = useState(false)
const handleTest1 = () => {
    console.log('handle test 1 clicked')
    setTest1(!test1)
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
                                            <div>Pro Account</div>
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
        <div className='w-full flex flex-row overflow-x-auto mt-8'>
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
        </div>
        <div className='w-full relative flex overflow-y-auto flex-col'>
            {/*{users
            .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
            .map((user, idx) => ( */}
            {posts.map((post, idx) => {
                // const user = getUserById(post.userId);
                // if (!user) return null; // Ensure user exists
                //console.log('userId :', post.userId)
                const userId = post.userId
                //console.log('post :', post._id)
                return (                   
                    <div className='crd-area w-full flex  gap-1 flex-col px-1  bg-base-100'>
                        <div className=' crd w-full relative flex align-middle py-2'>
                            <div className='px-2 crd-hd w-full flex flex-row justify-between align-middle'>
                                <div className='crd-prof flex flex-row gap-4'>
                                    <div className="avatar">
                                        <div className="w-11 rounded-full">
                                            <img src={post.user.profile && post.user.profile.trim() !== '' ? post.user.profile : post.user.avatar} />
                                        </div>
                                    </div>
                                    <div className='dtl flex align-middle self-center'>
                                        <div className='username flex align-middle'>{post.user.userName}</div>
                                    </div>
                                </div>
                                <div className='crd-rgt flex self-center justify-around '>
                                    {post.isFollowing ? (
                                        <div className="badge badge-outline border-none cursor-pointer py-1 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" 
                                        onClick={() => handleFollowClick(userId)}>Following</div> 
                                        ) : (
                                        <div className="badge badge-outline border-none cursor-pointer" onClick={() => handleFollowClick(userId)}>Follow</div> 
                                    )}
                                    <div className='ml-4 badge badge-outline border-none cursor-pointer'>Subscribe</div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-center align-middle'>
                            <figure>
                                <img src={post.imageURL} alt="" />
                            </figure>
                        </div>
                        <div className='flex flex-col align-middle py-2'>
                            <div className='ftr-hd flex flex-row  w-full justify-between'>
                                <div className='ft-lft flex flex-row  w-3/5 gap-4'>
                                    <div className='flex flex-row gap-2 align-middle'>
                                        <div>100</div>
                                        <div onClick={() => handleView(post)}>{!view ? 'view' : 'viewsss'}</div>
                                    </div>
                                    <div className='flex self-center cursor-pointer gap-1' onClick={() => handleToggleLike2(post)}>
                                        {post.totalLikes > 0 ? (
                                        <>
                                        <span className='flex self-center'>{post.totalLikes}</span>
                                        <span><FavoriteIcon /></span>
                                        </>
                                        ) : (<span onClick={handlelikeClickedToggle2}>{!isLikeClicked ? <FavoriteBorderIcon /> : <FavoriteIcon /> }</span>)}
                                    </div>
                                    <div className='flex flex-row gap-2 align-middle'>
                                        <div>20</div>
                                        <div><ChatBubbleOutlineIcon /></div>
                                    </div>
                                </div>
                                <div className='ft-rgt flex self-end  w-2/6 justify-around align-middle'>
                                    <div><ShareIcon /></div>
                                    <div>DM</div>
                                </div>
                            </div>
                            <div className='ft-ftr flex flex-row w-full  align-middle'>
                                <div>cmt content</div>
                            </div>
                        </div>
                    </div>
                )
            })}
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