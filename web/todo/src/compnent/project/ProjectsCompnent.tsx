import React, { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import "./grid.css"
import { motion } from "framer-motion";

export default function ProjectsComponent({ ProjectName, Author, ProjectID }) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleProject = () => {
    console.log(ProjectID + "iud");

    const data = {
      ProjectName: ProjectName,
      Author: Author,
      ProjectID: ProjectID,
    };
    navigate("/project", { state: data });
  };

  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={2}>
    {Array.from({ length: 12 }).map((_, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 ,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
    <Typography
      component={"span"}
      variant={"body2"}
      onClick={handleProject}
      sx={{
        width: 250,
        height: 250,
        margin: 1,
        '&:hover': {
    textDecoration: 'underline',
}
      }}
      
    >
      <Card variant="outlined" sx={{ width: 150, // Adjust width as needed
        height: 150, // Adjust height as needed
        margin: 2,
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        background: "linear-gradient(to bottom right, #ff6f61, #ffb74d)", // Gradient background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        position: 'relative',
        color: '#fff', // Text color for better contrast on gradient
        }  }>
            <h3>Task Name</h3>
        <h3 > {ProjectName}</h3>
       
      </Card>
    </Typography>
    </motion.div>
       ))}
    </Box>
  );
}
