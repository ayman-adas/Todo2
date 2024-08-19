import React from "react";
import { Box, Card, Divider, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function TaskComponent({ TaskName, TaskDescription, TaskImage, TaskDueDate }) {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ width: '100%', maxWidth: 250, margin: '0 auto', marginBottom: 20 }} // Centering and spacing
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
          height: 'auto',
          width: '100%',
          maxWidth: 250,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: 1,
        }}
      >
        <Paper
          sx={{
            backgroundColor: "white",
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack direction="column" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">Task Name</Typography>
            <Typography variant="h5" fontWeight="bold">{TaskName}</Typography>
          </Stack>
          <img
            src={TaskImage || defaultImage}
            alt={TaskName}
            style={{ width: '100%', height: 'auto', maxHeight: 150, objectFit: 'cover', borderRadius: 4 }}
          />
          <Box mt={2}>
            <Typography variant="body1" color="textSecondary">Due Date: {TaskDueDate}</Typography>
          </Box>
        </Paper>
        <Divider sx={{ my: 1 }} />
      </Card>
    </motion.div>
  );
}
