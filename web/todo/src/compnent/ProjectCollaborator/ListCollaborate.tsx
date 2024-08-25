import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
export default function ListCollaborate() {
  const location = useLocation();
  const data = location.state;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [Projectollaborate, setProjectollaborate] = useState([]);

  useEffect(() => {
    const fetchMyProjects = async () => {
      const profileID = localStorage.getItem("ProfileID");
      const projectID = data?.ProjectID;

      if (!profileID || !projectID) {
        console.error("ProfileID or ProjectID is missing");
        return;
      }

      try {
        console.log(projectID)
        const response = await axios.get(
          "http://localhost:2003/project/collabortors/retrive",
          {
            params: { ProjectID: projectID },
          }
        );
        console.log("the collabortor" + response.data.message);
        setProjectollaborate(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchMyProjects();
  }, [data?.ProjectID]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDeleteChange = async (event, ProfileEmail) => {
    try {
      console.log("inside handle");
      if (ProfileEmail != localStorage.getItem("ProfileEmail")) {
        const response = await axios.delete(
          "http://localhost:2003/project/collabortors/delete",
          {
            data: {
              ProjectID: data?.ProjectID,
              ProfileEmail: ProfileEmail,
            },
          }
        );
        console.log(response.status);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error delete projects:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {Projectollaborate.map((user, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <HighlightOffIcon
                onClick={(event) =>
                  handleDeleteChange(event, user.ProfileEmail)
                }
              ></HighlightOffIcon>
              <ListItemText primary={user.ProfileEmail} />
            </ListItemButton>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
