import React from 'react';
import { Box, } from "@mui/material";
import TodoAppBar from "../../compnent/TodoAppBar";
import LoginFomCompmonent from "../../compnent/Auth/LoginFomCompmonent"
import { CSSTransition } from "react-transition-group";
import './styles.css';

export default function LoginView() {
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        // Show the content after component mounts
        setShow(true);
      }, []);
    return (
        < >
            <TodoAppBar />
            <CSSTransition
        in={show}
        timeout={3000} // Duration of the animation
        classNames="fade"
        unmountOnExit
      >

            <Box
                sx={{
                    backgroundImage: `url("https://t4.ftcdn.net/jpg/07/05/56/21/360_F_705562152_WFSrWPNw6TqrxQ3MJzWzaZ1oeH3jLtUu.jpg")`,
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
          
          
                  }}
                display="flex"

                justifyContent="center"
                alignItems="center"
            >
                <LoginFomCompmonent />
            </Box>
            </CSSTransition>

        </>
    )
} 