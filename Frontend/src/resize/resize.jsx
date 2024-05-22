import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 768); // Consider screens <= 768px as phones

  const handleResize = () => {
    setIsPhone(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isPhone;
};

export default useScreenSize;
