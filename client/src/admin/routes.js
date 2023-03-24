import React from "react";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

const routes = [
  { path: "/admin-panel/login", element: <Login /> },
  {
    path: "/admin-panel",
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "add-product", element: <AddProduct /> },
    ],
  },
];

export default routes;
