import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './loginPage.css';

import MainLogo from '../components/Container/MainLogo.jsx';
import LoginForm from '../components/Container/LoginForm.jsx';
import LoginButton from '../components/Button/DefaultButton.jsx';

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
          <LoginButton label='Login'/>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;
