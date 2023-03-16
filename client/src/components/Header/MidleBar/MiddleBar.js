import styles from "./MiddleBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons"; // Import regular icons
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"; // Import solid icons

// ... other imports ...
const MiddleBar = () => {
  return (
    <div className={styles.middleBar}>
      <div className={styles.logo}>
        <h1>Your Store</h1>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.iconGroup}>
        <a href="#">
          <FontAwesomeIcon icon={faUser} className={styles.icon} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faBagShopping} className={styles.icon} />
        </a>
      </div>
    </div>
  );
};

export default MiddleBar;
