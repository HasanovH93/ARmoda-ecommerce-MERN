import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const ProtectedRoute = () => {
  const adminToken = useSelector((state) => state.auth.adminToken);

  return adminToken ? <Dashboard /> : <Navigate to="/dashboard-login" />;
};

export default ProtectedRoute;
