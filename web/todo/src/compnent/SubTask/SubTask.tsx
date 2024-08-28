import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

export default function SubTask({ taskID }) {
  const [subTasks, setsubTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editField, setEditField] = useState("");

  useEffect(() => {
    const fetchSubTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/tasks/subTasks/retrive",
          {
            params: { taskID: taskID },
          }
        );
        console.log("subask", response.data.message);
        setsubTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchSubTasks();
  }, [taskID]);

  const handleCheckboxChange = async (event, isDone, subTaskID) => {
    console.log(event.target.checked ? 1 : 0, "event");
    await axios.patch("http://localhost:2003/subTask/update/isDone", {
      subTaskID: subTaskID,
      subTaskIsDone: event.target.checked ? 1 : 0,
      ProfileID:localStorage.getItem("ProfileID")

    });
    window.location.reload();
  };

  const handleEditClick = (index, value, field) => {
    setEditIndex(index);
    setEditValue(value);
    setEditField(field);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSaveClick = async (subTaskID) => {
    console.log("editField", editField, editValue);
    // Send the updated value to the server
    await axios.patch(`http://localhost:2003/subTask/update/${editField}`, {
      subTaskID: subTaskID,
      [editField]: editValue
      ,ProfileID:localStorage.getItem("ProfileID")
    });
    setEditIndex(null);
    // Optionally refresh the data or update it locally
    window.location.reload();
  };
  const handledeleteClick = async (subTaskID) => {
    console.log(subTaskID);
    // Send the updated value to the server
    await axios.delete(`http://localhost:2003/subTask/delete`, {
      data: { subTaskID: subTaskID },
    });
    setEditIndex(null);
    // Optionally refresh the data or update it locally
    window.location.reload();
  };
  return (
    <>
      {subTasks.map((subTask, index) => {
        const { isDone, startDate, subTaskName, priority, endDate, subTaskID } =
          subTask;
        return (
          <Box
            key={index}
            p={2}
            border={1}
            borderColor="grey.300"
            borderRadius={1}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Checkbox
                edge="start"
                checked={isDone}
                onChange={(event) =>
                  handleCheckboxChange(event, isDone, subTaskID)
                }
                tabIndex={-1}
                disableRipple
              />
              {editIndex == index && editField == "subTaskName" ? (
                <>
                  <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveClick(subTaskID)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="body1">
                  {subTaskName}
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleEditClick(index, subTaskName, "subTaskName")
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Typography>
              )}
              {editIndex == index && editField == "priority" ? (
                <>
                  <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="small"
                    type="number"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveClick(subTaskID)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="body2">
                  {priority}
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(index, priority, "priority")}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Typography>
              )}
              {editIndex == index && editField == "startDate" ? (
                <>
                  <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveClick(subTaskID)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="body2">
                  {startDate}
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleEditClick(index, startDate, "startDate")
                    }
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Typography>
              )}
              {editIndex == index && editField == "endDate" ? (
                <>
                  <TextField
                    value={editValue}
                    onChange={handleEditChange}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveClick(subTaskID)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="body2">
                  {endDate}
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(index, endDate, "endDate")}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Typography>
              )}
              <Button variant="contained" sx={{backgroundColor:"red"}} onClick={() =>
                      handledeleteClick( subTaskID)
                    }> Delete</Button>
            </Stack>
          </Box>
        );
      })}{" "}
    </>
  );
}
