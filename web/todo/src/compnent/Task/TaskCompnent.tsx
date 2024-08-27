import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import axios from "axios";
import TaskCollaborator from "../../view/Tasks/TaskCollaborator";
import SubTask from "../SubTask/SubTask";
import { Navigate } from "react-router-dom";

export default function TaskComponent({ data }) {
  const [taskCollaborate, setTaskCollaborate] = useState([]);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [TaskNameisEditing, setTaskNameisEditing] = useState(false);
  const [TaskDescisEditing, setTaskDescisEditing] = useState(false);

  const [TaskNameChange, setTaskNameChange] = useState(data.TaskName);
  const [TaskDescChange, setTaskDescChange] = useState(data.TaskDescription);

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";

  useEffect(() => {
    const fetchTaskCollaborators = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/task/collabortors/retrive",
          {
            params: { taskID: data.TaskID },
          }
        );
        setTaskCollaborate(response.data.message || []);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchTaskCollaborators();
  }, [data.TaskID]);

  const profileID = localStorage.getItem("ProfileID"); // Get the current user's profile ID
  const isAuthorized = taskCollaborate.some(
    (collaborator) => collaborator.profileID == profileID
  );
const isAdmin=data.ProfileID==localStorage.getItem("ProfileID")
  let status = "";
  switch (data.taskStatus) {
    case "0":
      status = "TO DO";
      break;
    case "1":
      status = "In Progress";
      break;
    case "2":
      status = "Done";
      break;
    default:
      status = "Unknown";
  }

  const handleTaskNameSaveClick = async () => {
    setTaskNameisEditing(false);
    try {
      await axios.put(
        "http://localhost:2003/task/updateTaskName",
        { 
          taskID: data.TaskID, 
          taskName: TaskNameChange 
        }
      );
    } catch (error) {
      console.error("Error updating task name:", error);
    }
  };

  const handleTaskDescSaveClick = async () => {
    setTaskDescisEditing(false);
    try {
      await axios.put(
        "http://localhost:2003/task/updateTaskDesc",
        { 
          taskID: data.TaskID, 
          taskDesc: TaskDescChange 
        }
      );
    } catch (error) {
      console.error("Error updating task description:", error);
    }
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    if (isAuthorized) {
      setOpen(true);
      setScroll(scrollType);
    } else {
      alert("You are not authorized to view this task.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement != null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleDeleteTask = async () => {
    try {
      console.log(data.ProjectID + "id");
      const response = await axios.delete(
        "http://localhost:2003/task/delete",
        {
          data: { taskID: data.TaskID },
        }
      );
      console.log(response.status);

      // setTasks(response.data.message); // Adjust based on response structure
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
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
      }}
    >
      <div
        className="handle"
        style={{
          userSelect: "none",
          padding: 16,
          margin: "0 0 8px 0",
          minHeight: "50px",
        }}
        onClick={handleClickOpen("body")}
      >
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
              src={data.TaskImage || defaultImage}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 150,
                objectFit: "fill",
                borderRadius: 4,
              }}
              alt={data.TaskName}
            />
            <Typography variant="h5" fontWeight="bold">
              {TaskNameChange}
              {isAdmin && (
                <IconButton
                  onClick={() => setTaskNameisEditing(true)}
                  sx={{ 
                    position: "absolute", 
                    right: 0, 
                    top: 0,
                    transform: "translateY(-50%)",
                    zIndex: 1, // Ensure the icon is visible
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Typography>
          </Paper>
          <Divider sx={{ my: 1 }} />
        </Card>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            width: "80%",
            maxWidth: "800px",
            height: "80%",
            maxHeight: "600px",
            overflow: "auto", // Enable scrolling
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">
          <img
            src={data.TaskImage || defaultImage}
            style={{
              width: "100%",
              maxHeight: 150,
              objectFit: "fill",
              borderRadius: 4,
            }}
            alt={data.TaskName}
          />
        </DialogTitle>

        <Divider sx={{ backgroundColor: "red" }} />

        <Stack direction={"row"} spacing={2}>
          <Box>
            <DialogContent dividers={scroll == "paper"}>
              <DialogContentText sx={{ fontWeight: "bold", position: "relative" }}>
                {TaskNameisEditing  ? (
                  <>
                    <TextField
                      value={TaskNameChange}
                      onChange={(e) => setTaskNameChange(e.target.value)}
                      fullWidth
                    />
                    <Button onClick={handleTaskNameSaveClick}>Save</Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">
                      {TaskNameChange}
                      {isAdmin && (
                        <IconButton
                          onClick={() => setTaskNameisEditing(true)}
                          sx={{ 
                            position: "absolute", 
                            right: 0, 
                            top: 0,
                            transform: "translateY(-50%)",
                            zIndex: 1, // Ensure the icon is visible
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Typography>
                  </>
                )}
              </DialogContentText>

              <DialogContentText>In list: {status}</DialogContentText>
              <Divider sx={{ backgroundColor: "red" }} />
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                sx={{ position: "relative" }}
              >
                Description:<br />
                {TaskDescisEditing ? (
                  <>
                    <TextField
                      value={TaskDescChange}
                      onChange={(e) => setTaskDescChange(e.target.value)}
                      multiline
                      rows={4}
                      fullWidth
                    />
                    <Button onClick={handleTaskDescSaveClick}>Save</Button>
                  </>
                ) : (
                  <>
                    <Typography variant="body1">
                      {TaskDescChange}
                      {isAdmin && (
                        <IconButton
                          onClick={() => setTaskDescisEditing(true)}
                          sx={{ 
                            position: "absolute", 
                            right: 0, 
                            top: 0,
                            transform: "translateY(-50%)",
                            zIndex: 1, // Ensure the icon is visible
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </Typography>
                  </>
                )}
              </DialogContentText>
              <label>{data.TaskDueDate}</label>
            </DialogContent>
          </Box>

          <Box paddingLeft={40} pb={40}>
            <TaskCollaborator data={data} />
            <br></br>
            <Button variant="contained" sx={{backgroundColor:"red"}} onClick={handleDeleteTask} > Delete Task</Button>

          </Box>
          <Box >
          </Box>
        </Stack>

        <Divider sx={{ backgroundColor: "red" }} />
        <SubTask taskID={data.TaskID} />
      </Dialog>
    </motion.div>
  );
}
