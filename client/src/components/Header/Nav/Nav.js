import React, { useState } from "react";
import styles from "./Nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navClass = menuOpen
    ? `${styles.topnav} ${styles.responsive}`
    : styles.topnav;
  return (
    <div className={navClass}>
      <button onClick={toggleMenu} className={styles.icon}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <a href="#home" className="active">
        Home
      </a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  );
};

export default Nav;
