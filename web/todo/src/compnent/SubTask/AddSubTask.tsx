import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid, Stack } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePickerCompnent from "../DatePickerCompnent";
import axios from "axios";

const CreateSubTaskForm = (data) => {
const [subTaskName,setsubTaskName]=useState('')
const [priority,setpriority]=useState('')
const [selectedStartDate, setStartSelectedDate] = useState(null);
const [selectedDueDate, setSelectedDueDate] = useState(null);
const [errorMessage, setErrorMessage] = useState(''); // State for error message

console.log(data.data.TaskID , "id");

  const handleCreate = async () => {
    try {
      if (selectedStartDate && selectedDueDate && selectedStartDate > selectedDueDate) {
        setErrorMessage('Start date cannot be later than end date.');
        return;
      }
      setErrorMessage(''); // Clear previous error messages

      console.log(data.taskID + "id");
      const response = await axios.post("http://localhost:2003/subTask/create", {
        taskID: data.data.TaskID
          ,subTaskName:subTaskName,
          priority: priority
          ,ProfileID:localStorage.getItem("ProfileID"),
          startDate:selectedStartDate,
          endDate:selectedDueDate
          
        ,
      });
      console.log(response.data.message);
      
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };
  const handleDueDateChange = (date) => {
    setSelectedDueDate(date);
  };
  console.log(selectedStartDate)
  console.log(selectedDueDate)

  return (
    <Box
      component="form"
      sx={{
        mx: "auto",
        my: 4,
        p: 4,
        borderRadius: 2,
        boxShadow: 8,
        maxWidth: 800,
        backgroundColor: "#f8f9fa", // Light background color
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        Create New Sub Task
      </Typography>
 <Box  height={10}></Box>
      <TextField
        required
        fullWidth
        label="Sub Task Name"
        value={subTaskName}
        onChange={(e) => setsubTaskName(e.target.value)}
        sx={{ backgroundColor: "white" }}
      />
 <Box  height={10}></Box>

      <TextField
        required
        fullWidth
        label="Priority"
        type="number"

        value={priority}
        onChange={(e) => setpriority(e.target.value)}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

        sx={{ backgroundColor: "white" }}
      />
 <Box height={10}></Box>

      <DatePickerCompnent onDateChange={handleStartDateChange} label={"Start Date"}/>
      <Box  height={10}></Box>

      <DatePickerCompnent onDateChange={handleDueDateChange} label={"End Date"} />
      <Box  height={10}></Box>
      {errorMessage && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Button
        variant="contained"
        size="large"
   onClick={handleCreate}
        fullWidth
        sx={{
          mt: 3,
          backgroundColor: "#007bff",
          "&:hover": { backgroundColor: "#0056b3" },
        }}
      >
        Create Sub Task
      </Button>
    </Box>
  );
};

export default CreateSubTaskForm;
