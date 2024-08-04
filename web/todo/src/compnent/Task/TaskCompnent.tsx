import React from "react";

import { Box, Card, Divider, Paper, Stack } from "@mui/material";

export default function TaskCompnent({ TaskName, TaskDescription, TaskImage, TaskDueDate}) {
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";

  return (<>
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
    </>
  );
}
