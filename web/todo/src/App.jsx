import React, { createContext, useState } from 'react';
import {
  Route,
  Routes,
} from "react-router-dom";
import LoginView from './view/Auth/LoginView';
import SignUpView from './view/Auth/SignUpView'
import ForgetPasswordView from './view/Auth/ForgetPasswordView'
import UpdatePasswordView from './view/Auth/UpdatePasswordView';
import Root from './view/Root'
import AlertDialog from './compnent/AlertDialog';
import ErrorPage from './view/ErrorPage';
import HomeView from './view/HomeView';
import ProfileView from './view/ProfileView';
import CreateNewProjectPage from './view/Project/CreateNewProjectPage';
import ProjectView from './view/Project/ProjectView';
import AddTaskView from './view/Tasks/AddTaskView';
import ProjectCollaborator from "./view/Project/ProjectCollaborator"
import { generateQuoteMap } from "./dnd/mockData";
import { Row, Col, Card, CardBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {NavigationProvider }from "./NavigationProvider"
// const socket = io.connect("http://localhost:4000");
import './index.css'
import Board from './dnd/board/Board';
function App() {
  const data = {
    medium: generateQuoteMap(100),
    large: generateQuoteMap(500)
  };
const  isLoggedIn=localStorage.getItem("ProfileID")!=null && localStorage.getItem("ProfileID")!=''
  return (
    <NavigationProvider>
    <Routes>
      <Route path='/' element={<Root />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='signUp' element={<SignUpView />} />
      <Route path='/forgetPassword' element={<ForgetPasswordView />} />
      <Route path='/updatePassword' element={<UpdatePasswordView />} />
      <Route path='/dialog' element={<AlertDialog />} />
      <Route path='/home' element={isLoggedIn? <HomeView loading={false} /> :<LoginView/> }></Route>
      <Route path='/profile' element={ isLoggedIn?<ProfileView />  :<LoginView/>}  />
      <Route path='/newProject' element={isLoggedIn ?<CreateNewProjectPage />  :<LoginView/>} />
      <Route path='/project' element={ isLoggedIn ?<ProjectView /> : <LoginView/>} />
      <Route path='/Createtask' element={isLoggedIn ?<AddTaskView />  :<LoginView/>} />
      <Route path='/collaborator' element={isLoggedIn ? <ProjectCollaborator /> : <LoginView/>} />
      <Route path="*" element={<ErrorPage />} />

    </Routes>
    </NavigationProvider>

  )
}

export default App
