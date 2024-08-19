import React, { useState } from "react";
import { Box, Stack, TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function NewProjectComponent() {
    const [projectName, setProjectName] = useState("");
    const [isPrivate, setIsPrivate] = useState("true"); // Default value set to "true"
    const navigate = useNavigate();

    const handleCreate = (e) => {
        e.preventDefault();

        axios.post("http://localhost:2003/project/create", {
            ProjectName: projectName,
            isPrivate: isPrivate,
            ProfileID: localStorage.getItem("ProfileID"),
        })
        .then((result) => {
            navigate("/");
        })
        .catch((err) => {
            console.error("Error creating project:", err.message);
        });
    };

    return (
        <Box component="form" onSubmit={handleCreate} sx={{ maxWidth: 600, mx: 'auto', my: 4, p: 3, borderRadius: 1, boxShadow: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create New Project
            </Typography>

            <TextField
                required
                fullWidth
                label="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                sx={{ mb: 2 }}
            />

            <FormLabel sx={{ mb: 1 }}>Is Private</FormLabel>
            <RadioGroup
                row
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.value)}
                sx={{ mb: 2 }}
            >
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
            </RadioGroup>

            <Button variant="contained" type="submit" fullWidth>
                Create Project
            </Button>
        </Box>
    );
}
