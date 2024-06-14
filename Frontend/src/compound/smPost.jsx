import React, { useRef, useEffect, useState } from 'react';

  import VolumeOffIcon from '@mui/icons-material/VolumeOff';
  import VolumeUpIcon from '@mui/icons-material/VolumeUp';

  import MessageSkeleton from '../skeleton/skeleton';

const smPost = ({id, onFetched}) => {
  
  
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const handleScroll = () => {
        const video = videoRef.current;
        if (!video) return;
  
        const rect = video.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
        const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;
  
        if (isInView && video.paused) {
          video.play();
        } else if (!isInView && !video.paused) {
          video.pause();
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
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

    useEffect(() => {
      const adjustImageHeight = () => {
        if (imageRef.current) {
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          if (imageRef.current.height > 0.6 * viewportHeight) {
            imageRef.current.style.height = '80vh';
          } else {
            imageRef.current.style.height = 'auto';
          }
        }
      };
  
      adjustImageHeight();
  
      window.addEventListener('resize', adjustImageHeight);
  
      return () => {
        window.removeEventListener('resize', adjustImageHeight);
      };
    }, []);

    useEffect(() => {
      if (id.type === 'image') {
        const img = new Image();
        img.src = id.imageURL;
        img.onload = () => {
          onFetched(id.id);
        };
      } else if (id.type === 'video') {
        const video = document.createElement('video');
        video.src = id.videoURL;
        video.onloadeddata = () => {
          onFetched(id.id);
        };
      }
    }, [id, onFetched]);

    const handleImageLoad = () => {
      setLoading(false);
    };
  
    const handleVideoLoad = () => {
      setLoading(false);
    };
  
    // return (
    //   <>
    //     <figure>
    //       {id.type === 'image' && <img src={id.imageURL} alt="" />}
    //       {id.type === 'video' && (
    //         <div className="w-full relative overflow-hidden cursor-pointer">
    //           <video ref={videoRef} autoPlay loop muted={muted} onClick={handleVideoClick} style={{maxHeight: '80vh', width:'100%', objectFit: 'cover'}}>
    //             <source src={id.videoURL} type="video/mp4" />
    //             Your browser does not support the video tag.
    //           </video>
    //           <button onClick={handleVideoMute}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
    //         </div>
    //       )}
    //     </figure>
    //   </>
    // );

    return (
      <>
        <figure>
          {id.type === 'image' && (
            <>
              {loading && <MessageSkeleton height="60vh" />}
              <img
                src={id.imageURL}
                alt=""
                style={{ display: loading ? 'none' : 'block' }}
                onLoad={handleImageLoad}
              />
            </>
          )}
          {id.type === 'video' && (
            <div className="w-full relative overflow-hidden cursor-pointer">
              {loading && <MessageSkeleton height="80vh" />}
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
      </>
    );
  };

export default smPost