import React from "react";
import "./LoginPage.css";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import AuthLayout from "../../layouts/auth-layout/AuthLayout";
import Logo from "../../components/logo/Logo";
import userIcon from "../../assets/group.png";
import { GoLock } from "react-icons/go";
import { FiUser } from "react-icons/fi";

const LoginPage = () => {
  return (
    <AuthLayout>
      <div className="login-container">
        
        <div className="left-section">
          <Logo />
        </div>

        <div className="divider1"></div>

        <div className="right-section">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          
          <div className="log">
          <Input type="text" placeholder="Enter your Username" icon={<FiUser />} />
          
          
          <Input type="password" placeholder="Enter your Password" icon={<GoLock />} showToggle={true} />

          <Button text="Log in" />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
