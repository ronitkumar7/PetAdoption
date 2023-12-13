import React from 'react';

const ImageComponent = ({ imageUrl }) => {
  if (imageUrl) {
    return (
    <img 
        style={{ maxWidth: '300px', maxHeight: '200px', 
                display: 'block', margin: 'auto'}}
        src={imageUrl} 
        alt="Pet Image"
    />);
  } else {
    return (
    <img 
        style={{ maxWidth: '300px', maxHeight: '200px', 
                display: 'block', margin: 'auto'}}
        src="http://127.0.0.1:8000/media/avatars/default_pet.jpg"
        alt="Default Image"
    />);
  }
};

export default ImageComponent;