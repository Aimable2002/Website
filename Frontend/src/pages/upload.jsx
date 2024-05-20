import React, { useState, useEffect } from 'react'
import uploadRequest from '../hook/uploadRequest';
import useGetPost from '../hook/useGetPost';
import storyRequest from '../hook/storyRequest';
import useGetUser from '../hook/useGetUser';
import usegetLoggedIn from '../hook/usegetLoggedIn';


const getImageDimensions = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};

// Determine grid style based on dimensions
const determineGridStyle = (dimensions) => {
  if (dimensions.width > dimensions.height) {
    return { gridRow: 'span 1', gridColumn: 'span 2' };
  } else if (dimensions.width < dimensions.height) {
    return { gridRow: 'span 2', gridColumn: 'span 1' };
  } else {
    return { gridRow: 'span 2', gridColumn: 'span 2' };
  }
};

const upload = () => {
  const [fileChange, setFileChange] = useState();
  const {upload, loading} = storyRequest();
  const handleSubmit = async (e) => {

    setFileChange(e.target.files[0])
    console.log('setFile: ', e.target.files[0])
    await upload (e.target.files[0]);
  }
 const {post} = useGetPost();
// //  console.log('post :', post)
// //  if(post.length === 0){
// //   return <div>no post here</div>
// //  }
const {users} = useGetUser();
const {logUser} = usegetLoggedIn();

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

  return (
    <div>
        <input 
          type="file" 
          placeholder='enter file'
          onChange={handleSubmit} />
          {logUser.map((user) => (
          <div className="avatar ">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <video src={user.status}></video>
                </div>
              </div>))}
              {/* <div className="video-overlay">
          <video src='http://localhost:2000/status/66439d360c1da4af57b770f4-1MB-MP4.mp4'autoPlay controls className="video-player" />
        </div> */}
        <div className='w-full flex flex-col overflow-auto'>
      <div className="grid grid-col-2 grid-flow-col gap-4">
        {users.map((user, index) => (
          <div key={user._id} style={imageStyles[index]}>
            <img src={user.profile} alt="" style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
    <div className='flex flex-wrap flex-col'></div>
    </div>
  )
}

export default upload



