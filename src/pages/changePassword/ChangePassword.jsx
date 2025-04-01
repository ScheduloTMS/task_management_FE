import React, { useState } from "react";
import Input from "../../components/input/Input.jsx";
import { FiLock } from "react-icons/fi";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    length: null,
    uppercase: null,
    lowercase: null,
    specialChar: null,
    number: null
  });

  const handleChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));

    if (field === "newPassword") {
      const hasValue = value.length > 0;
      setValidations({
        length: hasValue ? value.length >= 6 : null,
        uppercase: hasValue ? /[A-Z]/.test(value) : null,
        lowercase: hasValue ? /[a-z]/.test(value) : null,
        specialChar: hasValue ? /[!@#$%^&*(),.?":{}|<>]/.test(value) : null,
        number: hasValue ? /\d/.test(value) : null,
      });
    }
  };

  const isPasswordValid = Object.values(validations).every(val => val === true);
  const isConfirmMatch = passwords.newPassword === passwords.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid && isConfirmMatch) {
      alert("Password updated successfully!");
    } else {
      alert("Please fix the errors before proceeding.");
    }
  };

  const getValidationClass = (condition) => {
    if (condition === null) return "neutral";
    return condition ? "valid" : "invalid";
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
            <li className={getValidationClass(validations.length)}> Minimum characters 6</li>
            <li className={getValidationClass(validations.uppercase)}> One uppercase character</li>
            <li className={getValidationClass(validations.lowercase)}> One lowercase character</li>
            <li className={getValidationClass(validations.specialChar)}> One special character</li>
            <li className={getValidationClass(validations.number)}> One number</li>
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