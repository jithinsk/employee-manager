import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Homepage from "../components/homepage";
import AdminHomePage from "../components/admin-homepage";
import Login from "../components/login";
import Signup from "../components/signup";
import Dashboard from "../components/dashboard";
import EmployeeList from "../components/employee-list";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="admin"
          element={
            isAuthenticated ? <AdminHomePage /> : <Navigate to="/login" />
          }
        >
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="employee-list" element={<EmployeeList />}></Route>
          <Route path="*" element={<Navigate to="dashboard" />}></Route>
        </Route>
        <Route
          path=""
          element={
            isAuthenticated ? <Navigate to="admin/dashboard" /> : <Homepage />
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="login" />} />
        </Route>
        <Route index element={<Navigate to="login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
