import React, { useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import AuthLayout from "../../layouts/auth-layout/AuthLayout";
import Logo from "../../components/logo/Logo";
import userIcon from "../../assets/group.png";
import { GoLock } from "react-icons/go";
import { FiUser } from "react-icons/fi";
import { loginUser, getUserProfile } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { authState } from "../../states/authState";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useSetRecoilState(authState);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
  
    try {
      const response = await loginUser(email, password);
      console.log(" API Response:", response);
  
      if (response && response.response) {
        const { token, isFirstLogin, role } = response.response;
  
        if (!token) {
          throw new Error("Token is missing in the response. Please check the backend.");
        }
  
        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("isFirstLogin", isFirstLogin);
  
        const userProfile = await getUserProfile(token);
        const { name, email, photo, userId } = userProfile;
  
        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("photo", photo || "");
  
        setAuth({
          token,
          role,
          name,
          email,
          photo: photo || "",
          userId,
        });
  
        if (isFirstLogin === true) {
          navigate("/change-password");
        } else {
          navigate("/dashboard");
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
           placeholder="Enter your Email"
           icon={<FiUser />}
           value={email}  
           onChange={(e) => setEmail(e.target.value)} 
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