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
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import axios, { Axios } from "axios";
import TaskCollaborator from "../../view/Tasks/TaskCollaborator";
import SubTask from "../SubTask/SubTask";
import CreateSubTaskForm from "../SubTask/AddSubTask";
import APiService from "../../service/ApiService";

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
        const response = await APiService.get("task/collabortors/retrive",{ taskID: data.TaskID })
        setTaskCollaborate(response || []);
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
  const isAdmin = data.ProfileID == localStorage.getItem("ProfileID");
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
      await APiService.put("task/updateTaskName", {
        taskID: data.TaskID,
        taskName: TaskNameChange,
      });
    } catch (error) {
      console.error("Error updating task name:", error);
    }
  };

  const handleTaskDescSaveClick = async () => {
    setTaskDescisEditing(false);
    try {
      await APiService.put("task/updateTaskDesc", {
        taskID: data.TaskID,
        taskDesc: TaskDescChange,
      });
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
      const response = await APiService.delete("task/delete", 
       { taskID: data.TaskID },
      );
      console.log(response.status);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        width: "100%",
        maxWidth: 300,
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
            backgroundColor: isAuthorized ? "#d4edda" : "#f8d7da",
            borderRadius: 2,
            boxShadow: 3,
            height: "auto",
            width: "100%",
            maxWidth: 300,
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
                height: 100,
                objectFit: "fill",
                borderRadius: 4,
              }}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: "center" }}
            >
              {TaskNameChange}
              {isAdmin && (
                <IconButton
                  onClick={() => setTaskNameisEditing(true)}
                  sx={{
                    position: "absolute",
                    right: 10,
                    top: 10,
                    zIndex: 1, // Ensure the icon is visible
                  }}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Typography>
          </Paper>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" sx={{ textAlign: "center", mb: 1 }}>
            Status: {status}
          </Typography>
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
            maxWidth: "900px",
            height: "80%",
            maxHeight: "700px",
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

        <Divider sx={{ backgroundColor: "#e3e3e3" }} />

        <DialogContent dividers={scroll == "paper"}>
          <Stack spacing={2}>
            <DialogContentText>
              {TaskNameisEditing ? (
                <>
                  <TextField
                    value={TaskNameChange}
                    onChange={(e) => setTaskNameChange(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    onClick={handleTaskNameSaveClick}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="h6">
                  {TaskNameChange}
                  {isAdmin && (
                    <IconButton
                      onClick={() => setTaskNameisEditing(true)}
                      sx={{
                        marginLeft: 1,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Typography>
              )}
            </DialogContentText>

            <DialogContentText>Status: {status}</DialogContentText>

            <Divider sx={{ my: 2 }} />

            <DialogContentText>
              Description:
              <br />
              {TaskDescisEditing ? (
                <>
                  <TextField
                    value={TaskDescChange}
                    onChange={(e) => setTaskDescChange(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    onClick={handleTaskDescSaveClick}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Typography variant="body1">
                  {TaskDescChange}
                  {isAdmin && (
                    <IconButton
                      onClick={() => setTaskDescisEditing(true)}
                      sx={{
                        marginLeft: 1,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Typography>
              )}
            </DialogContentText>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2 }}>
              <CreateSubTaskForm
              data={data}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <SubTask taskID={data.TaskID} />

            <Divider sx={{ my: 2 }} />

            <TaskCollaborator data={data} />

            {isAdmin && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteTask}
                sx={{ mt: 2 }}
              >
                Delete Task
              </Button>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
