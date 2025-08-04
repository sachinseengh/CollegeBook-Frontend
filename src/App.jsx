// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import NotFound from './components/NotFound';

import ResendVerificationEmail from './components/Auth/ResendVerificationEmail';
import Verify from './components/Auth/Verify';
import ForgotPassword from './components/Auth/ForgetPassword';
import ChangeForgetPassword from './components/Auth/ChangeForgetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<Verify />} />
        <Route path="/resend-email" element={<ResendVerificationEmail />} />
        <Route path="/forget-password" element={<ForgotPassword/>}/>
        <Route path="/change-password" element={<ChangeForgetPassword />} />
        <Route path="/register" element={<Register />} />
   
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
