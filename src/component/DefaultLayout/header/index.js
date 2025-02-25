import { Link } from "react-router-dom";
import styles from "./header.module.css";
const Header = ({ currenPage = "home" }) => {
  const logo2 = require("../../../assest/game (1).png");

  return (
    <div className={styles.header}>
      <img className={styles.logo} src={logo2}></img>
      <div className={styles.navbar}>
        <Link to="/" className={styles["tab_navbar"]}>
          home
        </Link>
        <Link to="/About" className={styles["tab_navbar"]}>
          about me
        </Link>
        <Link to="/report" className={styles["tab_navbar"]}>
          report
        </Link>
      </div>
      <div className={styles.user}>
        <p className={styles["user-name-short"]}>H</p>
      </div>
    </div>
  );
};

export default Header;
