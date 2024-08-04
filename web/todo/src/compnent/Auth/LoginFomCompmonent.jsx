import React,{useState} from "react";
import { Box, Container, Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginFomCompmonent() {
    const navigate = useNavigate()
    var  [ProfileEmail, setProfileEmail] = useState("");
    var [ProfilePasword, setProfilePasword] = useState("");
      
    const Navigate = useNavigate()
    const handleLogin = (e) => {
        console.log('login')
        e.preventDefault();
      console.log(ProfileEmail)
      console.log(ProfilePasword)
        axios
            .post("http://localhost:2003/login", {
                ProfileEmail: ProfileEmail,
                ProfilePasword: ProfilePasword,

            })
            .then((result) => {


                console.log("Login successfully :", result.data);
                console.log(result.data)
                localStorage.setItem('ProfileID',result.data.ProfileID)
                console.log(result.data.ProfileID)

                localStorage.setItem('ProfileName',result.data.ProfileName)
                localStorage.setItem('ProfileEmail',result.data.ProfileEmail)

                localStorage.setItem('token',result.data.result)
                Navigate("/",);
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
        <form method="post"  action="http://localhost:2003/login">
            <Box  marginBottom={14} >
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">  <h1>Login Page</h1></Box>
                <Box height={35}></Box>

                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="ProfileEmail"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => ProfileEmail = (e.target.value)}
                    />
                <Box height={35}></Box>
                <TextField
                    required
                    fullWidth
                    name="ProfilePasword"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => ProfilePasword = (e.target.value)}

                />
                <Box height={15}></Box>

                <Container>
                    <Button variant="text" onClick={() => navigate("/forgetPassword")} fullWidth>  forget pass</Button>
                </Container>

                <Box marginTop={10}
                    marginLeft={30} marginRight={30} width={100}>
                    <Button variant="contained" size="large" type="submit" onClick={handleLogin} fullWidth autoFocus>
                        Login                    </Button>
                </Box>
                <Box height={35}></Box>
                <Stack direction="row" gap={0}>
               <h3> dont have an account: </h3>
                   <Button variant="text" size="large"  onClick={() => navigate("/signUp")}   autoFocus>
                        sign up                    </Button>
               </Stack>
            </Box>
            </form>
        </>
    )
}