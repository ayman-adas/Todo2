import React from "react";
import { Box } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import NewTaskComonent from "../../compnent/Task/AddTaskComponent";

export default function AddTaskView() {
    
return ( 
    <>
    <TodoAppBar />
            
            <Box
             sx={{
                backgroundImage: `url("/assets/login.jpg")`, // Ensure the path is correct
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100vw",
                height: "100vh",
                position: "fixed", // Use 'fixed' to cover the entire viewport
                top: 0,
                left: 0,
                overflow: "auto", // Allow scrolling if needed
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
                display="flex"

                justifyContent="center"
                alignItems="center"
            >
                <NewTaskComonent/>
            </Box>
    </>
)}