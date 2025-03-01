import styles from "./login.module.css";
import Tippy from "@tippyjs/react/headless";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
const Login = () => {
  const [username, setUsername] = useState();
  const [mail, setMail] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [haveAccount,setHaveAccount] = useState(true)

  const HandleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: username,
      email: mail,
      age: age,
      gender: gender,
    };

    localStorage.setItem("token", JSON.stringify(data));
   setIsLoggedIn(true)
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-container"]}>
        <form onSubmit={HandleSubmit} className={styles["login-form"]}>
          <div className={styles["login-header"]}>
            <h2 className={styles["header-title"]}>{haveAccount ? "login":"signup"}</h2>
          </div>
          <input
            value={username}
            name="username"
            onChange={e => setUsername(e.target.value)}
            className={styles["login-input"]}
            placeholder="enter your username"
            required
          ></input>
          <input
            value={mail}
            name="email"
            type="email"
            onChange={e => setMail(e.target.value)}
            className={styles["login-input"]}
            placeholder="enter your email"
            required
          ></input>
          <button className={styles["login-btn"]}>{haveAccount ? "play":"submit"}</button>
          <div onClick={()=>{setHaveAccount(!haveAccount)}} className={styles["signup-btn"]}>{haveAccount ? "signup":"login"}</div>
        </form>
      </div>
    </div>
  );
};

export default Login;
