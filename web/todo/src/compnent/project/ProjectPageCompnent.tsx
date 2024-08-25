import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCompnent from "../Task/TaskCompnent";
import Board from "../../dnd/board/Board";
import { generateQuoteMap } from "../../dnd/mockData";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function ProjectPageCompnent() {
  const location = useLocation();
  const data = location.state;
  const Navigate = useNavigate();

  const handleNewTask = () => {
    Navigate(`/Createtask`, { state: data });
  };

  const handleCollaborate = () => {
    Navigate(`/collaborator`, { state: data });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2003/project/tasks/retrive",
          {
            params: { ProjectID: data.ProjectID },
          }
        );
        console.log(response.data.message)
        // setTasks(response.data.message); // Adjust based on response structure
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [data.ProjectID]);

  return (
    <>
      {data.Author == localStorage.getItem("ProfileID") ? (
        <Stack
          direction="row"
          spacing={2}
          padding={3}
          justifyContent="center"
          paddingTop={12}
        >
          <Button
            variant="contained"
            onClick={handleCollaborate}
            sx={{
              backgroundColor: "#00796b",
              "&:hover": { backgroundColor: "#004d40" },
            }}
          >
            <Stack direction="row">
              <PersonAddIcon />
              Share{" "}
            </Stack>
          </Button>
          <Button
            variant="contained"
            onClick={handleNewTask}
            sx={{
              backgroundColor: "#0288d1",
              "&:hover": { backgroundColor: "#01579b" },
            }}
          >
            Add New Task
          </Button>
        </Stack>
      ) : (
        <li></li>
      )}

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding={3}
        paddingTop={10}
      >
        <Board data={data} />
      </Box>
    </>
  );
}
