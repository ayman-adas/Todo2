import React, { useEffect, useState } from "react";
import { Box, Button, Divider, FormControlLabel, Paper, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCompnent from "../Task/TaskCompnent";
import Board from "../../dnd/board/Board";
import { generateQuoteMap } from "../../dnd/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import NewTaskComponent from "../Task/AddTaskComponent";
import ProjectCollaborator from "../../view/Project/ProjectCollaborator";

export default function ProjectPageCompnent({}) {
  const location = useLocation();
  const data = location.state;
  const Navigate = useNavigate();
  const [isPrivate, setIsPrivate] = useState(data.isPrivate);
  const [projectName, setProjectName] = useState(data.ProjectName);

  // Callback function to update project name in the parent component
  const updateProjectName = (newName) => {
    setProjectName(newName);
    Navigate(`/profile`, { state: data });
  };

  const handleNewTask = () => {
    Navigate(`/Createtask`, { state: data });
  };

  const handleCollaborate = () => {
    Navigate(`/collaborator`, { state: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/project/tasks/retrive",
          {
            params: { ProjectID: data.ProjectID },
          }
        );
        // setTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [data.ProjectID]);
  const handleDeleteProject = async () => {
    try {
      console.log(data.ProjectID + "id");
      const response = await axios.delete(
        "http://localhost:2003/project/delete",
        {
          data: { ProjectID: data.ProjectID },
        }
      );
      console.log(response.status);
      Navigate(`/profile`, { state: data });

      // setTasks(response.data.message); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  const handleUpdateStatus = async () => {
    try {
      console.log(data.ProjectID + "id");
      console.log(isPrivate+ "status");

      const response = await axios.patch(
        "http://localhost:2003/project/update/status",
        {
          ProjectID: data.ProjectID,status:isPrivate,
        }
      );
      console.log(response.status);
      Navigate(`/profile`, { state: data });

      // setTasks(response.data.message); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  return (
    <>
    
      {data.Author == localStorage.getItem("ProfileID") ? (
        <Stack direction="row" spacing={10} paddingBottom={152}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={3}
            paddingTop={10}
          >
            <Box pr={20}>
              <NewTaskComponent />
            </Box>
            <Board data={{ ...data,  }} onUpdateProjectName={updateProjectName} ProjectName={projectName}  />
            </Box>
          <Box pr={50}>
            <ProjectCollaborator data={data} />
            <Box sx={{ pt: 5, pr: 10 }}>
    <Paper elevation={3} sx={{ padding: 3, backgroundColor: "#2c2c2c", borderRadius: 2 }}>
        <Stack direction="row" spacing={4} alignItems="center">
            <Typography variant="h5" style={{ color: "wheat", paddingLeft:10}}>
                Update Project Status
            </Typography>
            <RadioGroup
                row
                aria-labelledby="privacy-radio-group"
                name="privacy"
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.value)}
                sx={{ pl: 2 }}
            >
                <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="True"
                    sx={{
                        color: "white",
                        '.MuiRadio-root': { color: 'lightgrey' },
                        '&.Mui-checked': { color: 'white' },
                    }}
                />
                <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="False"
                    sx={{
                        color: "white",
                        '.MuiRadio-root': { color: 'lightgrey' },
                        '&.Mui-checked': { color: 'white' },
                    }}
                />
            </RadioGroup>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#007bff',
                    '&:hover': {
                        backgroundColor: '#0056b3',
                    },
                }}
                onClick={handleUpdateStatus}
            >
                Update
            </Button>
        </Stack>
    </Paper>
</Box>              <br></br>

              <h3 style={{ fontStyle: "Bold", color: "wheat" }}>
                Delete Project
              </h3>
              <Button
                sx={{ backgroundColor: "red", width: 500, color: "white"  }}
                onClick={handleDeleteProject}
              >
                Delete Project
              </Button>
            </Box>
        </Stack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={3}
          paddingTop={10}
        >
          <Stack direction={"row"} spacing={10}>
            <Box pl={50} pt={10}>
            <Board data={{ ...data,  }} onUpdateProjectName={updateProjectName} ProjectName={projectName}  />
            </Box>
            <Box pt={10} pr={10}>
              <ProjectCollaborator data={data} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
}
