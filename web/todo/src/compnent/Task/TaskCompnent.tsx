import React from "react";
import { Box, Card, Divider, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Draggable from "react-draggable";

export default function TaskComponent({
  TaskName,
  TaskDescription,
  TaskImage,
  TaskDueDate,
}) {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        width: "100%",
        maxWidth: 250,
        margin: "0 auto",
        marginBottom: 20,
      }} // Centering and spacingnpm
    >
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
  
      ><div className="handle">
        <Card
          variant="outlined"
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 3,
            height: "auto",
            width: "100%",
            maxWidth: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            padding: 1,
          }}
        >
          <Paper
            sx={{
              backgroundColor: "white",
              padding: 2,

              width: "100%",
            }}
          >
            <img
              src={TaskName != null ? TaskImage : defaultImage}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 150,
                objectFit: "cover",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <Typography variant="h5" fontWeight="bold">
              {TaskName}
            </Typography>
          </Paper>
          <Divider sx={{ my: 1 }} />
        </Card>
        </div>
      </Draggable>
    </motion.div>
  );
}
