import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/header/Logo";
import { MdDashboard, MdAdd, MdPeople, MdLocalShipping } from "react-icons/md";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const iconSize = isCollapsed ? 24 : 18;

  return (
    <div className={`sidebar${isCollapsed ? " collapsed" : ""}`}>
      <Logo imageUrl="/assets/img/logo/logo.png" logoClass="dashboard-logo" />
      <ul>
        <li>
          <Link to="/dashboard">
            <MdDashboard />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel/products">
            <MdLocalShipping size={iconSize} />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/add-product">
            <MdAdd />
            <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel/users">
            <MdPeople />
            <span>Users</span>
          </Link>
        </li>
      </ul>
      <button className="toggle-sidebar" onClick={toggleSidebar}>
        <i className="fa fa-chevron-left"></i>
      </button>
    </div>
  );
};

export default Sidebar;
