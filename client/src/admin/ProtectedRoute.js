import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const adminToken = useSelector((state) => state.auth.adminToken);
  console.log(adminToken);

  return adminToken ? <Outlet /> : <Navigate to="/dashboard-login" />;
};

export default ProtectedRoute;
