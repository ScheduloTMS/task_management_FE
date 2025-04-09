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

    // Client-side validation
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);
      console.log("API Response:", response);

      if (response && response.response) {
        const { token, isFirstLogin, role } = response.response;

        if (!token) {
          throw new Error("Token is missing in the response.");
        }

        localStorage.setItem("authToken", token);
        localStorage.setItem("role", role);
        localStorage.setItem("isFirstLogin", isFirstLogin);

        // First login - redirect to change password
        if (isFirstLogin === true || isFirstLogin === "true") {
          setAuth({
            token,
            role,
            name: "",
            email,
            photo: "",
            userId: "",
            isFirstLogin: true,
          });

          navigate("/change-password");
          return;
        }

        const userProfile = await getUserProfile(token);
        const { name, email: profileEmail, photo, userId } = userProfile;

        localStorage.setItem("userId", userId);
        localStorage.setItem("name", name);
        localStorage.setItem("email", profileEmail);
        localStorage.setItem("photo", photo || "");
        localStorage.setItem("isFirstLogin", "false");

        setAuth({
          token,
          role,
          name,
          email: profileEmail,
          photo: photo || "",
          userId,
          isFirstLogin,
        });

        navigate("/dashboard");
      } else {
        throw new Error("Invalid API response.");
      }
    } catch (err) {
      console.error("Login Error:", err);

      // Friendly error messages
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else if (err.message.includes("Network Error")) {
        setError("Unable to connect to the server. Please try again later.");
      } else {
        setError("Invalid email or password.");
      }
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

            <Button
              text={loading ? "Logging in..." : "Log in"}
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
