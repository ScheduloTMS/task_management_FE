import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../states/authState.jsx";

import LoginPage from "../pages/login-page/LoginPage";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Calendar from "../pages/full-calendar/ FullCalendarComponent.jsx";
import TaskPage from "../pages/task/TaskPage.jsx";
import Review from "../pages/task/TaskOverviewPage.jsx";
import TeamPage from "../pages/team-page/TeamPage.jsx"; 
import MessagePage from "../pages/message-page/MessagePage.jsx"; 
import TaskReview from "../components/task-review/TaskReview";

const AppRouter = () => {
  const role = useRecoilValue(authState);

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
          path="/tasks/:taskId"
          element={
            <ProtectedRoute requireFirstLogin={false}>
              <Review />
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

<Route
  path="/messages"
  element={
    <ProtectedRoute requireFirstLogin={false}>
      <MessagePage />
    </ProtectedRoute>
  }
/>


        <Route
          path="/team"
          element={
            <ProtectedRoute requireFirstLogin={false}>
              <TeamPage />
            </ProtectedRoute>
          }

          
        />

<Route
  path="/tasks/:taskId/student/:studentId"
  element={
    <ProtectedRoute requireFirstLogin={false}>
      <TaskReview />
    </ProtectedRoute>
  }
/>





      </Routes>
    </Router>
  );
};

export default AppRouter;
