import React from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../states/authState";

const ProtectedRoute = ({ children, requireFirstLogin = null }) => {
  const { token, isFirstLogin } = useRecoilValue(authState);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (requireFirstLogin === true && !isFirstLogin) {
    return <Navigate to="/dashboard" />;
  }

  if (requireFirstLogin === false && isFirstLogin) {
    return <Navigate to="/change-password" />;
  }


  return children;
};

export default ProtectedRoute;