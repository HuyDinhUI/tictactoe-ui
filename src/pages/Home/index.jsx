import Play from "../Play";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.Wel}>
          <h1>XO</h1>
          <h1>GAME</h1>
          <p>Created by HuyDinh</p>

          <Link to="/play/mode">play</Link>
          <a href="#tutorial">tutorial</a>
          <a href="#social">social</a>
        </div>

        <div id={styles.tutorial}>
          <h1 style={{ fontFamily: "var(--font-text)", color: "#c77dff" }}>
            tutorial
          </h1>
          <video className={styles["video-tutorial"]} autoPlay loop muted>
            <source ></source>
          </video>
          <h3 style={{ fontFamily: "buble-pixel", color: "#c77dff" }}>!!!</h3>
          <p className={styles.tip}>
            Required size selection. If not selected, the Play button will not
            appear. You must choose size and color then enter the room code.
            Enter the room code provided by the room owner then then join.If
            less than one minute, enter a value starting from 0.9 or less
          </p>
        </div>
      </div>
      <Play/>
    </div>
  );
};

export default Home;
