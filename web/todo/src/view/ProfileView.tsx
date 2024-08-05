import React, { useEffect, useState } from "react";
import TodoAppBar from "../compnent/TodoAppBar";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import ProfileDataComponent from "../compnent/Profile/ProfileDataComponent";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import ProjectsCompnent from "../compnent/project/ProjectsCompnent";

export default function ProfileView() {
  const [projects, setProjects] = useState([]);
  var [MyProjects, setMyProjects] = useState([]);
  var [ProjectsCollaborate, setProjectsCollaborate] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    console.log("in effect");
    const fetchMyProjects = async () => {
      console.log(localStorage.getItem("ProfileID"));

      try {
        const response = await axios.get(
          "http://localhost:2003/project/myProjects",
          {
            params: {
              ProfileID: localStorage.getItem("ProfileID"),
            },
          }
        );
        console.log(response.data.message);
        setMyProjects(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Check if profileID is available before making the request
    fetchMyProjects();
  }, []);
  useEffect(() => {
    console.log("in effect");
    const fetchProjectsCollaborate = async () => {
      console.log(localStorage.getItem("ProfileID"));

      try {
        const response2 = await axios.get(
          "http://localhost:2003/project/retrive/collaborate",
          {
            params: {
              ProfileID: localStorage.getItem("ProfileID"),
            },
          }
        );
        console.log(response2.data.message);
        setProjectsCollaborate(response2.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Check if profileID is available before making the request
    fetchProjectsCollaborate();
  }, []);
  const CreateProjectPage = () => {
    console.log("project page");
    Navigate("/newProject");
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
        <Stack direction="row" paddingLeft={40}>
          <ProfileDataComponent />
        </Stack>
        <Divider />
        <h2
          style={{
            paddingLeft: 900,
          }}
        >
          My Projects
        </h2>
        <Box marginTop={5} marginLeft={15} marginRight={15}>
          <Grid
            container
            spacing={30}
            rowSpacing={20}
            columnSpacing={{ xs: 15, sm: 12, md: 13 }}
          >
            {MyProjects.map((project) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProjectsCompnent
                  ProjectID={project.ProjectID}
                  ProjectName={project.ProjectName}
                  Author={localStorage.getItem("ProfileName")}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box height={50}></Box>

        <Divider />
        <h2
          style={{
            paddingLeft: 820,
          }}
        >
          Projects That I Collaborate
        </h2>
        <Box marginTop={5} marginLeft={15} marginRight={15}>
          <Grid
            container
            spacing={30}
            rowSpacing={20}
            columnSpacing={{ xs: 15, sm: 12, md: 13 }}
          >
            {ProjectsCollaborate.map((project) => (
              <Grid item xs={12} sm={6} md={3}>
                <ProjectsCompnent
                  ProjectName={project.ProjectName}
                  Author={project.ProjectCreatedTime}
                  ProjectId={project.ProjectId}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
