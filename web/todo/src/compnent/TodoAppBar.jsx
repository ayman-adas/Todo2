import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Example icon

export default function TodoAppBar() {
  return (
    <AppBar  sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ padding: '0 16px' }}>
    
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>
          ToDo
        </Typography>

    
      </Toolbar>
    </AppBar>
  );
} 
