import React, {useState, useEffect} from 'react'
import axios from 'axios';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const like = ({postId}) => {

    const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
    const post = postId._id;
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const token = localStorage.getItem('online-user');
        const response = await axios.get(`http://localhost:4000/api/action/like/${post}`, {}, {
          headers: {
            Authorization: `${JSON.parse(token).token}`
          }
        });
        setLikes(response.data.likes);
        setIsLiked(response.data.isLiked);
        //console.log('data :', response.data.isLiked)
      } catch (error) {
        console.error('There was an error fetching the likes!', error);
      }
    };

      fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
        //console.log('postId :', postId)
      const token = localStorage.getItem('online-user');
      const response = await axios.post(`http://localhost:4000/api/action/like/${post}`, {}, {
        headers: {
          Authorization: `${JSON.parse(token).token}`
        }
      });
      setLikes(response.data.likes);
      setIsLiked(response.data.isLiked);
      // console.log('isLiked :', response.data.isLiked)
    } catch (error) {
      console.error('There was an error liking the post!', error);
    }
  };
  return (
    <div className='flex self-center cursor-pointer gap-1'>
        <> 

          {isLiked ? <span className='flex self-center'>{likes}</span> : <span className='flex self-center'>{postId.totalLikes}</span>}
          <span onClick={handleLike}>{isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}</span>
            
        </>
    </div>

  )
}

export default like
















