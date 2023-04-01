import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "200px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
