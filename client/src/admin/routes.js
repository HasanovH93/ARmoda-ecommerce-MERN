import React from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const routes = [
  {
    path: "/admin-panel",
    renderer: (params = {}) => <Login {...params} />,
  },
  {
    path: "/dashboard",
    renderer: (params = {}) => <Dashboard {...params} />,
  },
];

export default routes;
