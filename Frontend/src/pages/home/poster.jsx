import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import useGetUser from '../../hook/useGetUser';
import Conversation from '../zustand/zustand';

const poster = () => {

  const {loading, users} = useGetUser();

  const [search, setSearch] = useState('')

  const{selectedUser, setUser} = Conversation();

  const handleSearch = (e) => {
    e.preventDefault();
    if(!search)return;

    const result = users.find((any) => any.userName.toLowerCase().includes(search.toLowerCase()))

    if(result){
      setUser(result);
      setSearch('')
    }else{
      console.log('no search found')
    }
  }

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
                          {/* if there is a button in form, it will close the modal */}
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
                    <div className='cursor-pointer'><AddCircleOutlineIcon /></div>
                    <div className='cursor-pointer'><MonetizationOnIcon /></div>
                </div>
            </div>
        </div>
      <div className='flex overflow-y-auto flex-wrap align-middle justify-center gap-3'>
        {users
        .filter((user) => user.userName.toLowerCase().includes(search.toLowerCase()))
        .map((user, idx) => (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
          <div className="card-body align-middle">
            <div className='flex flex-row w-full align-middle gap-3'>
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src={user.avatar} />
                </div>
              </div>
              <div className='flex self-center w-3/6'>{user.userName}</div>
              <div className='flex self-center gap-1'>1M 
                <span className='flex self-center'>views</span>
              </div>
              <div className='flex self-center cursor-pointer gap-1'>
                <span className='flex self-center'>120K</span>
                <FavoriteBorderIcon />
              </div>
               <div className='flex self-center cursor-pointer gap-1'>
                <span className='flex self-center'>45</span>
                <ChatBubbleOutlineIcon /></div> 
              <div className='flex self-center cursor-pointer'><ShareIcon /></div>
            </div>
            <p>thats the cmt there...</p>
            
              <div className="card-actions justify-end">
                <div className="badge badge-outline cursor-pointer">Follow</div> 
                <div className="badge badge-outline cursor-pointer">Subscribe</div>
              </div>
              
          </div>
          </div>
        ))}
        
        
      </div>
    </div>
  )
}

export default poster