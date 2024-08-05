import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
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
  const data = location.state;
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();
    console.log("create");
    console.log(taskName);
    console.log(taskDescription);
    console.log(data.ProjectID);
    console.log(imageSrc);
    console.log(selectedDate);

    axios
      .post("http://localhost:2003/task/create", {
         headers: {
      'Content-Type': 'multipart/form-data',
    },
        taskName: taskName,
        taskDescription: taskDescription,
        taskImage: imageSrc,
        taskDueDate: selectedDate,
        ProjectID: data.ProjectID, // Ensure ProjectID is correctly assigned

      })
      .then((result) => {
        console.log("Task created successfully");
        for (const collaborator of selectedCollaborators) {
console.log(collaborator)
        axios
        .post("http://localhost:2003/task/insert/collaborator", {
          taskID: result.data.message,
          ProfileEmail: collaborator,
      
        })
        .then((result) => {
          console.log("Task created successfully");
          navigate("/profile");
        })
        .catch((err) => {
          console.log("Error creating task:", err.message);
        });}
      })
      .catch((err) => {
        console.log("Error creating task:", err.message);
      });
     
  };

  const handleCollaboratorsChange = (collaborators) => {
    console.log("Selected collaborators:", collaborators);
    setSelectedCollaborators(collaborators);
  };

  const handleDateChange = (date) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
  };

  const handleImageChange = (image) => {
    console.log("Selected image:", image);
    setImageSrc(image);
  };

  return (
    <form onSubmit={handleCreate}>
      <Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <h1>Create New Task Page</h1>
        </Box>
        <Box height={35}></Box>
        <TextField
          required
          fullWidth
          name="TaskName"
          label="Task Name"
          type="text"
          id="TaskName"
          autoComplete="TaskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Box height={35}></Box>
        <TextField
          required
          fullWidth
          name="TaskDescription"
          label="Task Description"
          type="text"
          id="TaskDescription"
          autoComplete="TaskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Box height={35}></Box>
        <AddImageCompnent onImageChange={handleImageChange} />
        <Box height={35}></Box>
        <DatePickerCompnent onDateChange={handleDateChange} />
        <Box></Box>
        <h4>Add Task Collaborator</h4>
        <ListComponent onCollaboratorsChange={handleCollaboratorsChange} />
        <Box marginTop={5} marginLeft={30} marginRight={30} width={300}>
          <Button
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            autoFocus
          >
            Create Task
          </Button>
        </Box>
      </Box>
    </form>
  );
}
