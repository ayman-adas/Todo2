import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { useLocation } from "react-router-dom";
import APiService from "../../service/ApiService";

export default function TaskCollaboratorsListComponent({ taskID }) {
  const location = useLocation();
  const data = location.state;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [taskCollaborate, setTaskCollaborate] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  console.log(taskID);
  useEffect(() => {
    const fetchCollaborators = async () => {
      const profileID = localStorage.getItem("ProfileID");

      if (!taskID || !taskID) {
        console.error("taskID or taskID is missing");
        return;
      }

      try {
        const response = await APiService.get("task/collabortors/retrive", { taskID: taskID })
        console.log((response))
        setTaskCollaborate(response || []); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching  collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [data?.taskID]);

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "red      " }}>
      <List component="nav" aria-label="collaborators">
        {taskCollaborate.map(function (user, index) {
          const {profileEmail}=user
          return (
            <React.Fragment key={profileEmail}>
              <ListItemButton
                selected={selectedIndex === index}
                sx={{ borderRadius: 4, color: "white", }} // Rounded corners
              >
                <ListItemText primary={profileEmail} />
              </ListItemButton>
              <Divider component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
