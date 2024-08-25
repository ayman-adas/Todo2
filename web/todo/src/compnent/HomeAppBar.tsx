import React from "react";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import ComponentSearch from "./SearchCompnent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function HomeAppBar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAccountProfile = () => {
    navigate("/profile");
  };
  return (
    <AppBar sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar sx={{ padding: "0 8px" }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSignout}
          sx={{
            backgroundColor: "black",
            color: "white",
            borderRadius: 1,
            boxShadow: 2,
            "&:hover": {
              bgcolor: "primary.dark",
              boxShadow: 4,
            },
          }}
        >
          Sign Out
        </Button>
        {/* Search Component */}
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
            display: "flex",
            alignItems: "center",
            paddingLeft: 70,
          }}
        >
          <ComponentSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>

        {/* Profile Box */}
        <Box
          onClick={handleAccountProfile}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            p: 2,
            borderRadius: 2,
            backgroundColor: "black",
            boxShadow: 2,
            transition: "background-color 0.3s, box-shadow 0.3s",
            "&:hover": {
              backgroundColor: "grey.100",
              boxShadow: 4,
            },
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 120, mb: 1, height: 20 }} />
          <Typography variant="h6" textAlign="center">
            Profile
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
