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
// const socket = io.connect("http://localhost:4000");
import './index.css'
function App() {

  return (

    <Routes>
      <Route path='/' element={<Root />} />
      <Route path='/login' element={<LoginView />} />
      <Route path='/signUp' element={<SignUpView />} />
      <Route path='/forgetPassword' element={<ForgetPasswordView />} />
      <Route path='/updatePassword' element={<UpdatePasswordView />} />
      <Route path='/dialog' element={<AlertDialog />} />
      <Route path='/home' element={<HomeView  />} />
      <Route path='/profile' element={<ProfileView />} />
      <Route path='/newProject' element={<CreateNewProjectPage />} />
      <Route path='/project' element={<ProjectView />} />
      <Route path='/Createtask' element={<AddTaskView />} />
      <Route path='/collaborator' element={<ProjectCollaborator />} />

      <Route path="*" element={<ErrorPage />} />

    </Routes>

  )
}

export default App
