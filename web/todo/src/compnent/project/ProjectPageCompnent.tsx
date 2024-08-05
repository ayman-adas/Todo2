import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Paper, Stack } from "@mui/material";
import {  useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCompnent from "../Task/TaskCompnent";

export default function ProjectPageCompnent() {
  const location = useLocation();
  const data = location.state;
  var [Tasks, setTasks] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const Navigate = useNavigate()

  const handleNewTask = () => {
    console.log('profileAccount');

    Navigate(`/Createtask`,{ state: data });
};
const handleCollaborate = () => {
  console.log('profileAccount');

  Navigate(`/collaborator`,{ state: data });
};

  useEffect(() => {
    console.log("in effect");
    console.log(data.ProjectID);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/project/tasks/retrive",
          {
            params: {
              ProjectID: data.ProjectID,
            },
          }
        );
        console.log(response.data.message + " response");
        setTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    // Check if profileID is available before making the request
    fetchData();
    const tasksStatus0 = Tasks.filter((task) => task.taskStatus === 0);
    const tasksStatus1 = Tasks.filter((task) => task.taskStatus === 1);
    const tasksStatus2 = Tasks.filter((task) => task.taskStatus === 2);

    // Log the filtered tasks
    console.log("Tasks with status 0:", tasksStatus0);
    console.log("Tasks with status 1:", tasksStatus1);
    console.log("Tasks with status 2:", tasksStatus2);
    console.log(isVisible)
  }, []);
  return (<>
 { data.Author==localStorage.getItem('ProfileName')?
   <Stack direction="row" spacing={0} paddingTop={10} paddingLeft={10}>
          <Button variant="contained" onClick={handleCollaborate}> Project Collaborator </Button>
          <Button variant="contained" sx={{ marginLeft: 150 }} onClick={handleNewTask}>
            Add New Tasks
          </Button>
        </Stack>:<li></li>}
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingLeft={30}
      paddingTop={10}
    >
      <Stack direction="row" spacing={10}>
        <Box
          sx={{
            width: 500,
            maxHeight: 500,
            overflow: "auto",
            "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar in Webkit browsers
            },
          }}
        >
          <h1>To DO</h1>
          {Tasks.filter((task) => task.taskStatus == 0).map((task, index) => (
            <TaskCompnent
              key={index}
              TaskName={task.TaskName}
              TaskDescription={task.TaskDescription}
              TaskImage={task.TaskImage}
              TaskDueDate={task.TaskDueDate}
            />
          ))}
        </Box>
        <Box sx={{ width: 500, maxHeight: 500, overflow: "auto" , "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar in Webkit browsers
            },}}>
          <h1> Is Doing</h1>
          {Tasks.filter((task) => task.taskStatus == 1).map((task, index) => (
            <TaskCompnent
              key={index}
              TaskName={task.TaskName}
              TaskDescription={task.TaskDescription}
              TaskImage={task.TaskImage}
              TaskDueDate={task.TaskDueDate}
            />
          ))}
        </Box>
        <Box sx={{ width: 500, maxHeight: 500, overflow: "auto", "&::-webkit-scrollbar": {
              display: "none", // Hide scrollbar in Webkit browsers
            }, }}>
          <h1>Is Done</h1>
          {Tasks.filter((task) => task.taskStatus == 2).map((task, index) => (
            <TaskCompnent
              key={index}
              TaskName={task.TaskName}
              TaskDescription={task.TaskDescription}
              TaskImage={task.TaskImage}
              TaskDueDate={task.TaskDueDate}
            />
          ))}
        </Box>
      </Stack>
    </Box>
    </>
  );
}
