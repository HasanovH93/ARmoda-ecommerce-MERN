import MiddleBar from "./MidleBar/MiddleBar";
import Nav from "./Nav/Nav";
import TopBar from "./TopBar/TopBar";
import styles from "./Header.module.css";
import Divider from "../common/Divider/Divider";

const Header = () => {
  return (
    <header className={styles.header}>
      <TopBar />
      <Divider />
      <MiddleBar />
      <Divider />
      <Nav />
    </header>
  );
};

export default Header;
