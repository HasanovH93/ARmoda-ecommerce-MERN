import styles from "./MiddleBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBagShopping, faSearch } from "@fortawesome/free-solid-svg-icons";

const MiddleBar = () => {
  return (
    <div className={styles.middleBar}>
      <div className={styles.logo}>
        <h1>ARmoda</h1>
      </div>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Search..." />
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
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
