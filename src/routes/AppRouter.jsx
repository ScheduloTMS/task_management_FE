import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../states/authState.jsx";
import LoginPage from "../pages/login-page/LoginPage";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Calendar from "../components/full-calendar/FullCalendarComponent.jsx";
import TaskPage from "../pages/task/TaskPage.jsx"

const AppRouter = () => {
  const role = useRecoilValue(authState);
  // const isMentor = auth?.role === "MENTOR";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute requireFirstLogin={true}>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireFirstLogin={false}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
  
      <Route
          path="/task"
          element={
            <ProtectedRoute requireFirstLogin={false}>
              <TaskPage />
            </ProtectedRoute>
          }
        />

      <Route
          path="/calendar"
          element={
            <ProtectedRoute requireFirstLogin={false}>
              <Calendar />
            </ProtectedRoute>
          }
        />
         
      </Routes>

    </Router>
  );
};

export default AppRouter;