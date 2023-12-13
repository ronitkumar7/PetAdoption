import React from 'react';
import { useState, useEffect } from "react";

const ImageComponent = ({ imageUrl }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]); 

  if (imageUrl) {
    return (
    <img 
        style={{maxWidth: screenWidth > 500 ? '300px' : '200px', 
                maxHeight: '200px', display: 'block', margin: 'auto'}}
        src={imageUrl} 
        alt="Pet Image"
    />);
  } else {
    return (
    <img 
        style={{maxWidth: screenWidth > 500 ? '300px' : '200px', 
        maxHeight: '200px', display: 'block', margin: 'auto'}}
        src="http://127.0.0.1:8000/media/avatars/default_pet.jpg"
        alt="Default Image"
    />);
  }
};

export default ImageComponent;