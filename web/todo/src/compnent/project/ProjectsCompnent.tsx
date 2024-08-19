import React, { useEffect, useState } from "react";
import { Box, Typography, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      className="p-3"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="d-flex align-items-center justify-content-center"
      >
        <Typography
          component={"span"}
          variant={"body2"}
          onClick={handleProject}
          sx={{
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            margin: 1,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
              transform: 'scale(1.05)',
              transition: 'transform 0.3s ease-in-out',
            },
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              background: "linear-gradient(to bottom right, #007bff, #6c757d)", // Bootstrap primary and secondary colors
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              overflow: 'hidden',
              color: '#fff', // White text for contrast
              padding: 2,
              '&:hover': {
                background: "linear-gradient(to bottom right, #0056b3, #343a40)", // Darker gradient on hover
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              {ProjectName}
            </Typography>
            <Typography variant="body2">
              {Author}
            </Typography>
          </Card>
        </Typography>
      </motion.div>
    </Box>
  );
}
