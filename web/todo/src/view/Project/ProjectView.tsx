import React from "react";
import { Box, Button, Stack } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import LoginFomCompmonent from "../../compnent/Auth/LoginFomCompmonent";
import ProjectPageCompnent from "../../compnent/project/ProjectPageCompnent";
import { useNavigate } from "react-router-dom";

export default function ProjectView() {
    const Navigate = useNavigate()

   
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
      >
       
        <ProjectPageCompnent />
      </Box>
    </>
  );
}
