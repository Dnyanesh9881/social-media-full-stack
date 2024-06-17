import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login';
import { useSelector } from 'react-redux';

const AuthPage = () => {
    const {authState}=useSelector(state=>state.auth);
  return (
    <div>
        {
authState==="login" ? <Login /> : <Signup />
        }
        
    </div>
  )
}

export default AuthPage;