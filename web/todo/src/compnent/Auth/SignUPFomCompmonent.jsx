import React, { useState } from "react";
import { Box, Container, Stack, TextField, Typography, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUpFormComponent() {
    const [profileEmail, setProfileEmail] = useState("");
    const [profilePassword, setProfilePassword] = useState("");
    const [profileName, setProfileName] = useState("");

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:2003/signUp", {
                profileName,
                profileEmail,
                profilePasword: profilePassword,
            })
            .then((result) => {
                localStorage.setItem('token', result.data.token);
                console.log("Register successfully:", result.data);
                navigate("/dialog");
            })
            .catch((err) => {
                console.error("Register error:", err.message);
            });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            color="white"

            p={3}
        >
            <Container
                maxWidth="xs"
                component="form"
                onSubmit={handleRegister}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor:"white"
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom color={"black"}>
                    Sign Up
                </Typography>

                <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="profileName"
                    autoComplete="name"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setProfileName(e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    type="email"

                    id="email"
                    label="Email Address"
                    name="profileEmail"
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
                    name="profilePassword"
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
                    Sign Up
                </Button>

                <Stack direction="row" spacing={1} mt={2} alignItems="center">
                    <Typography variant="body2" color={"black"}>Already have an account?</Typography>
                    <Link href="#" onClick={() => navigate("/login")}>
                        <Button variant="text">Login</Button>
                    </Link>
                </Stack>
            </Container>
        </Box>
    );
}
