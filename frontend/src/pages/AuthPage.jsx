import React, { useState } from 'react'
import Signup from '../components/Signup'
import Login from '../components/Login';

const AuthPage = () => {
    const [islogin, setIsLogin]=useState(false);
  return (
    <div>
        {
islogin ? <Login setIsLogin={setIsLogin} isLogin={islogin}/> : <Signup setIsLogin={setIsLogin} isLogin={islogin}/>
        }
        
    </div>
  )
}

export default AuthPage;