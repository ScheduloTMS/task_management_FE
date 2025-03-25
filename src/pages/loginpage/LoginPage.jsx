import React from "react";
import "./LoginPage.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import AuthLayout from "../../layouts/auth-layout/AuthLayout";
import Logo from "../../components/logo/Logo";
import userIcon from "../../assets/group (1).png";
import { BsPerson, BsLock } from "react-icons/bs";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="login-container">
        
        <div className="left-section">
          <Logo />
        </div>

        <div className="divider"></div>

        <div className="right-section">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          
         
          <Input type="text" placeholder="Enter your Username" icon={<BsPerson />} />
          
          
          <Input type="password" placeholder="Enter your Password" icon={<BsLock />} showToggle={true} />

          <Button text="Log in" />
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
