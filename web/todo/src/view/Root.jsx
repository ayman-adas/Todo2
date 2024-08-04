
import React,{ useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Root() {
    const Navigate = useNavigate()
    useEffect(() => {
        // Navigate to the target page on component mount
        if(localStorage.getItem('token')==null ||localStorage.getItem('token')=='')
        Navigate('/login');
    else
    Navigate('/home');

    }, [Navigate]);
    Navigate("/login",);
    
   }
