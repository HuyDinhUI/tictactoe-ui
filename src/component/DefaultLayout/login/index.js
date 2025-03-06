import styles from "./login.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { useForm } from "react-hook-form";
import authorizedAxiosInstance from "../../Utils/AuthorizedAxios";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const { setIsLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogin = async (e) => {
    e.preventDefault()
    const data={
      username:username,
      password:password
    }
    console.log("submit login: ", data);
    try {
      const res = await axios.post(
        "http://localhost:5023/v1/users/login",
        data
      );
      console.log(res.data);
      toast.success(res.data?.message);
      localStorage.setItem("token", JSON.stringify(data));
      setIsLoggedIn(true);
    } catch (error) {
      toast.error(error.response?.data?.message || error?.message)
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles["login-container"]}>
        <form
          onSubmit={submitLogin}
          className={styles["login-form"]}
        >
          <div className={styles["login-header"]}>
            <h2 className={styles["header-title"]}>login</h2>
          </div>
          <input
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className={styles["login-input"]}
            placeholder="enter your username"
            required
          ></input>
          <input
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className={styles["login-input"]}
            placeholder="enter your password"
            required
          ></input>
          <button className={styles["login-btn"]}>submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
