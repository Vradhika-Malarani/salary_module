import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Aboutus from './Aboutus';
import Feedback from './Feedback';
import Contactus from './Contactus';
import Admindash from './Admindash';
import Addemployee from './Addemployee';
import Addsalary from './Addsalary';
import Userdash from './Userdash';
import Team from './Team';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        
        <Route path='/Aboutus' element={<Aboutus />} />
        <Route path='/Feedback' element={<Feedback />} />
        <Route path='/Contactus' element={<Contactus />} />
        <Route path='/Admindash' element={<Admindash />} />
        <Route path='/Addemployee' element={<Addemployee />} />
        <Route path='/Addsalary' element={<Addsalary />} />
        <Route path='/Userdash' element={<Userdash />} />
        <Route path='/Team' element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
