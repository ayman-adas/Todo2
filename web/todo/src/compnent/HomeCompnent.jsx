import React, { useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import ComponentSearch from "./SearchCompnent";
import Divider from '@mui/material/Divider';
import ProjectsCompnent from './project/ProjectsCompnent';
import io from "socket.io-client";
import MyClass from '../model/data_length'
const socket = io("http://localhost:4000"); // Replace with your server URL
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Snackbar from '@mui/material/Snackbar';

const HomeComponent = () => {
    var [ProjectName,] = useState("");
    var [isPrivate, setProfilePasword] = useState("");

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    var [refresh, setRefresh] = useState(false);
    console.log('refresh')
    const handleCreate = (e) => {
        console.log('create')
        e.preventDefault();
        console.log(ProjectName)
        console.log(isPrivate)
        console.log(localStorage.getItem("ProfileID"))
        if (ProjectName == '') {
            <Snackbar
                open={true}
                autoHideDuration={6000}
                message="please insert project name"
            />
        }
        else {
            socket.emit('send_data', {
                data: {
                    ProjectName: ProjectName,
                    isPrivate: isPrivate,
                    ProfileID: localStorage.getItem("ProfileID")
                }
            });

        }

    };

    useEffect(() => {

        // Emit 'home' event to request data
        // Listen for 'homeResponse' event
        socket.on("projects", (data) => {
            console.log(data)
            setProjects(data);
            //
            console.log("data" + data)
            console.log("my class" + MyClass.Length)
            console.log(data);




            console.log("Data received from server:", data);


        });

        // Cleanup on unmount
        return () => {
            socket.off("homeResponse");
        };
    }, [socket]); // Ensure that the effect runs only when `socket` changes
    useEffect(() => {
        // Effect to handle refresh logic if needed
        if (refresh) {
            console.log('Refresh logic executed');
            // Optionally re-fetch or handle refresh logic here
        }
    }, [refresh]); // Effect runs when refresh state changes

    const handleSignout = () => {
        console.log('Signout');

        localStorage.clear()
        navigate(`/`);
    };
    const handleAccountProfile = () => {
        console.log('profileAccount');

        navigate(`/profile`);
    };
    console.log("one", projects);

    return (
        <>
            <Stack direction="row" gap={10}>
                <Box marginTop={5} marginLeft={13} marginRight={30} width={100}>
                    <Button variant="contained" size="large" onClick={handleSignout} fullWidth autoFocus>
                        Signout
                    </Button>
                </Box>
                <Box marginTop={5} marginLeft={23} marginRight={30} width={100}>
                    <ComponentSearch />
                </Box>
                <div onClick={handleAccountProfile}>
                    <Box marginTop={0} marginLeft={50} marginRight={30} width={120}>
                        <AccountCircleIcon sx={{ fontSize: 130 }} />
                        <label style={{paddingLeft:25}}>Profiling Page</label>
                    </Box>
                </div>
            </Stack>
            <Divider component="li" />

            <Box width={200} paddingLeft={100}>
                <form>


                    <Box marginBottom={5} >
                        <Box display="flex"
                            justifyContent="center"
                            alignItems="center">  <h1> New Project </h1></Box>
                        <Box height={5}></Box>
                        <TextField

                            required
                            fullWidth
                            name="ProjectName"
                            label="Project Name"
                            type="text"
                            id="ProjectName"
                            autoComplete="ProjectName"
                            onChange={(e) => ProjectName = (e.target.value)}
                        />                    <Box height={5}></Box>

                        <FormLabel id="demo-row-radio-buttons-group-label">IS private</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="true" control={<Radio />} label="true" onChange={(e) => isPrivate = (e.target.value)} />
                            <FormControlLabel value="false" control={<Radio />} label="false" onChange={(e) => isPrivate = (e.target.value)} />

                        </RadioGroup>
                        <Box width={250} paddingRight={20}>
                            <Button variant="contained" size="large" type="submit" onClick={handleCreate} fullWidth autoFocus>
                                Create Project                    </Button>
                        </Box>

                    </Box>
                </form>
            </Box>
            <Divider component="li" />
            <Box display="flex" justifyContent="center" alignItems="center" paddingRight={15}>
                <h1>Projects List</h1>
            </Box>
            <Box marginTop={5} marginLeft={3} marginRight={15}  >
                <Grid container spacing={30} rowSpacing={20} columnSpacing={{ xs: 15, sm: 12, md: 13 }}>
                    {/* {projects.map((project, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>*/}
                            <ProjectsCompnent 
                                // key={index}
                                // ProjectName={project.ProjectName}
                                // Author={project.ProfileName}
                                // ProjectID={project.ProjectID}
                                ProjectName={'project.ProjectName'}
                                Author={'project.ProfileName'}
                                ProjectID={'project.ProjectID'}
                            />
                        </Grid>
                    {/* ))}
                </Grid> */}
            </Box>

        </>
    );
};

export default HomeComponent;
