import React, { useState } from "react";
import { Box, Container, Stack, TextField, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import APiService from "../../service/ApiService";

export default function LoginFormComponent() {
    const navigate = useNavigate();
    const [profileEmail, setProfileEmail] = useState("");
    const [profilePassword, setProfilePassword] = useState("");

    const handleLogin = async(e) => {
        e.preventDefault();
       await APiService.post("login",{
            loginEmail: profileEmail,
            loginPassword: profilePassword,
        })
            .then((result) => {
                console.log("Login successfully:", result);
                localStorage.setItem('ProfileID', result.ProfileID);
                localStorage.setItem('ProfileName', result.ProfileName);
                localStorage.setItem('ProfileEmail', result.ProfileEmail);
                localStorage.setItem('token', result.result);
                navigate("/");
            })
            .catch((err) => {
                console.error("Login error:", err.message);
            });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            color={"white"}
            p={3}
        >
            <Container
                maxWidth="xs"
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 5,
                    boxShadow:8,
                    backgroundColor:"white",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom color={"black"}>
                    Login
                </Typography>

                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setProfileEmail(e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setProfilePassword(e.target.value)}
                />

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>

                <Stack direction="row" spacing={1} mt={2} mb={2} alignItems="center">
                    <Typography variant="body2" color={"black"}>Don't have an account?</Typography>
                    <Link onClick={() => navigate("/signUp")}>
                        <Button variant="text">Sign Up</Button>
                    </Link>
                </Stack>

                <Link onClick={() => navigate("/forgetPassword")}>
                    Forgot Password?
                </Link>
            </Container>
        </Box>
    );
}
