import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function UpdatePasswordFomCompmonent() {
    var [ProfilePasword] = useState("");
    var profileEmail = localStorage.getItem('ProfileEmail')
    const Navigate = useNavigate()

    const handleUpdate = (e) => {


        console.log('Update')
        e.preventDefault();
        console.log(ProfilePasword)
        console.log(profileEmail)

        axios
            .patch("http://localhost:2003/updatePassword", {
                ProfilePasword: ProfilePasword,
                ProfileEmail: localStorage.getItem('ProfileEmail')
            })
            .then((result) => {
                console.log("update pass successfully :", result.data);
                Navigate("/login");
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (

        <>

            <form >
                <Box marginBottom={14} >
                    <Box display="flex"
                        justifyContent="center"
                        alignItems="center">  <h1>Update password Page</h1></Box>
                    <TextField
                        required
                        fullWidth
                        id="ProfilePasword"
                        label="New Pasword"
                        name="ProfilePasword"
                        autoComplete="text"
                        autoFocus
                        onChange={(e) => ProfilePasword = (e.target.value)}
                    />
                    <Box height={35}></Box>

                    <TextField
                        required
                        fullWidth
                        name="resetPass"
                        label=" reset password"
                        type="password"
                        id="retry_password"

                    />





                    <Box marginTop={5}
                        marginLeft={30} marginRight={30} width={200}>
                        <Button variant="contained" size="large" type="submit" onClick={handleUpdate} fullWidth autoFocus>
                            Update Password
                        </Button>

                    </Box>

                </Box>
            </form>
        </>
    )
}