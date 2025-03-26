
import React from "react";
import Alert from "../../components/modal/Alert";

export const SuccessAlert = (props) => (
  <Alert 
    title="Password Updated!" 
    message='Your password has been updated successfully.<br><br>Back to <a href="/home" class="swal-login-link">Log in</a>'
    icon="success"
    {...props}
  />
);

export const LoginSuccessAlert = (props) => (
  <Alert 
    title="Login Successful!" 
    message="You have successfully signed into your account."
    icon="success"
    {...props}
  />
);

export const ErrorAlert = (props) => (
  <Alert 
    title="Error!" 
    message="Something went wrong. Please try again."
    icon="error"
    {...props}
  />
);

export const WarningAlert = ({ onConfirm, onCancel, ...props }) => (
  <Alert
    title={props.title || ""}  
    message={props.message || "Are you sure you want to delete?"}
    icon=""
    buttons={{
      cancel: {
        text: "Cancel",
        visible: true,
        className: "swal-button-cancel",  
      },
      confirm: {
        text: "Yes",
        visible: true,
        className: "swal-button-confirm",  
      },
    }}
    
    onConfirm={onConfirm}
    onCancel={onCancel}
    {...props}
  />
);


export default {SuccessAlert,
  LoginSuccessAlert,
  ErrorAlert,
  WarningAlert};