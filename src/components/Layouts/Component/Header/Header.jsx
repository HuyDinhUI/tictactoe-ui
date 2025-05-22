import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <img className={styles.logo}></img>
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
          {/* <p className={styles["user-name-short"]}>
            {nameShort.slice(0, 1).toUpperCase()}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
