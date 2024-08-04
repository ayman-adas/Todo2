import React, { useState } from 'react';
import ImagesUpload from 'react-images-upload';

const AddImageCompnent = () => {
  const [pictures, setPictures] = useState([]);

  const onDrop = (pictureFiles) => {
    setPictures(pictureFiles.map(file => URL.createObjectURL(file)));
  };

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
      {pictures.map((picture, index) => (
        <img key={index} src={picture} alt={`Selected ${index}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
      ))}
    </div>
  );
};

export default AddImageCompnent;
