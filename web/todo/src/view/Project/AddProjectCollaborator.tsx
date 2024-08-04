import React from "react";
import { Box, TextField } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";


export default function AddProjectCollaborator() {
    
return ( 
    <>
    <TodoAppBar />
            
            <Box
 sx={{
    backgroundImage: `url("src/assets/login.jpg")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100vw", // Make sure it covers full viewport width
    height: "100vh", // Make sure it covers full viewport height
    position: "absolute", // Ensure it covers the entire viewport
    top: 0, // Align to the top
    left: 0, // Align
    right: 0,
    bottom: 0,
    backgroundAttachment: "fixed",
    overflow: "auto", // Allow scrolling


  }}
                display="flex"

                justifyContent="center"
                alignItems="center"
            >
 <form method="post"  action="http://localhost:2003/login">
            <Box  marginBottom={14} >
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">  <h1>Login Page</h1></Box>
                <Box height={35}></Box>

                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="ProfileEmail"
                    autoComplete="email"
                    autoFocus
                    // onChange={(e) => ProfileEmail = (e.target.value)}
                    />
            </Box></form></Box>
    </>
)}