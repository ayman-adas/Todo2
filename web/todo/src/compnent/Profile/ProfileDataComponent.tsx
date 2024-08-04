import React, { useState, useEffect } from 'react';
import { Box,  } from '@mui/material';
import { Margin } from '@mui/icons-material';

const ProfileDataComponent = () => {
    const image = "https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
    return (

        <Box
        paddingTop={5}
        paddingLeft={75}
        >
            <img
                src={image}
                style={{ width: 100, height: 100, borderRadius: 100 / 2 }}
                loading="lazy"
            />   <h2 style={{marginTop:5,marginLeft:25}}>
{localStorage.getItem('ProfileName')}
            </h2>

        </Box>

    )
}
export default ProfileDataComponent