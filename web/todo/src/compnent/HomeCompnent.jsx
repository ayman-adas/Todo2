import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, TextField, Snackbar, Typography, Divider } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import ComponentSearch from "./SearchCompnent";
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
    const [searchQuery, setSearchQuery] = useState("");
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
            <Box py={2} px={3} className="container">
            
        <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{
                p: 2,
                mb: 4,
                backgroundColor: 'grey',
                borderRadius: 2,
                boxShadow: 3,
                justifyContent: 'space-between',
            }}
        >
            {/* Sign Out Button */}
            <Button
                variant="contained"
                size="large"
                onClick={handleSignout}
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderRadius: 1,
                    boxShadow: 2,
                    '&:hover': {
                        bgcolor: 'primary.dark',
                        boxShadow: 4,
                    },
                }}
            >
                Sign Out
            </Button>

            {/* Search Component */}
            <Box
                sx={{
                    flexGrow: 1,
                    p: 1,
                    borderRadius: 1,
                    boxShadow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'background.paper',
                }}
            >
                <ComponentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Box>

            {/* Profile Box */}
            <Box
                onClick={handleAccountProfile}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                    boxShadow: 2,
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        backgroundColor: 'grey.100',
                        boxShadow: 4,
                    },
                }}
            >
                <AccountCircleIcon sx={{ fontSize: 120, mb: 1 }} />
                <Typography variant="h6" textAlign="center">
                    Profile
                </Typography>
            </Box>
        </Stack>
                <Divider />
                <Box mt={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        New Project
                    </Typography>
                    <Box component="form" onSubmit={handleCreate} mt={2} p={2} border={1} borderColor="grey.300" borderRadius={2} boxShadow={3}>
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
                            margin="normal"
                        />
                        <FormLabel component="legend">Is Private</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="privacy-radio-group"
                            name="privacy"
                            value={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.value)}
                            margin="normal"
                        >
                            <FormControlLabel value="true" control={<Radio />} label="True" />
                            <FormControlLabel value="false" control={<Radio />} label="False" />
                        </RadioGroup>
                        <Button variant="contained" size="large" type="submit" fullWidth>
                            Create Project
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Typography variant="h4" align="center" gutterBottom>
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
