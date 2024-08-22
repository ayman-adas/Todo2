import React from "react";
import TodoAppBar from "../compnent/TodoAppBar";
import HomeCompmonent from "../compnent/HomeCompnent";
import { Box } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import './home.css'
import HomeAppBar from "../compnent/HomeAppBar";
export default function HomeView() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Show the content after component mounts
    setShow(true);
  }, []);


  return (
    <>
      <HomeAppBar />
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
          width: "100vw", // Make sure it covers full viewport width
          height: "100vh", // Make sure it covers full viewport height
          position: "absolute", // Ensure it covers the entire viewport
          top: 0, // Align to the top
          left: 0, // Align
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
        <HomeCompmonent />
      </Box>
      </CSSTransition>

    </>
  );
}
