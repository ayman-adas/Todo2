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
import APiService from "../../service/ApiService";
export default function ListCollaborate({ data }) {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [Projectollaborate, setProjectollaborate] = useState([]);

  useEffect(() => {
    const fetchMyProjects = async () => {
      const profileID = localStorage.getItem("ProfileID");

      if (!profileID) {
        console.error("ProfileID or ProjectID is missing");
        return;
      }

      try {
        const response = await APiService.get(
          "task/collabortors/retrive",
          
            { taskID: data.TaskID },
          
        );
        console.log(response);
        setProjectollaborate(response); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchMyProjects();
  }, [data?.ProjectID]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDeleteChange = async (event, ProfileID) => {
    console.log("inside handle");
    console.log(data?.TaskID);
    console.log(ProfileID);
    try {
      if (ProfileID != localStorage.getItem("ProfileID")) {
        const response = await APiService.delete(
          "task/collabortors/delete",
          {
          
              taskID: data?.TaskID,
              ProfileID: ProfileID,
            
          }
        );
        console.log(response);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error delete projects:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {Projectollaborate.map(function (user, index) {
          const { profileEmail, profileID } = user;

          return (
            <React.Fragment key={index}>
              <ListItemButton
                selected={selectedIndex == index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                {data.ProfileID == localStorage.getItem("ProfileID") ? (
                  profileEmail != localStorage.getItem("ProfileEmail") ? (
                    <HighlightOffIcon
                      onClick={(event) => handleDeleteChange(event, profileID)}
                    />
                  ) : null
                ) : null}
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
