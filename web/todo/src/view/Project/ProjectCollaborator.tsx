import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import ListCollaborate from "../../compnent/ProjectCollaborator/ListCollaborate";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ProjectCollaborator() {
  const location = useLocation();
  const data = location.state;
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('inside submit');
    console.log(data.ProjectID);
    console.log(email);

    try {
      const response = await axios.post(
        "http://localhost:2003/project/collabortors/insert",
        {
          ProjectID: data.ProjectID,
          ProfileEmail: email
        }
      );
      console.log(response.data.message + " response");
      window.location.reload();
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };

  return (
    <>
      <TodoAppBar />
      <Box
        sx={{
          backgroundImage: `url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149151738.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundAttachment: "fixed",
          overflow: "auto",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for readability
            borderRadius: 2,
            padding: 3,
            maxWidth: 600,
            width: '100%',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <h1>Project Collaborator Page</h1>
            <Box height={2}></Box>
            <h3>Project Collaborators</h3>
            <ListCollaborate />
            <Box height={3}></Box>
            <h3>Add Project Collaborator</h3>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="ProfileEmail"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button 
                variant="contained" 
                color="primary" 
                type="submit" 
                fullWidth
              >
                Add Collaborator
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
