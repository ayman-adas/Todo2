import React from "react";
import { Box } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import NewTaskComonent from "../../compnent/Task/AddTaskComponent";

export default function AddTaskView({ProjectID}) {
    
return ( 
    <>
    <TodoAppBar />
            
    <Box
              sx={{
                backgroundImage: `url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149151738.jpg")`,
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
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar in Webkit browsers
                },
                "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
                "scrollbar-width": "none", // Hide scrollbar in Firefox

              }}
                display="flex"

                justifyContent="center"
                alignItems="center"
            >
                <NewTaskComonent ProjectID={ProjectID}/>
            </Box>
    </>
)}