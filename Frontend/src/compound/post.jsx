import React, { useState, useEffect} from 'react'

import axios from 'axios';
const post = ({post}) => {

    const [isPosted, setIsPosted] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const token = localStorage.getItem('online-user');
            const response = await axios.get(`http://localhost:4000/api/upload${post}`, {}, {
              headers: {
                Authorization: `${JSON.parse(token).token}`
              }
            });
            setIsPosted(response.data)
            //console.log('data :', response.data.isLiked)
          } catch (error) {
            console.error('There was an error fetching the likes!', error);
          }
        };
    
            fetchPost();
      }, []);

  return (
    <div className='grid grid-cols-1'>
        <figure>
            <img src={post.imageURL} alt="" />
        </figure>
    </div>
  )
}

export default post