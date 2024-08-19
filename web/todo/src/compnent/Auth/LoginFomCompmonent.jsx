import React, { useState } from "react";
import { Box, Container, Stack, TextField, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginFormComponent() {
    const navigate = useNavigate();
    const [profileEmail, setProfileEmail] = useState("");
    const [profilePassword, setProfilePassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:2003/login", {
                loginEmail: profileEmail,
                loginPassword: profilePassword,
            })
            .then((result) => {
                console.log("Login successfully:", result.data);
                localStorage.setItem('ProfileID', result.data.ProfileID);
                localStorage.setItem('ProfileName', result.data.ProfileName);
                localStorage.setItem('ProfileEmail', result.data.ProfileEmail);
                localStorage.setItem('token', result.data.result);
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
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
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
                    <Typography variant="body2">Don't have an account?</Typography>
                    <Link href="#" onClick={() => navigate("/signUp")}>
                        <Button variant="text">Sign Up</Button>
                    </Link>
                </Stack>

                <Link href="#" onClick={() => navigate("/forgetPassword")}>
                    Forgot Password?
                </Link>
            </Container>
        </Box>
    );
}
