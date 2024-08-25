import React from "react";
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
} from "@mui/material";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import TaskCollaboratorsListComponent from "./TaskCollaboratoers";
import SubTask from "../SubTask/SubTask";

export default function TaskComponent({ data }) {
  console.log(data);
  var status = "";
  switch (data.taskStatus) {
    case "0":
      status = "TO DO";
      break;
    case "1":
      status = " Progress";
      break;
    case "2":
      status = " Done";
      break;
    default:
  }
  console.log(status);
  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/2098/2098402.png";
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

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
      }} // Centering and spacingnpm
    >
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
      >
        <div
          className="handle"
          style={{
            userSelect: "none",
            padding: 16,
            margin: "0 0 8px 0",
            minHeight: "50px",
            // backgroundColor: "#456C86",
            // color: "white",
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
                src={data.TaskName != null ? data.TaskImage : defaultImage}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: 150,
                  objectFit: "cover",
                  borderRadius: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Typography variant="h5" fontWeight="bold">
                {data.TaskName}
              </Typography>
            </Paper>
            <Divider sx={{ my: 1 }} />
          </Card>
        </div>
      </Draggable>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        PaperProps={{
          sx: {
            width: '80%', // Adjust width as needed
            maxWidth: '800px', // Adjust max-width as needed
            height: '80%', // Adjust height as needed
            maxHeight: '600px', // Adjust max-height as needed
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">
          <img
            src={data.TaskImage}
            style={{
              width: "100%",
              maxHeight: 150,
              objectFit: "cover",
              borderRadius: 4,
        
            }}
          ></img>
        </DialogTitle>
        <Divider
          sx={{
            backgroundColor: "red",
          }}
        ></Divider>
        <Stack direction={"row"}>
          <Box>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText sx={{ fontWeight: "bold" }}>
              {data.TaskName}
            </DialogContentText>
            <DialogContentText> in list: {status}</DialogContentText>
            <Divider
              sx={{
                backgroundColor: "red",
              }}
            ></Divider>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              Description:<br></br> {data.TaskDescription}
            </DialogContentText>
            <label>{data.TaskDueDate}</label>
          </DialogContent>
          </Box>
          <Box paddingLeft={40}>
            <h3>Task Collaborators</h3>
            <TaskCollaboratorsListComponent taskID={data.TaskID}/>
          </Box>
        </Stack>
        <Divider sx={{backgroundColor:"red"}}></Divider>
        <SubTask taskID={data.TaskID}/>
      </Dialog>
    </motion.div>
  );
}
