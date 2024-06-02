// import React, { useRef, useState, useEffect } from 'react'

// import LazyLoad from 'react-lazyload';
// import axios from 'axios';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import FavoriteIcon from '@mui/icons-material/Favorite';

// import useGetUser from '../../hook/useGetUser';
// import Conversation from '../zustand/zustand';
// import postRequest from '../../hook/postRequest';
// import useGetPost from '../../hook/useGetPost';
// import useToggleLike from '../../hook/useToggleLike';
// import useFollow from '../../hook/useFollow';
// import useGetFollow  from '../../hook/useGetFollow';
// import useGetFollowing from '../../hook/useGetFollowing';
// import { useAuthContext } from '../../context/authContext';
// import useGetLikes from '../../hook/useGetLikes';


// // Helper function to get image dimensions
// const getImageDimensions = (url) => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.onload = () => {
//       resolve({ width: img.width, height: img.height });
//     };
//     img.src = url;
//   });
// };

// const determineGridStyle = (dimensions) => {
//   if (dimensions.width > dimensions.height) {
//     return "row-span-1 col-span-2";
//   } else if (dimensions.width < dimensions.height) {
//     return "row-span-2 col-span-1";
//   } else {
//     return "row-span-2 col-span-2";
//   }
// };


// const poster = ({userId, post }) => {

//   const {loading, users} = useGetUser();

// const {AuthUser} = useAuthContext();

//   const [search, setSearch] = useState('')

//   const{selectedUser, setUser} = Conversation();

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


// const [imageStyles, setImageStyles] = useState([]);

//   useEffect(() => {
//     const fetchImageStyles = async () => {
//       const styles = await Promise.all(
//         users.map(async (user) => {
//           const dimensions = await getImageDimensions(user.profile);
//           return determineGridStyle(dimensions);
//         })
//       );
//       setImageStyles(styles);
//     };

//     fetchImageStyles();
//   }, [users]);

//   const {postFollow} = useFollow();
//   //const {likes} = useGetLikes();

//   const handleFollowClick = async(userId) => {
//     await postFollow(userId)
//   }

//   const {follower} = useGetFollow();
//   const {following} =useGetFollowing();
//   const { posts: initiolValue } = useGetPost();

 
//   const {isLike: likeState, likesCount: countState, postLikes: postLike, toggleLike} = useToggleLike();
 
//   const handleToggleLike = async (postId) => {
//     await toggleLike(postId)
    
    
//   }
  

//   const [isLikeClicked, setIsLikeClicked] = useState(false);
//   const [count, setCount] = useState(initiolValue);
//   const handlelikeClickedToggle = (e) => {
//     e.preventDefault()
//     setIsLikeClicked(!isLikeClicked)
//     setCount(!count)
//   }
  
// //  console.log('initialValue :', initiolValue)


// const [likes, setLikes] = useState(0);

// useEffect(() => {
//   axios.get('http://localhost:4000/likes')
//     .then(response => {
//       setLikes(response.data.likes);
//     })
//     .catch(error => {
//       console.error('There was an error fetching the likes!', error);
//     });
// }, []);

// const handleLike = () => {
//   axios.post('http://localhost:4000/like')
//     .then(response => {
//       setLikes(response.data.likes);
//     })
//     .catch(error => {
//       console.error('There was an error liking the post!', error);
//     });
// };

//   return (
//     <div className='w-full flex flex-col overflow-auto'>
//         <div className='flex relative w-full mb-10'>
//             <div className='fixed h-5 w-full flex flex-row'>
//                 <div style={{width: 'calc(100% - 91%', color: '#00FFF5'}}>ChatApp</div>
//                 <div className='flex flex-row  justify-around' style={{width: 'calc(100% - 60%)'}}>
//                     <div className='cursor-pointer'><HomeIcon /></div>
//                     <div className='cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}>
//                       <SearchIcon />
//                     <dialog id="my_modal_3" className="modal">
//                       <div className="modal-box">
//                         <form method="dialog">
//                           {/* if there is a button in form, it will close the modal */}
//                           <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                         </form>
//                         <form onSubmit={handleSearch}>
//                           <input 
//                           type="search" 
//                           placeholder='Search...'
//                           className='border-none px-7' 
//                           value={search}
//                           onChange={(e) => setSearch(e.target.value)}/>
//                         </form>
//                       </div>
//                     </dialog>
//                     </div>
//                     <div className='cursor-pointer' onClick={handleRefPost}><AddCircleOutlineIcon /></div>
//                     <input type="file"
//                     style={{display: 'none'}}
//                     ref={addPost}
//                     onChange={handlePost} />
//                     <div className='cursor-pointer'><MonetizationOnIcon /></div>
//                 </div>
//             </div>
//         </div>
//       <div className='overflow-y-auto flex flex-wrap  align-middle justify-center gap-3'>
//         {initiolValue.map((post, idx) => {
//             const userId = post.user
//             const like = localStorage.getItem('like')
                       
