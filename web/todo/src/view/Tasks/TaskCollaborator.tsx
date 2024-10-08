import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  ListItemText,
  ListItemButton,
  Divider,
  List,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import ListCollaborate from "../../compnent/TaskCollaborate/ListCollaborate";
import APiService from "../../service/ApiService";

export default function TaskCollaborator({ data }) {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [existingCollaborators, setExistingCollaborators] = useState([]);
  console.log("task" + data.TaskID);
  useEffect(() => {
    const fetchUsersAndCollaborators = async () => {
      try {
        // Fetch all users
        const usersResponse = await APiService.get(
          "project/collabortors/retrive",
          {
            ProjectID: data.ProjectID 
          }
        );
        console.log(usersResponse,"user")
        const allUsers = usersResponse;
        setUsers(allUsers);

        // Fetch existing collaborators
        const collaboratorsResponse = await APiService.get(
          `task/collabortors/retrive?taskID=${data.TaskID}`,{}
        );
        console.log('collaborateresponse',collaboratorsResponse)
        const collaborators = collaboratorsResponse.map(
          (c) => c.profileEmail
        );
        setExistingCollaborators(collaborators);
console.log(collaborators,"emails")
        // Filter out existing collaborators from user list
        const filtered = [];
        for (let i = 0; i < allUsers.length; i++) {
          let isCollaborator = false;
          for (let j = 0; j < collaborators.length; j++) {
            if (allUsers[i].ProfileEmail == collaborators[j]) {
              isCollaborator = true;
              break;
            }
          }
          if (!isCollaborator) {
            filtered.push(allUsers[i]);
          }
        }
        setFilteredUsers(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndCollaborators();
  }, [data.ProjectID]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = [];
    for (let i = 0; i < users.length; i++) {
      let isCollaborator = false;
      const {ProfileEmail}=users[i]

      for (let j = 0; j < existingCollaborators.length; j++) {

        if (ProfileEmail == existingCollaborators[j]) {
          isCollaborator = true;
          break;
        }
      }
      if (
        !isCollaborator &&
        (ProfileEmail).toLowerCase().includes(query)
      ) {
        filtered.push(users[i]);
      }
    }
    setFilteredUsers(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    const filtered = [];
    for (let i = 0; i < users.length; i++) {
      let isCollaborator = false;
      const {ProfileEmail}=users[i]

      for (let j = 0; j < existingCollaborators.length; j++) {
        if (ProfileEmail == existingCollaborators[j]) {
          isCollaborator = true;
          break;
        }
      }
      if (!isCollaborator) {
        filtered.push(users[i]);
      }
    }
    setFilteredUsers(filtered);
  };

  const handleCheckboxChange = (event, ProfileEmail) => {
    setSelectedEmails((prev) => {
      const updated = new Set(prev);
      if (event.target.checked) {
        updated.add(ProfileEmail);
      } else {
        updated.delete(ProfileEmail);
      }
      return updated;
    });
  };

  const handleAddCollaborators = async () => {
    if (selectedEmails.size == 0) {
      console.warn("No collaborators selected.");
      return;
    }

    try {
      for (const email of selectedEmails) {
        await APiService.post("task/insert/collaborator", {
          taskID: data.TaskID,
          ProfileEmail: email, // Send one email at a time
        });
      }
      console.log("Collaborators added successfully");
      window.location.reload();

      // Optionally refresh the list of users and collaborators
      const usersResponse = await APiService.get(
        "project/collabortors/retrive",
        {
          ProjectID: data.ProjectID ,
        }
      );
      const collaboratorsResponse = await APiService.get(
        `task/collabortors/retrive?taskID=${data.taskID}`,{}
      );

      setUsers(usersResponse);
      const newCollaborators = collaboratorsResponse.map(
        (c) => c.ProfileEmail
      );

      setExistingCollaborators(newCollaborators);
      const filtered = [];
      for (let i = 0; i < usersResponse.length; i++) {
        let isCollaborator = false;
        for (let j = 0; j < newCollaborators.length; j++) {
          if (
            usersResponse[i].ProfileEmail === newCollaborators[j]
          ) {
            console.log("isColabo");
            isCollaborator = true;
            break;
          }
        }
        if (!isCollaborator) {
          filtered.push(usersResponse[i]);
        }
      }
      setFilteredUsers(filtered);

      setSelectedEmails(new Set()); // Clear the selected emails
      window.location.reload();
    } catch (error) {
      console.error("Error adding collaborators:", error);
    }
  };
  console.log(data);
  return (
    <>
      <Box pr={10}>
        <h3 style={{ color: "wheat" }}>Task Collaborators</h3>
        <ListCollaborate data={data} />
        <Box height={3}></Box>
        <br />

        {data.ProfileID == localStorage.getItem("ProfileID") ? (
          <Box>
            {" "}
            <h3 style={{ color: "wheat" }}>Add Task Collaborators</h3>
            <Box
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <TextField
                label="Search by email"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: 20 }}
              />
              {searchQuery && (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClearSearch}
                  style={{ marginBottom: 20 }}
                >
                  Clear Search
                </Button>
              )}
              {searchQuery && (
                <List component="nav" aria-label="main mailbox folders">
                  {filteredUsers.map(function (user, index) {
                    const {ProfileEmail}=user
                    return (
                      <React.Fragment key={index}>
                        <ListItemButton>
                          {data.ProfileID == localStorage.getItem("ProfileID") &&
                            ProfileEmail !=
                            localStorage.getItem("ProfileEmail") ? (
                            <Checkbox
                              edge="start"
                              checked={selectedEmails.has(ProfileEmail)}
                              onChange={(event) => handleCheckboxChange(event, ProfileEmail)}
                              tabIndex={-1}
                              disableRipple />
                          ) : null}
                          <ListItemText primary={ProfileEmail} />
                        </ListItemButton>
                        <Divider component="li" />
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
              {searchQuery && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddCollaborators}
                  style={{ marginTop: 20 }}
                >
                  Add Selected Collaborators
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <li></li>
        )}
      </Box>
    </>
  );
}
