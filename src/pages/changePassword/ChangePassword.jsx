import React, { useState } from "react";
import Input from "../../components/input/Input.jsx";
import { FiLock } from "react-icons/fi";
import "./changePassword.css";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false,
  });

  const handleChange = (field, value) => 
  {
    setPasswords((prev) => ({ ...prev, [field]: value }));

    if (field === "newPassword") 
    {
      setValidations({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        number: /\d/.test(value),
      });
    }
  };

  const isPasswordValid = Object.values(validations).every(Boolean);
  const isConfirmMatch = passwords.newPassword === passwords.confirmPassword;

  const handleSubmit = (e) => 
{
    e.preventDefault();
    if (isPasswordValid && isConfirmMatch) {
      alert("Password updated successfully!");
    } else {
      alert("Please fix the errors before proceeding.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change your password</h2>
      <p className="subtext">Set a new password before accessing your account.</p>

      <form onSubmit={handleSubmit}>
        <label>Current Password</label>
        <Input
          type="password"
          placeholder="Enter your current Password"
          icon={<FiLock />}
          showToggle={true}
          onChange={(e) => handleChange("currentPassword", e.target.value)}
        />

        <label>New Password</label>
        <Input
          type="password"
          placeholder="Enter your new Password"
          icon={<FiLock />}
          showToggle={true}
          onChange={(e) => handleChange("newPassword", e.target.value)}
        />

        <label>Confirm New Password</label>
        <Input
          type="password"
          placeholder="Enter your confirm new Password"
          icon={<FiLock />}
          showToggle={true}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />

        <div className="password-validation">
          <p>Please add all necessary characters to create a safe password.</p>
          <ul>
            <li className={validations.length ? "valid" : ""}> Minimum characters 6</li>
            <li className={validations.uppercase ? "valid" : ""}> One uppercase character</li>
            <li className={validations.lowercase ? "valid" : ""}> One lowercase character</li>
            <li className={validations.specialChar ? "valid" : ""}> One special character</li>
            <li className={validations.number ? "valid" : ""}> One number</li>
          </ul>
        </div>

        <button type="submit" className="save-btn" disabled={!isPasswordValid || !isConfirmMatch}>
          Save
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
