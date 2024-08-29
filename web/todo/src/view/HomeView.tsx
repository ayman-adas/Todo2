import React from "react";
import HomeAppBar from "../compnent/HomeAppBar";
import HomeComponent from "../compnent/HomeCompnent";
import { Box } from "@mui/material";
import { CSSTransition } from "react-transition-group";

export default function HomeView() {
  const [show, setShow] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(""); // State to hold the search query

  React.useEffect(() => {
    setShow(true); // Trigger the animation after the component mounts
  }, []);

  return (
    <>
      <HomeAppBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> {/* Pass down searchQuery */}
      <CSSTransition
        in={show}
        timeout={1000} // Duration of the animation
        classNames="fade"
        unmountOnExit
      >
        <Box
          sx={{
            backgroundImage: `url("https://img.freepik.com/free-vector/gradient-black-background-with-wavy-lines_23-2149151738.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100vw", // Cover full viewport width
            height: "100vh", // Cover full viewport height
            position: "absolute", // Ensure it covers the entire viewport
            top: 0, 
            left: 0,
            right: 0,
            bottom: 0,
            backgroundAttachment: "fixed",
            overflow: "auto", // Allow scrolling
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar in Webkit browsers
            },
            "-ms-overflow-style": "none", // Hide scrollbar in IE and Edge
            "scrollbar-width": "none", // Hide scrollbar in Firefox
          }}
        >
          <HomeComponent searchQuery={searchQuery} /> {/* Pass searchQuery to HomeComponent */}
        </Box>
      </CSSTransition>
    </>
  );
}
