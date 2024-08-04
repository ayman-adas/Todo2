import React from "react";
import { Box, Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export default function NewProjectComonent() {
    var [ProjectName,] = useState("");
    var [isPrivate, setProfilePasword] = useState("");


    const Navigate = useNavigate()
    const handleCreate = (e) => {
        console.log('create')
        e.preventDefault();
        console.log(ProjectName)
        console.log(isPrivate)
        console.log(localStorage.getItem("ProfileID"))
        axios
            .post("http://localhost:2003/project/create", {
                ProjectName: ProjectName,
                isPrivate: isPrivate,
                ProfileID:localStorage.getItem("ProfileID")

            })
            .then((result) => {
                Navigate("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
            <form>


                <Box marginBottom={5} >
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">  <h1>Create New Project Page</h1></Box>
                    <Box height={35}></Box>
                    <TextField

                        required
                        fullWidth
                        name="ProjectName"
                        label="Project Name"
                        type="text"
                        id="ProjectName"
                        autoComplete="ProjectName"
                        onChange={(e) => ProjectName = (e.target.value)}
                    />                    <Box height={35}></Box>

<FormLabel id="demo-row-radio-buttons-group-label">IS private</FormLabel>
<RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
>
        <FormControlLabel value="true" control={<Radio />} label="true"  onChange={(e) => isPrivate = (e.target.value)}/>
        <FormControlLabel value="false" control={<Radio />} label="false"  onChange={(e) => isPrivate = (e.target.value)}/>
            </RadioGroup>
                    <Box ></Box>
                    <Box marginTop={5}
                        marginLeft={30} marginRight={30} width={100}>
                        <Button variant="contained" size="large" type="submit" onClick={handleCreate} fullWidth autoFocus>
                            Create Project                    </Button>
                    </Box>
                </Box>
            </form>

        </>
    )
}