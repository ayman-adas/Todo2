import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePickerCompnent from "../DatePickerCompnent";
import AddImageCompnent from "../AddImageCompnent";
import ListComponent from "../ListCompnent"; // Corrected import

export default function NewTaskComponent() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedCollaborators, setSelectedCollaborators] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const location = useLocation();
  const data = location.state || {}; // Handle undefined state
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      console.log(taskName)
      const result = await axios.post("http://localhost:2003/task/create", {
        taskName:taskName,
        taskDescription:taskDescription,
        taskImage: imageSrc,
        taskDueDate: selectedDate,
        ProjectID: data.ProjectID,
      }, {
        headers: { 'Content-Type': 'application/json' }, // Use correct header
      });

      console.log("Task created successfully:", result.data.message);

      for (const collaborator of selectedCollaborators) {
        console.log(collaborator)
        await axios.post("http://localhost:2003/task/insert/collaborator", {
          taskID: result.data.message,
          ProfileEmail: collaborator,
        });
      }

window.location.reload()    } catch (err) {
      console.error("Error creating task:", err.message);
    }
  };

  const handleCollaboratorsChange = (collaborators) => {
    setSelectedCollaborators(collaborators);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleImageChange = (image) => {
    setImageSrc(image);
  };

  return (
    <Box component="form" onSubmit={handleCreate} sx={{ maxWidth: 600, mx: 'auto', my: 4, p: 3, color:"white" ,  borderRadius: 5,
      boxShadow:8,}}>
    
      <Typography variant="h4" align="center" gutterBottom>
        Create New Task
      </Typography>

      <TextField
        required
        fullWidth
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        sx={{ mb: 2 ,color:"white",backgroundColor:"white"}}
      />

      <TextField
        required
        fullWidth
        label="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        sx={{ mb: 2,color:"white",backgroundColor:"white" }}
      />

      <AddImageCompnent onImageChange={handleImageChange} />
      <Box height={2}></Box>
      <DatePickerCompnent onDateChange={handleDateChange} />
      <Box height={2}></Box>

      <Typography variant="h6" gutterBottom>
        Add Task Collaborators
      </Typography>
      <ListComponent onCollaboratorsChange={handleCollaboratorsChange} />

      <Button
        variant="contained"
        size="large"
        type="submit"
        fullWidth
        sx={{ mt: 3 }}
      >
        Create Task
      </Button>
    </Box>
  );
}