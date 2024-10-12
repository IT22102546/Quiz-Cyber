import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Header from './Components/Header';
import DashBoard from './Pages/DashBoard';
import PrivateRoute from './Components/PrivateRoute';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import AddQuize from './Pages/AddQuize';
import EditQuiz from './Pages/EditQuiz';
import MainQuize from './Pages/MainQuize';
import Company from './Pages/Company';
import Aboutus from './Pages/Aboutus';

import TrainingQuize from './Pages/TrainingQuize';
import Contactus from './Pages/Contactus';


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        
        <Route path="/company" element={<Company/>}/>
        <Route path="/about" element={<Aboutus/>}/>
        <Route path="/contactus" element={<Contactus/>}/>

       

        <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/mainquize" element={<MainQuize/>}/>
          <Route path="/trainquize" element={<TrainingQuize/>}/>
          
        <Route/>

        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path="/addquize" element={<AddQuize/>}/>
          <Route path="/edit-quiz/:quizId" element={<EditQuiz/>} />
         
        </Route>

      </Routes>

     


    </BrowserRouter>
  )
}
