import React, { useState } from "react";
import styles from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.bottomBar}>
      <nav className={styles.nav}>
        <button className={styles.toggleButton} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <ul
          className={`${styles.menu} ${menuOpen ? styles.open : styles.menu}`}
        >
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
