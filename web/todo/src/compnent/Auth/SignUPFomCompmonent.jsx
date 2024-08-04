import React from "react";
import { Box, Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUPFomCompmonent() {
    var [ProfileEmail,] = useState("");
    var [ProfilePasword, setProfilePasword] = useState("");
    var [profileName, setprofileName] = useState("");


    const Navigate = useNavigate()
    const handleRegister = (e) => {
        console.log('register')
        e.preventDefault();
        console.log(ProfileEmail)
        console.log(ProfilePasword)
        console.log(profileName)
        axios
            .post("http://localhost:2003/signUp", {
                profileName: profileName,
                ProfileEmail: ProfileEmail,
                ProfilePasword: ProfilePasword,

            })
            .then((result) => {
                localStorage.setItem('token',result.data.token)
                console.log(result.data.token)

                console.log("register successfully :", result.data);
                Navigate("/dialog");
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
                        alignItems="center">  <h1>Sign Up Page</h1></Box>
                    <Box height={35}></Box>
                    <TextField

                        required
                        fullWidth
                        name="profileName"
                        label="username"
                        type="text"
                        id="username"
                        autoComplete="account"
                        onChange={(e) => profileName = (e.target.value)}
                    />                    <Box height={35}></Box>

                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="ProfileEmail"
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => ProfileEmail = (e.target.value)}

                    />
                    <Box height={35}></Box>
                    <TextField
                        required
                        fullWidth
                        name="ProfilePasword"
                        label="Password"
                        type="password"
                        id="ProfilePasword"
                        autoComplete="current-password"
                        onChange={(e) => ProfilePasword = (e.target.value)}
                    />                    <Box height={35}></Box>

                    {/* <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                /> */}

                    <Box ></Box>
                    <Box marginTop={5}
                        marginLeft={30} marginRight={30} width={200}>
                        <Button variant="contained" size="large" type="submit" onClick={handleRegister} fullWidth autoFocus>
                            SignUp                    </Button>
                    </Box>
                    <Box height={35}></Box>
                    <Stack direction="row" gap={0}>
                        <h3>have an account: </h3>
                        <Button variant="text" size="large" onClick={() => Navigate("/login")} autoFocus>
                            Login</Button>
                    </Stack>
                </Box>s
            </form>

        </>
    )
}