import React, { useEffect } from "react";
import swal from "sweetalert";
import "./loginSuccess.css";

const LoginSuccessModal = () => {
  useEffect(() => {
    swal({
      title: "Login Successful!",
      text: "You have successfully signed into your account.",
      icon: "success",
      buttons: false, 
      timer: 3000, 
    });
  }, []); 

  return null; 
};

export default LoginSuccessModal;
