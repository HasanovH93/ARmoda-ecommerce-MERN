import React from "react";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import adminRoutes from "./admin/routes";
import pagesRoutes from "./pages/routes";

const Routes = () => {
  return (
    <ReactRoutes>
      {pagesRoutes.map((item, i) => (
        <Route key={i} path={item.path} element={item.renderer()} />
      ))}

      {adminRoutes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element}>
          {route.children &&
            route.children.map((childRoute, j) => (
              <Route
                key={j}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
        </Route>
      ))}

      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </ReactRoutes>
  );
};

export default Routes;