//             const likeIn = `${JSON.parse(like)?.postLiked ?? null}`
//             const currentLike = `${JSON.parse(like)?.likes ?? null}`
//             const checkPost = post._id === likeIn ? currentLike : post.totalLikes

//             const followData = localStorage.getItem('follow');
//             const unfollowData = localStorage.getItem('unfollow');

//             const parsedFollowData = followData ? JSON.parse(followData) : null;
//             const parsedUnfollowData = unfollowData ? JSON.parse(unfollowData) : null;

//             const currentFollow = parsedFollowData?.newFollow?.following ?? null;
//             console.log('currentFollow :', currentFollow)
//             const currentUnfollow = parsedUnfollowData?.unFollowed ?? null;
//             console.log('currentUnFollow :', currentUnfollow)
//             const checkFollow = post._id === currentFollow ? 'following' : 'follow';
//             const checkUnfollow = post._id === currentUnfollow ? 'follow' : 'following..';

//             const followButton = checkFollow !== 'following' ? checkUnfollow : checkFollow;

//             console.log('followButton :', followButton)

//             //console.log('checkCurrentFollow :', checkCurrent)

//             return (
//           <div key={idx} className=' flex align-middle justify-center' style={{width: '100%',  gap: '4px', 
//           position: 'relative' }}>
//         <div className="card w-96 bg-base-100 shadow-xl"> 

//           <div className='grid grid-cols-1'>
//             <figure>
//                 <img src={post.imageURL} alt="" />
//             </figure>
//           </div>
  
//           <div className="card-body align-middle">
//             <div className='flex flex-row w-full align-middle gap-3'>
//               <div className="avatar">
//                 <div className="w-8 rounded-full">
//                   {/* <img src={getProfileImageUrl(user)} /> */}
//                   <img src={post.user.profile && post.user.profile.trim() !== '' ? post.user.profile : post.user.avatar} alt="" />
//                 </div>
//               </div>
//               <div className='flex self-center w-3/6'>{post.user.userName}</div>
//               <div className='flex self-center gap-1'>1M 
//                 <span className='flex self-center'>views</span>
//               </div>
//               <div className='flex self-center cursor-pointer gap-1' onClick={() => handleToggleLike(post)}>
//               {post.totalLikes > 0 ? (
//                 <> 
//                   <span className='flex self-center'>{checkPost}</span>
//                   <span><FavoriteIcon /></span> 
//                 </>
//               ) : (<span onClick={handlelikeClickedToggle}>{!isLikeClicked ? <FavoriteBorderIcon /> : <FavoriteIcon /> }</span>)}
//               </div>
//                <div className='flex self-center cursor-pointer gap-1'>
//                 <span className='flex self-center'>45</span>
//                 <ChatBubbleOutlineIcon /></div> 
//               <div className='flex self-center cursor-pointer'><ShareIcon /></div>
//             </div>
//             <p>thats the cmt there...</p>

//                 <div className="card-actions justify-end">
//                     {post.isFollowing ? (
//                       <div className="border-none badge badge-outline cursor-pointer py-1 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" 
//                       onClick={() => handleFollowClick(userId)}>following</div>
//                     ) : (
//                       <div className="border-none badge badge-outline cursor-pointer"onClick={() => handleFollowClick(userId)}>follow</div>
//                     )}
//                     <div className="border-none badge badge-outline cursor-pointer">Subscribe</div>
//                 </div>
              
//           </div>
//           </div>
//           </div>
//             )
//         })}
        
//         <div className='mb-10'>
//           <div>
//             <p>Likes: {likes}</p>
//             <button onClick={handleLike}>Like</button>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default poster







