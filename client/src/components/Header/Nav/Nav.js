import React from "react";
import styles from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={styles.bottomBar}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/signin">Sign In</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
