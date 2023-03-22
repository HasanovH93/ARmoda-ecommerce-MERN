import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import pagesRoutes from "./pages/routes";
import adminRoutes from "./admin/routes";

const Routes = () => {
  return (
    <ReactRoutes>
      {pagesRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {adminRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}

      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
