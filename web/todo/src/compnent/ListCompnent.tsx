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
import APiService from "../service/ApiService";

export default function ListComponent({ onCollaboratorsChange }) {
  const location = useLocation();
  const data = location.state;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [taskCollaborate, setTaskCollaborate] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());

  useEffect(() => {
    const fetchCollaborators = async () => {
      const profileID = localStorage.getItem("ProfileID");
      const projectID = data?.ProjectID;

      if (!profileID || !projectID) {
        console.error("ProfileID or ProjectID is missing");
        return;
      }

      try {
        const response = await APiService. get(
          "project/collabortors/retrive",
          {
            ProjectID: projectID ,
          }
        );
        setTaskCollaborate(response || []); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [data?.ProjectID]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleCheckboxChange = (event, ProfileEmail) => {
    setSelectedEmails((prev) => {
      const updated = new Set(prev);
      if (event.target.checked) {
        updated.add(ProfileEmail);
      } else {
        updated.delete(ProfileEmail);
      }
      onCollaboratorsChange(updated);
      return updated;
    });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "grey" }}>
      <List component="nav" aria-label="collaborators">
        {taskCollaborate.map((user, index) => {
          const { ProfileEmail } = user;

          return (
            <React.Fragment key={ProfileEmail}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
                sx={{ borderRadius: 1 }} // Rounded corners
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedEmails.has(ProfileEmail)}
                    onChange={(event) =>
                      handleCheckboxChange(event, ProfileEmail)
                    }
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={ProfileEmail} />
              </ListItemButton>
              <Divider component="li" />
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
