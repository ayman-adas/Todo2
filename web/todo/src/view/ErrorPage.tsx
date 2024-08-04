// src/components/ErrorPage.tsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <Typography variant="h3" component="h1" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go to Home
            </Button>
        </Box>
    );
};

export default ErrorPage;
