import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element, path }) => {
  const adminToken = useSelector((state) => state.auth.adminToken);

  if (!adminToken) {
    return <Navigate to="/admin-panel/login" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};

export default ProtectedRoute;
