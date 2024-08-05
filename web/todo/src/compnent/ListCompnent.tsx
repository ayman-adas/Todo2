import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

export default function ListComponent({ onCollaboratorsChange }) {
  const location = useLocation();
  const data = location.state;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [taskCollaborate, setTaskCollaborate] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());

  useEffect(() => {
    const fetchMyProjects = async () => {
      const profileID = localStorage.getItem("ProfileID");
      const projectID = data?.ProjectID;

      if (!profileID || !projectID) {
        console.error("ProfileID or ProjectID is missing");
        return;
      }

      try {
        const response = await axios.get("http://localhost:2003/project/collabortors/retrive", {
          params: { ProjectID: projectID }
        });
        setTaskCollaborate(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchMyProjects();
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
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main mailbox folders">
        {taskCollaborate.map((user, index) => (
          <React.Fragment key={index}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={selectedEmails.has(user.ProfileEmail)}
                  onChange={(event) => handleCheckboxChange(event, user.ProfileEmail)}
                />
              </ListItemIcon>
              <ListItemText primary={user.ProfileEmail} />
            </ListItemButton>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
