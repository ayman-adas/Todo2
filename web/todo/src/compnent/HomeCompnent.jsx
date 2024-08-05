import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, TextField, Snackbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import ComponentSearch from "./SearchCompnent";
import Divider from '@mui/material/Divider';
import ProjectsCompnent from './project/ProjectsCompnent';
import io from "socket.io-client";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

const socket = io("http://localhost:4000"); // Replace with your server URL

const HomeComponent = () => {
    const [projectName, setProjectName] = useState("");
    const [isPrivate, setIsPrivate] = useState("true");
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const navigate = useNavigate();

    // Use effect to simulate a one-time refresh
    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            // Trigger refresh logic here, such as re-fetching data
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

        socket.emit('send_data', {
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

    useEffect(() => {
        setFilteredProjects(
            projects.filter(project =>
                project.ProjectName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, projects]);

    const handleSignout = () => {
        localStorage.clear();
        navigate(`/`);
    };

    const handleAccountProfile = () => {
        navigate(`/profile`);
    };

    return (
        <>
            <Stack direction="row" gap={10}>
                <Box marginTop={5} marginLeft={13} marginRight={30} width={100}>
                    <Button variant="contained" size="large" onClick={handleSignout} fullWidth autoFocus>
                        Signout
                    </Button>
                </Box>
                <Box marginTop={5} marginLeft={23} marginRight={30} width={100}>
                    <ComponentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </Box>
                <div onClick={handleAccountProfile}>
                    <Box marginTop={0} marginLeft={50} marginRight={30} width={120}>
                        <AccountCircleIcon sx={{ fontSize: 130 }} />
                        <label style={{ paddingLeft: 25 }}>Profiling Page</label>
                    </Box>
                </div>
            </Stack>
            <Divider component="li" />

            <Box width={200} paddingLeft={100}>
                <form onSubmit={handleCreate}>
                    <Box marginBottom={5}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <h1>New Project</h1>
                        </Box>
                        <Box height={5}></Box>
                        <TextField
                            required
                            fullWidth
                            name="ProjectName"
                            label="Project Name"
                            type="text"
                            id="ProjectName"
                            autoComplete="ProjectName"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                        <Box height={5}></Box>
                        <FormLabel id="demo-row-radio-buttons-group-label">Is Private</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.value)}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="True" />
                            <FormControlLabel value="false" control={<Radio />} label="False" />
                        </RadioGroup>
                        <Box width={250} paddingRight={20}>
                            <Button variant="contained" size="large" type="submit" fullWidth autoFocus>
                                Create Project
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
            <Divider component="li" />
            <Box display="flex" justifyContent="center" alignItems="center" paddingRight={15}>
                <h1>Projects List</h1>
            </Box>
            <Box marginTop={5} marginLeft={3} marginRight={15}>
                <Grid container spacing={30} rowSpacing={20} columnSpacing={{ xs: 15, sm: 12, md: 13 }}>
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
            />
        </>
    );
};

export default HomeComponent;
