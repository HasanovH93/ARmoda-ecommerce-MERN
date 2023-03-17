import styles from "./TopBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.socialMediaIcons}>
        <a href="#">
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faFacebookF} />
          </span>
        </a>
        <a href="#">
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faTwitter} />
          </span>
        </a>
        <a href="#">
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faInstagram} />
          </span>
        </a>
        <a href="#">
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </span>
        </a>
      </div>
      <div className={styles.topBarText}>
        Free Shipping This Week Order Over - $55
      </div>
      <div className={styles.dropdowns}>
        <select className={styles.select}>
          <option>EN</option>
          <option>ES</option>
        </select>
        <select className={styles.select}>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
  );
};

export default TopBar;
