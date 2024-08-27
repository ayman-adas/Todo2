import React, { useState } from 'react';
import { Box } from '@mui/material';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // Ensure styles are imported

const ProfileDataComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

  
    const images = [
        "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
    ];

    return (
        <Box
            paddingTop={5}
            paddingLeft={75}
        >
            <img
                src={images[0]}
                alt="Profile"
                style={{ width: 100, height: 100, borderRadius: 50, cursor: 'pointer' }}
                loading="lazy"
             
            />
            {isOpen && (
                <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                        setPhotoIndex((photoIndex + images.length - 1) % images.length)
                    }
                    onMoveNextRequest={() =>
                        setPhotoIndex((photoIndex + 1) % images.length)
                    }
                />
            )}
            <h2 style={{ marginTop: 5, marginLeft: 25 ,color:"white"}}>
                {localStorage.getItem('ProfileName')}
            </h2>
        </Box>
    );
}

export default ProfileDataComponent;
