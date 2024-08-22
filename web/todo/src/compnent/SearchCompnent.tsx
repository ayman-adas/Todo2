import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const ComponentSearch = ({ searchQuery, setSearchQuery }) => {
    return (
        <Paper
            sx={{ display: 'flex', alignItems: 'center', width: 400, backgroundColor:"black"}}
        >
            <InputBase
                sx={{ ml: 1, flex: 1  ,color:"white"  }}
                placeholder="Search Projects"
                inputProps={{ 'aria-label': 'Search Projects' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
            />
            <IconButton type="button" sx={{ p: '10px', color:"white" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
    );
};

export default ComponentSearch;
