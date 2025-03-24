import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';

import MainLogo from '../Components/Container/MainLogo.jsx';
import LoginForm from '../Components/Container/LoginForm.jsx';
import LoginButton from '../Components/Button/LoginButton';

const LoginPage = () => {
  return (
    <div className="container">

        <div className="logo-container">
          <MainLogo />
        </div>

      <div className="divider"></div>
      
      <div className="right-section">
        <div className="form-container">
          <LoginForm />
          <LoginButton />
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
