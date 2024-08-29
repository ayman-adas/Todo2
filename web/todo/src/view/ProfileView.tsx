import React, { useEffect, useState } from "react";
import TodoAppBar from "../compnent/TodoAppBar";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import ProfileDataComponent from "../compnent/Profile/ProfileDataComponent";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import ProjectsCompnent from "../compnent/project/ProjectsCompnent";
import { LIMIT } from "styled-components/dist/utils/createWarnTooManyClasses";
import "bootstrap/dist/css/bootstrap.css";
import TaskComponent from "../compnent/Task/TaskCompnent";
import APiService from "../service/ApiService";

export default function ProfileView() {
  const [projects, setProjects] = useState([]);
  var [MyProjects, setMyProjects] = useState([]);
  var [ProjectsCollaborate, setProjectsCollaborate] = useState([]);
  var [PageNumber, setPageNumber] = useState(0);
  var [TasksCollaborate, setTasksCollaborate] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    console.log("in effect");
    const fetchMyProjects = async () => {
      console.log(localStorage.getItem("ProfileID"));

      try {
        const response = await APiService.get(
          "project/myProjects",
          {
          
              ProfileID: localStorage.getItem("ProfileID"),
              limit: 50,
              offset: PageNumber,
            
          }
        );
        console.log(response);
        setMyProjects(response); // Adjust based on response structure
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
        const response2 = await APiService.get(
          "project/retrive/collaborate",
          {
              profileID: localStorage.getItem("ProfileID"),
              limit: 100,
              offset: 0,
          }
        );
        console.log(response2);
        setProjectsCollaborate(response2); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Check if profileID is available before making the request
    fetchProjectsCollaborate();
  }, []);
  useEffect(() => {
    console.log("in effect");
    const fetchTasksCollaborating = async () => {
      console.log(localStorage.getItem("ProfileID"));

      try {
        const response = await APiService.get(
          "task/collaborate/retrive",
          {
           
              ProfileID: localStorage.getItem("ProfileID"),
              limit: 50,
              offset: PageNumber,
        
          }
        );
        console.log(response);
        setTasksCollaborate(response); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    // Check if profileID is available before making the request
    fetchTasksCollaborating();
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
        }}
      >
        <Stack direction="row" paddingLeft={40} className="row">
          <ProfileDataComponent />
        </Stack>
        <Divider />
        <h2 className="text-center my-4" style={{ color: "white" }}>
          My Projects
        </h2>
        <Box py={2} px={3} className="container">
          <Grid container spacing={3}>
            {MyProjects.map(function (project, index) {
              const {ProjectID,ProjectName,ProfileID,isPrivate}=project
              return (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <ProjectsCompnent
                    ProjectID={ProjectID}
                    ProjectName={ProjectName}
                    Author={ProfileID}
                    AuthorName={localStorage.getItem("ProfileName")}
                    isPrivate={isPrivate} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        <Box height={50}></Box>

        <Divider />
        <h2 className="text-center my-4" style={{ color: "white" }}>
          Projects That I Collaborate
        </h2>
        <span className="container-fluid">
          <Box className="container" sx={{}}>
            <Grid container spacing={3}>
              {ProjectsCollaborate.map(function (project, index) {
                              const {ProjectID,ProjectName,ProfileID,ProfileName,isPrivate}=project

                return (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <ProjectsCompnent
                      ProjectID={ProjectID}
                      ProjectName={ProjectName}
                      Author={ProfileID}
                      AuthorName={ProfileName}
                      isPrivate={isPrivate} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <Box height={50}></Box>

        <Divider />
          <h2 className="text-center my-4" style={{ color: "white" }}>
          Tasks That I Collaborate
        </h2>
        </span>
        <span className="container-fluid">
          <Box className="container" sx={{}}>
            <Grid container spacing={3}>
              {TasksCollaborate.map((task, index) => (
                <Grid item key={index} xs={12} sm={6} md={3}>
                  <TaskComponent data={task} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </span>
      </Box>
    </>
  );
}
