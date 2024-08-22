import React from 'react';
import { Box } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import ForgetPasswordFomCompmonent from '../../compnent/Auth/ForgetPasswordFomCompmonent';

export default function ForgetPasswordView() {
    return (
        <>
            <TodoAppBar />

            <Box
                sx={{
                    backgroundImage: `url("https://t4.ftcdn.net/jpg/07/05/56/21/360_F_705562152_WFSrWPNw6TqrxQ3MJzWzaZ1oeH3jLtUu.jpg")`,
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
                <ForgetPasswordFomCompmonent />
            </Box>
        </>
    )
} 