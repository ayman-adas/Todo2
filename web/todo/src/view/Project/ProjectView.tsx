import React from "react";
import { Box, Button, Stack } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import LoginFomCompmonent from "../../compnent/Auth/LoginFomCompmonent";
import ProjectPageCompnent from "../../compnent/project/ProjectPageCompnent";
import { useNavigate } from "react-router-dom";

export default function ProjectView() {
    const Navigate = useNavigate()

    const handleNewTask = () => {
        console.log('profileAccount');

        Navigate(`/project/Createtask`);
    };
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
        <Stack direction="row" spacing={0} paddingTop={10} paddingLeft={10}>
          <Button variant="contained">Add New Collaborator</Button>
          <Button variant="contained" sx={{ marginLeft: 150 }} onClick={handleNewTask}>
            Add New Tasks
          </Button>
        </Stack>
        <ProjectPageCompnent />
      </Box>
    </>
  );
}
