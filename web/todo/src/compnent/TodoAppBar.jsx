import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TodoAppBar() {
  return (
    <Box>
      <AppBar>
        
          <Typography variant="h6" align='center'>
            ToDo
          </Typography>
      
      </AppBar>
    </Box>
  );
}