import React, { useRef, useState, useEffect } from 'react'

import LazyLoad from 'react-lazyload';
import axios from 'axios';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import useGetUser from '../../hook/useGetUser';
import Conversation from '../zustand/zustand';
import postRequest from '../../hook/postRequest';
import useGetPost from '../../hook/useGetPost';
import useToggleLike from '../../hook/useToggleLike';
import useFollow from '../../hook/useFollow';
import useGetFollow  from '../../hook/useGetFollow';
import useGetFollowing from '../../hook/useGetFollowing';
import { useAuthContext } from '../../context/authContext';
import useGetLikes from '../../hook/useGetLikes';
import Like from '../../compound/like';
import Follow from '../../compound/follow';
import Post from '../../compound/post';

// Helper function to get image dimensions
const getImageDimensions = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};

const determineGridStyle = (dimensions) => {
  if (dimensions.width > dimensions.height) {
    return "row-span-1 col-span-2";
  } else if (dimensions.width < dimensions.height) {
    return "row-span-2 col-span-1";
  } else {
    return "row-span-2 col-span-2";
  }
};


const poster = ({userId, post }) => {

  const {loading, users} = useGetUser();

const {AuthUser} = useAuthContext();

  const [search, setSearch] = useState('')

  const{selectedUser, setUser} = Conversation();

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

const [imageStyles, setImageStyles] = useState([]);

  useEffect(() => {
    const fetchImageStyles = async () => {
      const styles = await Promise.all(
        users.map(async (user) => {
          const dimensions = await getImageDimensions(user.profile);
          return determineGridStyle(dimensions);
        })
      );
      setImageStyles(styles);
    };

    fetchImageStyles();
  }, [users]);
 
  const { posts: initiolValue } = useGetPost();



  return (
    <div className='w-full flex flex-col overflow-auto'>
        <div className='flex relative w-full mb-10'>
            <div className='fixed h-5 w-full flex flex-row'>
                <div style={{width: 'calc(100% - 91%', color: '#00FFF5'}}>ChatApp</div>
                <div className='flex flex-row  justify-around' style={{width: 'calc(100% - 60%)'}}>
                    <div className='cursor-pointer'><HomeIcon /></div>
                    <div className='cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}>
                      <SearchIcon />
                    <dialog id="my_modal_3" className="modal">
                      <div className="modal-box">
                        <form method="dialog">
                          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <form onSubmit={handleSearch}>
                          <input 
                          type="search" 
                          placeholder='Search...'
                          className='border-none px-7' 
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}/>
                        </form>
                      </div>
                    </dialog>
                    </div>
                    <div className='cursor-pointer' onClick={handleRefPost}><AddCircleOutlineIcon /></div>
                    <input type="file"
                    style={{display: 'none'}}
                    ref={addPost}
                    onChange={handlePost} />
                    <div className='cursor-pointer'><MonetizationOnIcon /></div>
                </div>
            </div>
        </div>
      <div className='overflow-y-auto flex flex-wrap  align-middle justify-center gap-3'>
        {initiolValue.map((post, idx) => {
            return (
          <div key={idx} className=' flex align-middle justify-center' style={{width: '100%',  gap: '4px', 
          position: 'relative' }}>
        <div className="card w-96 bg-base-100 shadow-xl"> 

          <Post post={post}/>
  
          <div className="card-body align-middle">
            <div className='flex flex-row w-full align-middle gap-3'>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  {/* <img src={getProfileImageUrl(user)} /> */}
                  <img src={post.user.profile && post.user.profile.trim() !== '' ? post.user.profile : post.user.avatar} alt="" />
                </div>
              </div>
              <div className='flex self-center w-3/6'>{post.user.userName}</div>
              <div className='flex self-center gap-1'>1M 
                <span className='flex self-center'>views</span>
              </div>
                <Like postId={post} />
               <div className='flex self-center cursor-pointer gap-1'>
                <span className='flex self-center'>45</span>
                <ChatBubbleOutlineIcon /></div> 
              <div className='flex self-center cursor-pointer'><ShareIcon /></div>
            </div>
            <p>thats the cmt there...</p>
              <Follow  userId={post}/>
          </div>
          </div>
          </div>
            )
        })}
        
        <div className='mb-10'></div>
      </div>
      
    </div>
  )
}

export default poster



