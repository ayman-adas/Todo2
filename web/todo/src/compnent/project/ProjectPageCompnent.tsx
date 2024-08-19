import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCompnent from "../Task/TaskCompnent";

export default function ProjectPageCompnent() {
  const location = useLocation();
  const data = location.state;
  const [Tasks, setTasks] = useState([]);
  const Navigate = useNavigate();

  const handleNewTask = () => {
    Navigate(`/Createtask`, { state: data });
  };

  const handleCollaborate = () => {
    Navigate(`/collaborator`, { state: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:2003/project/tasks/retrive", {
          params: { ProjectID: data.ProjectID },
        });
        setTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [data.ProjectID]);

  return (
    <>
 { data.Author==localStorage.getItem('ProfileName')?      (
        <Stack direction="row" spacing={2} padding={3} justifyContent="center" paddingTop={12}>
          <Button variant="contained" onClick={handleCollaborate} sx={{ backgroundColor: '#00796b', '&:hover': { backgroundColor: '#004d40' } }}>
            Project Collaborator
          </Button>
          <Button variant="contained" onClick={handleNewTask} sx={{ backgroundColor: '#0288d1', '&:hover': { backgroundColor: '#01579b' } }}>
            Add New Task
          </Button>
        </Stack>
      ):<li></li>}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
        padding={3}paddingTop={10}
      >
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: 320,
              maxHeight: 500,
              overflow: "auto",
              bgcolor: '#e0f7fa',
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
              '&::-webkit-scrollbar': { display: "none" }, // Hide scrollbar in Webkit browsers
            }}
          >
            <Typography variant="h6" gutterBottom>To Do</Typography>
            {Tasks.filter(task => task.taskStatus == 0).length === 0 ? (
              <Typography variant="body2" color="text.secondary">No tasks available</Typography>
            ) : (
              Tasks.filter(task => task.taskStatus == 0).map((task, index) => (
                <Box key={index} mb={2}>
                  <TaskCompnent
                    TaskName={task.TaskName}
                    TaskDescription={task.TaskDescription}
                    TaskImage={task.TaskImage}
                    TaskDueDate={task.TaskDueDate}
                  />
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            )}
          </Box>

          <Box
            sx={{
              width: 320,
              maxHeight: 500,
              overflow: "auto",
              bgcolor: '#fffde7',
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
              '&::-webkit-scrollbar': { display: "none" }, // Hide scrollbar in Webkit browsers
            }}
          >
            <Typography variant="h6" gutterBottom>In Progress</Typography>
            {Tasks.filter(task => task.taskStatus == 1).length === 0 ? (
              <Typography variant="body2" color="text.secondary">No tasks available</Typography>
            ) : (
              Tasks.filter(task => task.taskStatus == 1).map((task, index) => (
                <Box key={index} mb={2}>
                  <TaskCompnent
                    TaskName={task.TaskName}
                    TaskDescription={task.TaskDescription}
                    TaskImage={task.TaskImage}
                    TaskDueDate={task.TaskDueDate}
                  />
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            )}
          </Box>

          <Box
            sx={{
              width: 320,
              maxHeight: 500,
              overflow: "auto",
              bgcolor: '#fce4ec',
              borderRadius: 2,
              boxShadow: 2,
              padding: 2,
              '&::-webkit-scrollbar': { display: "none" }, // Hide scrollbar in Webkit browsers
            }}
          >
            <Typography variant="h6" gutterBottom>Completed</Typography>
            {Tasks.filter(task => task.taskStatus === 2).length === 0 ? (
              <Typography variant="body2" color="text.secondary">No tasks available</Typography>
            ) : (
              Tasks.filter(task => task.taskStatus == 2).map((task, index) => (
                <Box key={index} mb={2}>
                  <TaskCompnent
                    TaskName={task.TaskName}
                    TaskDescription={task.TaskDescription}
                    TaskImage={task.TaskImage}
                    TaskDueDate={task.TaskDueDate}
                  />
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
}
