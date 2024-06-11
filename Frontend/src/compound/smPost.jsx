import React, { useRef, useEffect, useState } from 'react';

  import VolumeOffIcon from '@mui/icons-material/VolumeOff';
  import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const smPost = ({id}) => {
  
  
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        const video = videoRef.current;
        if (!video) return;
  
        const rect = video.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  
        // Check if the video is in the viewport
        const isInView = rect.top >= 0 && rect.bottom <= viewportHeight;
  
        if (isInView && video.paused) {
          // If video is in view and is paused, play it
          video.play();
        } else if (!isInView && !video.paused) {
          // If video is out of view and is playing, pause it
          video.pause();
        }
      };
  
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup
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
  
    return (
      <>
        <figure>
          {id.type === 'image' && <img src={id.imageURL} alt="" />}
          {id.type === 'video' && (
            <div className="w-full relative overflow-hidden cursor-pointer">
              <video ref={videoRef} autoPlay loop muted={muted} onClick={handleVideoClick}>
                <source src={id.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <button onClick={handleVideoMute}>{muted ? <VolumeOffIcon /> : <VolumeUpIcon />}</button>
            </div>
          )}
        </figure>
      </>
    );
  };

export default smPost