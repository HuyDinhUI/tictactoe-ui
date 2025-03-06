import { Link } from "react-router-dom";
import styles from "./header.module.css";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

const Header = ({ username = "" }) => {
  const logo2 = require("../../../assest/game (1).png");
  const {setIsLoggedIn} = useContext(AuthContext)
  const nameShort=localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")).username : ""
  const HandleSignOut = () =>{
    setIsLoggedIn(false)
    localStorage.removeItem("token")
   
  }

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
      <Tippy
        placement="bottom-end"
        interactive
        delay={500}
        render={(attrs) => (
          <div className={styles["menu-user"]} tabIndex="-1" {...attrs}>
            <div className={styles["menu-user--container"]}>
              <div className={styles["menu-item"]}>
                <button className={styles["menu-btn"]}>
                  <FontAwesomeIcon className={styles["menu-icon"]} icon={faUser}></FontAwesomeIcon>
                  <p className={styles["menu-title"]}>View user</p>
                </button>
                <button className={styles["menu-btn"]}>
                  <FontAwesomeIcon className={styles["menu-icon"]} icon={faGear}></FontAwesomeIcon>
                  <p className={styles["menu-title"]}>Setting</p>
                </button>
                <button onClick={HandleSignOut} className={styles["menu-btn"]}>
                  <FontAwesomeIcon className={styles["menu-icon"]} icon={faRightFromBracket}></FontAwesomeIcon>
                  <p className={styles["menu-title"]}>Sign out</p>
                </button>
              </div>
            </div>
          </div>
        )}
      >
        <div className={styles.user}>
          <p className={styles["user-name-short"]}>{nameShort.slice(0,1).toUpperCase()}</p>
        </div>
      </Tippy>
    </div>
  );
};

export default Header;
