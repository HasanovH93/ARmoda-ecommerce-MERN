import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

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
