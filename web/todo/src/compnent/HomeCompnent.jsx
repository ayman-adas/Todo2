import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import ProjectsCompnent from './project/ProjectsCompnent';
import io from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io("http://localhost:4000"); // Replace with your server URL

const HomeComponent = ({ searchQuery }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state

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
