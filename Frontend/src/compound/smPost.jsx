// import React, { useRef, useEffect, useState } from 'react';

//   import VolumeOffIcon from '@mui/icons-material/VolumeOff';
//   import VolumeUpIcon from '@mui/icons-material/VolumeUp';

//   import MessageSkeleton from '../skeleton/skeleton';

// const smPost = ({id, onFetched}) => {
  
  
//     const [muted, setMuted] = useState(true);
//     const videoRef = useRef(null);
//     const imageRef = useRef(null);
//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const handleScroll = () => {
//         const video = videoRef.current;
//         if (!video) return;
  
//         const rect = video.getBoundingClientRect();
//         const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
//         const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;
  
//         if (isInView && video.paused) {
//           video.play();
//         } else if (!isInView && !video.paused) {
//           video.pause();
//         }
//       };
  
//       window.addEventListener('scroll', handleScroll);
  
//       return () => {
//         window.removeEventListener('scroll', handleScroll);
//       };
//     }, []);
  
//     const handleVideoClick = () => {
//       const video = videoRef.current;
//       if (video.paused) {
//         video.play();
//       } else {
//         video.pause();
//       }
//     };
  
//     const handleVideoMute = () => {
//       setMuted(!muted);
//       videoRef.current.muted = !muted;
//     };

//     useEffect(() => {
//       const adjustImageHeight = () => {
//         if (imageRef.current) {
//           const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
//           if (imageRef.current.height > 0.6 * viewportHeight) {
//             imageRef.current.style.height = '80vh';
//           } else {
//             imageRef.current.style.height = 'auto';
//           }
//         }
//       };
  
//       adjustImageHeight();
  
//       window.addEventListener('resize', adjustImageHeight);
  
//       return () => {
//         window.removeEventListener('resize', adjustImageHeight);
//       };
//     }, []);

//     // useEffect(() => {
//     //   if (id.type === 'image') {
//     //     const img = new Image();
//     //     img.src = id.imageURL;
//     //     img.onload = () => {
//     //       onFetched(id.id);
//     //     };
//     //   } else if (id.type === 'video') {
//     //     const video = document.createElement('video');
//     //     video.src = id.videoURL;
//     //     video.onloadeddata = () => {
//     //       onFetched(id.id);
//     //     };
//     //   }
//     // }, [id, onFetched]);

//     const handleImageLoad = () => {
//       setLoading(false);
//     };
  
//     const handleVideoLoad = () => {
//       setLoading(false);
//     };
  
//     // return (
//     //   <>
//     //     <figure>
//     //       {id.type === 'image' && <img src={id.imageURL} alt="" />}
//     //       {id.type === 'video' && (
//     //         <div className="w-full relative overflow-hidden cursor-pointer">
//     //           <video ref={videoRef} autoPlay loop muted={muted} onClick={handleVideoClick} style={{maxHeight: '80vh', width:'100%', objectFit: 'cover'}}>
//     //             <source src={id.videoURL} type="video/mp4" />
//     //             Your browser does not support the video tag.
//     //           </video>
//     //           <button onClick={handleVideoMute}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
//     //         </div>
//     //       )}
//     //     </figure>
//     //   </>
//     // );

//     return (
//       <>
//         <figure>
//           {id.type === 'image' && (
//             <>
//               {loading && <MessageSkeleton height="60vh" />}
//               <img
//                 src={id.imageURL}
//                 alt=""
//                 style={{ display: loading ? 'none' : 'block' }}
//                 onLoad={handleImageLoad}
//               />
//             </>
//           )}
//           {id.type === 'video' && (
//             <div className="w-full relative overflow-hidden cursor-pointer">
//               {loading && <MessageSkeleton height="80vh" />}
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 loop
//                 muted={muted}
//                 onClick={handleVideoClick}
//                 onLoadedData={handleVideoLoad}
//                 style={{ maxHeight: '80vh', width: '100%', objectFit: 'cover', display: loading ? 'none' : 'block' }}
//               >
//                 <source src={id.videoURL} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               <button onClick={handleVideoMute}>
//                 {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//               </button>
//             </div>
//           )}
//         </figure>
//       </>
//     );
//   };


// export default smPost


import React, { useRef, useEffect, useState } from 'react';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import ImageSkeleton from '../skeleton/imageSkeleton'
import VideoSkeleton from '../skeleton/videoSkeleton'

