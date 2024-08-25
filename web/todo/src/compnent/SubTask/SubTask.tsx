import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
export default function SubTask({ taskID }) {
  const [subTasks, setsubTasks] = useState([]);

  useEffect(() => {
    const fetchSubTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/tasks/subTasks/retrive",
          {
            params: { taskID: taskID },
          }
        );
        console.log(response.data.message);
        setsubTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchSubTasks();
  }, []);

  return <>
{subTasks.map((subTask, index) => (
        <Box key={index} p={2} border={1} borderColor="grey.300" borderRadius={1}>
          <Stack direction="row" spacing={2}>
            <Typography variant="body1">{subTask.subTaskName}</Typography>
            <Typography variant="body2">{subTask.priority}</Typography>
            <Typography variant="body2">{subTask.endDate}</Typography>
          </Stack>
        </Box>
      ))} </>;
}
