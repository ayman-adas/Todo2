import React, { useState } from "react";
import { Box, Container, TextField, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPasswordFormComponent() {
    const [profileEmail, setProfileEmail] = useState("");
    const [passwordCode, setPasswordCode] = useState("");

    const navigate = useNavigate();

    const handleForget = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:2003/forgetPassword", {
                profileEmail,
                passwordCode,
            })
            .then((result) => {
                localStorage.setItem('ProfileEmail', profileEmail);
                console.log("Password reset initiated successfully:", result.data);
                navigate("/updatePassword");
            })
            .catch((err) => {
                console.error("Error during password reset:", err.message);
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
                onSubmit={handleForget}
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Forget Password
                </Typography>

                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="profileEmail"
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setProfileEmail(e.target.value)}
                />

                <TextField
                    required
                    fullWidth
                    id="passwordCode"
                    label="Password Code"
                    name="passwordCode"
                    type="text"
                    autoComplete="off"
                    margin="normal"
                    variant="outlined"
                    onChange={(e) => setPasswordCode(e.target.value)}
                />

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    sx={{ mt: 3 }}
                >
                    Reset Password
                </Button>

                <Stack direction="row" spacing={1} mt={2} alignItems="center">
                    <Typography variant="body2">Remembered your password?</Typography>
                    <Button variant="text" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
