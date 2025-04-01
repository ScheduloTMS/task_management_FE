import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import AuthLayout from "../../layouts/auth-layout/AuthLayout";
import Logo from "../../components/logo/Logo";
import userIcon from "../../assets/group.png";
import { GoLock } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../states/authState";
import "./LoginPage.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
  
    try {
      const response = await loginUser(userId, password);
      console.log(" API Response:", response);
  
      
      if (response && response.response) {
        const { token, isFirstLogin, role } = response.response;
  
        console.log("isFirstLogin:", isFirstLogin);
        
        if (!token) {
          throw new Error("Token is missing in the response. Please check the backend.");
        }
  
        
        localStorage.setItem("token", token);
        setAuth({ token, role });
  
        
        if (isFirstLogin ===true) {
          navigate("/change-password"); 
        } else {
          
          navigate(role === "student" ? "/dashboard/student" : "/dashboard/mentor");
        }
      } else {
        throw new Error("Invalid API response. Response structure is not as expected.");
      }
    } catch (err) {
      console.error("Login Failed:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthLayout>
      <div className="login-container">
        <div className="left-section">
          <Logo size="large" />
        </div>

        <div className="divider1"></div>

        <div className="right-section">
          <img src={userIcon} alt="User Icon" className="user-icon" />

          <div className="log">
          <Input
           type="text"
           placeholder="Enter your Username"
           icon={<FiUser />}
           value={userId}  
           onChange={(e) => setUserId(e.target.value)} 
          />

          <Input
           type="password"
           placeholder="Enter your Password"
           icon={<GoLock />}
           showToggle={true}
           value={password} 
           onChange={(e) => setPassword(e.target.value)} 
          />


            {error && <p className="error-message">{error}</p>}

            <Button text={loading ? "Logging in..." : "Log in"} onClick={handleLogin} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
