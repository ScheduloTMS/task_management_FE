import { useRecoilState, useResetRecoilState } from 'recoil';
import React from 'react';
import { authState } from '../../states/authState.jsx';
import { changePassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiLock } from "react-icons/fi";
import Input from '../../components/input/Input.jsx'; 

const ChangePassword = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await changePassword(
        passwords.currentPassword,
        passwords.newPassword,
        passwords.confirmPassword, 
        auth.token
      );

      resetAuth(); 
      navigate('/', { state: { passwordChanged: true } });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change your password</h2>
      <p className="subtext">Set a new password before accessing your account.</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>Current Password</label>
        <Input
          type="password"
          placeholder="Enter your current Password"
          icon={<FiLock />}
          showToggle={true}
          value={passwords.currentPassword}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
          required
        />

        <label>New Password</label>
        <Input
          type="password"
          placeholder="Enter your new Password"
          icon={<FiLock />}
          showToggle={true}
          value={passwords.newPassword}
          onChange={(e) => handleChange("newPassword", e.target.value)}
          required
        />

        <label>Confirm New Password</label>
        <Input
          type="password"
          placeholder="Confirm your new Password"
          icon={<FiLock />}
          showToggle={true}
          value={passwords.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          required
        />

        <button 
          type="submit" 
          className="save-btn" 
          disabled={loading || !passwords.newPassword || !passwords.confirmPassword}
        >
          {loading ? "Processing..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;