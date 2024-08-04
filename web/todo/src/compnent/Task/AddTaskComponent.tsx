import React from "react";
import { Box, Container, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// import AddImageCompnent from "../AddImageCompnent";
import DatePickerCompnent from "../DatePickerCompnent";
import AddImageCompnent from "../AddImageCompnent";
import ReactImagePickerEditor, { ImagePickerConf } from "react-image-picker-editor";

export default function NewTaskComonent() {
  var [ProjectName] = useState("");
  var [isPrivate, setProfilePasword] = useState("");

  const Navigate = useNavigate();
  const handleCreate = (e) => {
    console.log("create");
    e.preventDefault();
    console.log(ProjectName);
    console.log(isPrivate);
    console.log(localStorage.getItem("ProfileID"));
    axios
      .post("http://localhost:2003/project/create", {
        ProjectName: ProjectName,
        isPrivate: isPrivate,
        ProfileID: localStorage.getItem("ProfileID"),
      })
      .then((result) => {
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
 const config2: ImagePickerConf = {
  borderRadius: "8px",
  language: "en",
  width: "330px",
  height: "250px",
  objectFit: "contain",
  compressInitial: null,
};
// const initialImage: string = '/assets/images/8ptAya.webp';
const initialImage = "";

  var [ImageSrc, setImageSrc] = useState("");
  return (
    <>
      <form>
        <Box >
          <Box display="flex" justifyContent="center" alignItems="center">
            {" "}
            <h1>Create New Task Page</h1>
          </Box>
          <Box height={35}></Box>
          <TextField
            required
            fullWidth
            name="TaskName"
            label="Task Name"
            type="text"
            id="TaskName"
            autoComplete="TaskName"
            onChange={(e) => (ProjectName = e.target.value)}
          />{" "}
          <Box height={35}></Box>
          <TextField
            required
            fullWidth
            name="TaskDescription"
            label="Task Description"
            type="text"
            id="TaskDescription"
            autoComplete="TaskDescription"
            onChange={(e) => (ProjectName = e.target.value)}
          />{" "}
          <Box height={35}></Box>
          <AddImageCompnent />
          {/* <Container maxWidth="sm" > 
          <Box className="image-picker-container" display="flex" justifyContent="center" alignItems="center" sx={{width:50 ,height:50}}>  
                    <ReactImagePickerEditor 
      config={config2}
      // imageSrcProp={initialImage}
      imageChanged={(newDataUri: any) => {
        setImageSrc(newDataUri);
      }}
    /></Box></Container> */}
          <Box height={35}></Box>
          <DatePickerCompnent />
          <Box></Box>
          <Box marginTop={5} marginLeft={30} marginRight={30} width={300}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              onClick={handleCreate}
              fullWidth
              autoFocus
            >
              Create Task
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
