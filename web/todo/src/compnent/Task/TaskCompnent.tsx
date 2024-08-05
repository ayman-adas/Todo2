import React from "react";

import { Box, Card, Divider, Paper, Stack } from "@mui/material";
import { motion } from "framer-motion";

export default function TaskCompnent({ TaskName, TaskDescription, TaskImage, TaskDueDate}) {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";
console.log(TaskImage)
  return (<>
  <Box display="flex" flexWrap="wrap" gap={2}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 * 0.1 }} // Staggered animation
          style={{
            width: 200,
            height: 300,
            backgroundColor: '#f0f0f0',
            borderRadius: 8,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >

        <Card variant="outlined" sx={{ backgroundColor: "ButtonFace", height:250 ,width:200 }}>

    <Paper sx={{ backgroundColor: "silver" }}>
      <Stack direction="row" spacing={1}>
        <h3> Task Name:</h3>
        <h3> {TaskName}</h3>
      </Stack>
     <Box height={20}></Box>
    <div>  <img src={TaskImage || defaultImage} width={150}  height={150} sizes="covers" /></div>
    <Box height={20}></Box>

      <label>Due To Date: {TaskDueDate}</label>
    </Paper>
    <Divider component="li" />
    </Card>

    <Box> </Box>
    </motion.div>
      
    </Box>
    </>

  );
}
