// import React, { useState, useEffect, useRef} from 'react'



// const post = ({ post }) => {
//   //console.log('post :', post)
//   const [muted, setMuted] = useState(true);
//   const videoRef = useRef(null);

//   const handleVideoClick = () => {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//     } else {
//       videoRef.current.pause();
//     }
//   };

//   const handleVideoMute = () => {
//     setMuted(false);
//     videoRef.current.muted = false;
//   };
//   const [inView, setInView] = useState(false)
//   useEffect(() => {
//     const handleScroll = () => {
//       setInView(window.innerHeight <= 100)
//     }
//   },[])

//   const renderMedia = () => {
//     if (post.type === 'image') {
//       return <img src={post.imageURL} alt="" />;
//     } else if (post.type === 'video') {
//       return (
//         <div className="w-full relative overflow-hidden cursor-pointer" onScroll={handleScroll} >
//           <video ref={videoRef} autoPlay loop muted={muted}>
//             <source src={post.imageURL} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//           <button onClick={handleVideoClick}>Play/Pause</button>
//             <button onClick={handleVideoMute}>{muted ? 'Unmute' : 'Mute'}</button>
//         </div>
//       );
//     } else {
//       return null; 
//     }
//   };
//   return (
//     <>
//         <figure>
//             {renderMedia()}
//       </figure>
//     </>
//   )
// }

// export default post



// import React, { useRef, useEffect, useState } from 'react';

// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// const post = ({ post }) => {
//   const [muted, setMuted] = useState(true);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const video = videoRef.current;
//       if (!video) return;

//       const rect = video.getBoundingClientRect();
//       const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

//       const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;

//       if (isInView && video.paused) {
//         video.play();
//       } else if (!isInView && !video.paused) {
//         video.pause();
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
  

//   const handleVideoClick = () => {
//     const video = videoRef.current;
//     if (video.paused) {
//       video.play();
//     } else {
//       video.pause();
//     }
//   };

//   const handleVideoMute = () => {
//     setMuted(!muted);
//     videoRef.current.muted = !muted;
//   };

//   return (
//     <>
//       <figure>
//         {post.type === 'image' && <img src={post.imageURL} alt="" />}
//         {post.type === 'video' && (
//           <div className="w-full relative overflow-hidden cursor-pointer">
//             <video ref={videoRef} autoPlay loop muted={muted} onClick={handleVideoClick}>
//               <source src={post.videoURL} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//             <button onClick={handleVideoMute}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
//           </div>
//         )}
//       </figure>
//     </>
//   );
// };

// export default post;


import React, { useRef, useEffect, useState } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import ImageSkeleton from '../skeleton/imageSkeleton'
import VideoSkeleton from '../skeleton/videoSkeleton'

const Post = ({ post }) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const imgRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const img = imgRef.current;

    const adjustHeight = (element) => {
      if (element) {
        const naturalHeight = element.videoHeight || element.naturalHeight;
        if (naturalHeight > window.innerHeight * 0.6) {
          element.style.height = '60vh';
        } else {
          element.style.height = 'auto';
        }
      }
    };

    if (post.type === 'image' && img) {
      // adjustHeight(img);
    }

    if (post.type === 'video' && video) {
      adjustHeight(video);

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && video.paused) {
            video.play();
          } else if (!entry.isIntersecting && !video.paused) {
            video.pause();
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5, // Trigger when at least 50% of the video is in the viewport
      });

      observer.observe(video);

      return () => {
        if (video) {
          observer.unobserve(video);
        }
      };
    }
  }, [post.type]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVideoMute = () => {
    setMuted(!muted);
    videoRef.current.muted = !muted;
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  return (
    <figure>
      {post.type === 'image' && (
        <>
          {loading && <ImageSkeleton height="60vh" />}
          <img 
            ref={imgRef} 
            src={post.imageURL} 
            alt=""
            style={{ display: loading ? 'none' : 'block' }}
            onLoad={handleImageLoad} 
            />
        </>
      )}
      {post.type === 'video' && (
        <div className="w-full relative overflow-hidden cursor-pointer">
          {loading && <VideoSkeleton height="80vh" />}
          <video 
            ref={videoRef} 
            autoPlay 
            loop 
            muted={muted} 
            onClick={handleVideoClick} 
            onLoadedData={handleVideoLoad}
            style={{ maxHeight: '80vh', width: '100%', objectFit: 'cover', display: loading ? 'none' : 'block' }}
          >
            <source src={post.videoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleVideoMute}>
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </button>
        </div>
      )}
    </figure>
  );
};

export default Post;
