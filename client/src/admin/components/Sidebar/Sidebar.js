import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../components/header/Logo";
import {
  MdDashboard,
  MdAdd,
  MdPeople,
  MdProductionQuantityLimits,
} from "react-icons/md";
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${styles.sidebar}${
        isCollapsed ? ` ${styles.collapsed}` : ""
      }`}
    >
      <Logo
        imageUrl="/assets/img/logo/logo.png"
        logoClass={styles.dashboardLogo}
      />
      <ul className={styles.sidebarList}>
        <li className={styles.sidebarListItem}>
          <Link to="/dashboard" className={styles.sidebarLink}>
            <MdDashboard className={styles.sidebarIcon} />
            <span className={styles.sidebarText}>Dashboard</span>
          </Link>
        </li>
        <li className={styles.sidebarListItem}>
          <Link to="/admin-panel/products" className={styles.sidebarLink}>
            <MdProductionQuantityLimits className={styles.sidebarIcon} />
            <span className={styles.sidebarText}>Products</span>
          </Link>
        </li>
        <li className={styles.sidebarListItem}>
          <Link to="/dashboard/add-product" className={styles.sidebarLink}>
            <MdAdd className={styles.sidebarIcon} />
            <span className={styles.sidebarText}>Add Product</span>
          </Link>
        </li>
        <li className={styles.sidebarListItem}>
          <Link to="/admin-panel/users" className={styles.sidebarLink}>
            <MdPeople className={styles.sidebarIcon} />
            <span className={styles.sidebarText}>Users</span>
          </Link>
        </li>
      </ul>
      <button className={styles.toggleSidebar} onClick={toggleSidebar}>
        <i className={`fa fa-chevron-left ${styles.toggleSidebarIcon}`}></i>
      </button>
    </div>
  );
};

export default Sidebar;
