import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import pagesRoutes from "./pages/routes";
import adminRoutes from "./admin/routes";

const renderRoutes = (routesArray) => {
  return routesArray.map((route, index) => {
    if (route.children) {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {renderRoutes(route.children)}
        </Route>
      );
    } else {
      return <Route key={index} path={route.path} element={route.element} />;
    }
  });
};

const Routes = () => {
  return (
    <ReactRoutes>
      {pagesRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}
      {renderRoutes(adminRoutes)}

      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
