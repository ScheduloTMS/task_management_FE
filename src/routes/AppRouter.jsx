import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../states/authState";
import LoginPage from "../pages/login-page/LoginPage";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Dashboard from "../pages/dashboard/Dashboard";
import Calendar from "../components/full-calendar/ FullCalendarComponent";
 
const AppRouter = () => {
  const { token, isFirstLogin } = useRecoilValue(authState);  
 
  return (
    <Router>
      <Routes>
        
        
        {/* <Route path="/" element={<TaskOverview />} /> */}
 
      
      
        <Route
          path="/login"
          element={token && isFirstLogin === true ? <Navigate to="/change-password" /> : (token ? <Navigate to="/dashboard" /> : <LoginPage />)}
        />
        
 
        <Route
          path="/change-password"
          element={isFirstLogin === false ? <ChangePassword /> : <Navigate to="/" />}
        />
 
        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/" />}
        />
 
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
 
export default AppRouter;
 
 