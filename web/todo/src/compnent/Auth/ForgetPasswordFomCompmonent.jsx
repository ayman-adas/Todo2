import React,{useState} from "react";
import { Box,  TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPasswordFomCompmonent() {
    var  [ProfileEmail, setProfileEmail] = useState("");
    var [PASSWORDCode, setPASSWORDCode] = useState("");
      
    const Navigate = useNavigate()
    const handleForget = (e) => {
        console.log('Forget')
        e.preventDefault();
      console.log(ProfileEmail)
      console.log(PASSWORDCode)
        axios
            .post("http://localhost:2003/forgetPassword", {
                ProfileEmail: ProfileEmail,
                PASSWORDCode: PASSWORDCode,

            })
            .then((result) => {
                localStorage.setItem('ProfileEmail',ProfileEmail)
                console.log("forget pass successfully :", result.data);
                Navigate("/updatePassword",);
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        
        <>

        <form >
            <Box marginBottom={14} >
                <Box display="flex"
                    justifyContent="center"
                    alignItems="center">  <h1>Foregt password Page</h1></Box>

                <TextField
                    required
                    fullWidth
                    name="ProfileEmail"
                    label="email adress"
                    type="email"
                    id="ProfileEmail"
                    autoComplete="email"
                    onChange={(e) =>{ ProfileEmail=(e.target.value)
                    
                    }  }              />
                <Box height={35}></Box>

                <TextField
                    required
                    fullWidth
                    id="PASSWORDCode"
                    label="PASSWORD Code"
                    name="PASSWORDCode"
                    autoComplete="text"
                    autoFocus
                    onChange={(e) => PASSWORDCode=(e.target.value)}
                />

               

                <Box marginTop={5}
                    marginLeft={30} marginRight={30} width={100}>
                    <Button variant="contained" size="large"type="submit" onClick={handleForget} fullWidth autoFocus>
                        Reset Password
                    </Button>

                </Box>

            </Box>
            </form>
        </>
    )
}