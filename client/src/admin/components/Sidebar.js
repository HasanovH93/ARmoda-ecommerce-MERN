import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">
            <i className="fa fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel/products">
            <i className="fa fa-box"></i>
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/add-product">
            <i className="fa fa-plus"></i>
            <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link to="/admin-panel/users">
            <i className="fa fa-users"></i>
            <span>Users</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