const smPost = ({ id }) => {
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

    if (id.type === 'image' && img) {
      // adjustHeight(img);
    }

    if (id.type === 'video' && video) {
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
  }, [id.type]);

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
      {id.type === 'image' && (
        <>
          {loading && <ImageSkeleton height="60vh" />}
          <img 
            ref={imgRef} 
            src={id.imageURL} 
            alt=""
            style={{ display: loading ? 'none' : 'block' }}
            onLoad={handleImageLoad} 
            />
        </>
      )}
      {id.type === 'video' && (
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
            <source src={id.videoURL} type="video/mp4" />
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

export default smPost;




// import React, { useRef, useEffect, useState } from 'react';

// import VolumeOffIcon from '@mui/icons-material/VolumeOff';
// import VolumeUpIcon from '@mui/icons-material/VolumeUp';

// import MessageSkeleton from '../skeleton/skeleton';

// import ImageSkeleton from '../skeleton/imageSkeleton';
// import VideoSkeleton from '../skeleton/videoSkeleton';

// const smPost = ({id, onFetched}) => {
//     const [muted, setMuted] = useState(true);
//     const videoRef = useRef(null);
//     const imageRef = useRef(null);
//     const [loading, setLoading] = useState(true);
//     const [videoSrc, setVideoSrc] = useState(null);
//     const [imageSrc, setImageSrc] = useState(null);

//     useEffect(() => {
//         const handleScroll = () => {
//             const video = videoRef.current;
//             if (!video) return;

//             const rect = video.getBoundingClientRect();
//             const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

//             const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;

//             if (isInView && video.paused) {
//                 video.play();
//             } else if (!isInView && !video.paused) {
//                 video.pause();
//             }
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     const handleVideoClick = () => {
//         const video = videoRef.current;
//         if (video.paused) {
//             video.play();
//         } else {
//             video.pause();
//         }
//     };

//     const handleVideoMute = () => {
//         setMuted(!muted);
//         videoRef.current.muted = !muted;
//     };

//     useEffect(() => {
//         const adjustImageHeight = () => {
//             if (imageRef.current) {
//                 const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
//                 if (imageRef.current.height > 0.6 * viewportHeight) {
//                     imageRef.current.style.height = '80vh';
//                 } else {
//                     imageRef.current.style.height = 'auto';
//                 }
//             }
//         };

//         adjustImageHeight();

//         window.addEventListener('resize', adjustImageHeight);

//         return () => {
//             window.removeEventListener('resize', adjustImageHeight);
//         };
//     }, []);

//     useEffect(() => {
//         const observerCallback = (entries, observer) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     if (id.type === 'image') {
//                         setImageSrc(id.imageURL);
//                     } else if (id.type === 'video') {
//                         setVideoSrc(id.videoURL);
//                     }
//                     observer.unobserve(entry.target);
//                 }
//             });
//         };

//         const observerOptions = {
//             root: null,
//             rootMargin: '0px',
//             threshold: 0.1,
//         };

//         const observer = new IntersectionObserver(observerCallback, observerOptions);

//         if (imageRef.current) {
//             observer.observe(imageRef.current);
//         }

//         if (videoRef.current) {
//             observer.observe(videoRef.current);
//         }

//         return () => {
//             if (imageRef.current) {
//                 observer.unobserve(imageRef.current);
//             }
//             if (videoRef.current) {
//                 observer.unobserve(videoRef.current);
//             }
//         };
//     }, [id]);

//     const handleImageLoad = () => {
//         setLoading(false);
//     };

//     const handleVideoLoad = () => {
//         setLoading(false);
//     };

//     return (
//         <>
//             <figure>
//                 {id.type === 'image' && (
//                     <>
//                         {loading && <ImageSkeleton  height="100vh" />}
//                         <img
//                             ref={imageRef}
//                             src={imageSrc}
//                             alt=""
//                             style={{ display: loading ? 'none' : 'block' }}
//                             onLoad={handleImageLoad}
//                         />
//                     </>
//                 )}
//                 {id.type === 'video' && (
//                     <div className="w-full relative overflow-hidden cursor-pointer">
//                         {loading && <VideoSkeleton height="100vh" />}
//                         <video
//                             ref={videoRef}
//                             autoPlay
//                             loop
//                             muted={muted}
//                             onClick={handleVideoClick}
//                             onLoadedData={handleVideoLoad}
//                             style={{ maxHeight: '80vh', width: '100%', objectFit: 'cover', display: loading ? 'none' : 'block' }}
//                         >
//                             <source src={videoSrc} type="video/mp4" />
//                             Your browser does not support the video tag.
//                         </video>
//                         <button onClick={handleVideoMute}>
//                             {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//                         </button>
//                     </div>
//                 )}
//             </figure>
//         </>
//     );
// };

// export default smPost;
