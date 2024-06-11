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

const post = ({ post }) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

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

    if (video) {
      observer.observe(video);
    }

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, []);

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

  return (
    <>
      <figure>
        {post.type === 'image' && <img src={post.imageURL} alt="" />}
        {post.type === 'video' && (
          <div className="w-full relative overflow-hidden cursor-pointer">
            <video ref={videoRef} autoPlay loop muted={muted} onClick={handleVideoClick}>
              <source src={post.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button onClick={handleVideoMute}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
          </div>
        )}
      </figure>
    </>
  );
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
};

export default post;


//controls