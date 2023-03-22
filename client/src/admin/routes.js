import React from "react";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const routes = [
  {
    path: "/admin-panel",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [{ path: "add-product", element: <AddProduct /> }],
  },
];

export default routes;
