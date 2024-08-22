import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, TextField, Snackbar, Typography, Divider } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ProjectsCompnent from './project/ProjectsCompnent';
import io from "socket.io-client";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io("http://localhost:4000"); // Replace with your server URL

const HomeComponent = () => {
    const [projectName, setProjectName] = useState("");
    const [isPrivate, setIsPrivate] = useState("true");
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            socket.emit('refresh', {}); // Custom event to trigger refresh on the server
        }
    }, [isFirstLoad]);

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
        socket.on("projects", (data) => {
            setProjects(data);
            setFilteredProjects(data);
        });

        return () => {
            socket.off("projects");
        };
    }, [socket]);

    // useEffect(() => {
    //     setFilteredProjects(
    //         projects.filter(project =>
    //             project.ProjectName.toLowerCase().includes(searchQuery.toLowerCase())
    //         )
    //     );
    // }, [searchQuery, projects]);


    return (
        <>
            <Box py={2} px={3} className="container" sx={{ pt: 10 }}>


                {/* Sign Out Button */}

                <Divider />
                <Box mt={4}>
                    <Typography variant="h4" align="center" gutterBottom color={"white"} >
                        Add New Project
                    </Typography>
                    <Stack direction="row" spacing={20} component="form" onSubmit={handleCreate}  p={2} border={2} borderColor="grey.300"
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
                            style={{ color: "white", backgroundColor: "white",width:500 }}
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
                            <FormControlLabel value="true" control={<Radio />} label="True" sx={{ color: "white", backgroundColor: "lightgrey", spacing:1 }}
                            />
                            <FormControlLabel value="false" control={<Radio />} label="False" sx={{ color: "white", backgroundColor: "lightgrey" }} />
                        </RadioGroup>
                        </Box>
                        <Button variant="contained" size="large" type="submit" >
                            Create Project
                        </Button>
                        
                    </Stack>
                </Box>
                <Divider   />
                <br></br>
                <Typography variant="h4" align="center" gutterBottom color={"white"}>
                    Projects List
                </Typography>
                <Grid container spacing={3}>
                    {filteredProjects.map((project, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <ProjectsCompnent
                                ProjectName={project.ProjectName}
                                Author={project.ProfileName}
                                ProjectID={project.ProjectID}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                action={
                    <Button color="inherit" onClick={() => setOpenSnackbar(false)}>
                        Close
                    </Button>
                }
            />
        </>
    );
};

export default HomeComponent;
