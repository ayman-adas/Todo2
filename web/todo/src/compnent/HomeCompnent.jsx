import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider,Stack,TextField,RadioGroup ,FormControlLabel ,Radio ,Button  } from '@mui/material';
import ProjectsCompnent from './project/ProjectsCompnent';
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io("http://localhost:4000"); // Replace with your server URL

const HomeComponent = ({ searchQuery }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [projectName, setProjectName] = useState("");
    const [isPrivate, setIsPrivate] = useState("true");

    const handleCreate = (e) => {
        e.preventDefault();
        if (projectName.trim() === '') {
            setSnackbarMessage("Please insert project name");
            setOpenSnackbar(true);
            return;
        }
        socket.emit("send_data", {
            data: {
                ProjectName: projectName,
                isPrivate: isPrivate,
                ProfileID: localStorage.getItem("ProfileID")
            }
        });
    };
    useEffect(() => {
        // Set up the socket connection and fetch data
        const handleDataFetch = (data) => {
            setProjects(data);
            setFilteredProjects(data);
            setIsLoading(false); // Data fetched, hide loading
        };

        // Listen for data from the socket
        socket.on("projects", handleDataFetch);

        // Clean up the socket listener when the component unmounts
        return () => {
            socket.off("projects", handleDataFetch);
        };
    }, []);

    useEffect(() => {
        setFilteredProjects(
            projects.filter(project =>
                project.ProjectName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, projects]);

    return (
        <>
            
                <Box py={2} px={3} className="container" sx={{ pt: 10 }}>
                    <Divider />
                    <Divider />
                <Box mt={4}>
                    <Typography variant="h4" align="center" gutterBottom color={"white"} >
                        Add New Project
                    </Typography>
                    <Stack direction="row" spacing={20} component="form" onSubmit={handleCreate} p={2} border={2} borderColor="grey.300"
                        borderRadius={5} boxShadow={3} color={"white"} pl={3} >
                        <TextField

                            required
                            name="ProjectName"
                            label="Project Name"
                            type="text"
                            id="ProjectName"
                            autoComplete="ProjectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            margin="normal"
                            style={{ color: "white", backgroundColor: "white", width: 500 }}
                        />
                        <Box>
                            <h5 component="legend" sx={{ color: "white" }}
                            >Is Private</h5>
                            <RadioGroup
                                row
                                aria-labelledby="privacy-radio-group"
                                name="privacy"
                                value={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.value)}
                                margin="normal"
                                sx={{ color: "white", pl: 1 }}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="True" sx={{ color: "white", backgroundColor: "lightgrey", spacing: 1 }}
                                />
                                <FormControlLabel value="0" control={<Radio />} label="False" sx={{ color: "white", backgroundColor: "lightgrey" }} />
                            </RadioGroup>
                        </Box>
                        <Button variant="contained" size="large" type="submit" >
                            Create Project
                        </Button>

                    </Stack>
                </Box>
                <Divider />
                    <br />
                    <Typography variant="h4" align="center" gutterBottom color={"white"}>
                        Projects List
                    </Typography>
                    <Grid container spacing={3}>
                        {filteredProjects.map((project, index) => (
                            <Grid item key={index} xs={12} sm={6} md={3}>
                                <ProjectsCompnent
                                    ProjectName={project.ProjectName}
                                    Author={project.ProfileID}
                                    ProjectID={project.ProjectID}
                                    AuthorName={project.ProfileName}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
        </>
    );
};

export default HomeComponent;
