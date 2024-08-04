import React from 'react';
import { Box, } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import LoginFomCompmonent from "../../compnent/Auth/LoginFomCompmonent"
export default function LoginView() {
    return (
        < >
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
                <LoginFomCompmonent />
            </Box>
        </>
    )
} 