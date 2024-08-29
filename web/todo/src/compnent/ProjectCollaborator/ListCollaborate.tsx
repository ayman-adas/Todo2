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
      const projectID = data?.ProjectID;

      if (!profileID || !projectID) {
        console.error("ProfileID or ProjectID is missing");
        return;
      }

      try {
        console.log(projectID);
        const response =await APiService.get("project/collabortors/retrive", { ProjectID: projectID })  
        console.log("the collabortor" + response);
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

  const handleDeleteChange = async (event, ProfileEmail) => {
    try {
      console.log("inside handle");
      if (ProfileEmail != localStorage.getItem("ProfileEmail")) {
        const response = await APiService.delete("project/collabortors/delete",{
          ProjectID: data?.ProjectID,
          ProfileEmail: ProfileEmail,
        }) 
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
          const { ProfileEmail } = user;

          return (
            <React.Fragment key={index}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                {data.Author == localStorage.getItem("ProfileID") ? (
                  ProfileEmail != localStorage.getItem("ProfileEmail") ? (
                    <HighlightOffIcon
                      onClick={(event) =>
                        handleDeleteChange(event, ProfileEmail)
                      }
                    />
                  ) : null
                ) : null}
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
