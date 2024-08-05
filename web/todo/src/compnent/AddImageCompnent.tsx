import React, { useState, useEffect } from 'react';
import ImagesUpload from 'react-images-upload';

const AddImageCompnent = ({ onImageChange }) => {
  const [pictures, setPictures] = useState('');

  // Effect to call onImageChange when pictures is updated
  useEffect(() => {
    if (pictures) {
      onImageChange(pictures);
    }
  }, [pictures, onImageChange]); // Dependencies include pictures and onImageChange

  const onDrop = (pictureFiles) => {
    const file = pictureFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictures(reader.result); // Update state with the data URL
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }    // Update state
  };

  console.log('picture:', pictures);

  return (
    <div>
      <h1>Image Picker</h1>
      <ImagesUpload
        withIcon={true}
        buttonText='Choose images'
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.gif']}
        maxFileSize={5242880}
        style={{ minHeight: '50px' }} // Minimum height for the upload area
      />
      {pictures && (
        <img
          src={pictures}
          alt={`Selected`}
          style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }}
        />
      )}
    </div>
  );
};

export default AddImageCompnent;
