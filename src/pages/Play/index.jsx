import { useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import styles from "./Play.module.scss";

const difficulty_list = [
  {
    title: "easy",
    value: "easy",
  },
  {
    title: "medium",
    value: "medium",
  },
  {
    title: "hard",
    value: "hard",
  },
  {
    title: "extreme",
    value: "extreme",
  },
];

const Play = () => {
  const [difficulty, setDifficulty] = useState("easy");
  console.log(difficulty);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["mode-list"]}>
          <Card className={styles["mode-item"]}>
            <h2>Player vs Computer</h2>
            <div className={styles["mode-item-content"]}>
              <div className={styles.difficulty}>
                {difficulty_list.map((item, index) => {
                  return (
                    <label
                      key={index}
                      style={{
                        opacity: difficulty === item.value ? "100%" : "50%",
                      }}
                      className={styles["difficulty-item"]}
                    >
                      <input
                        name="difficulty"
                        value={item.value}
                        onChange={(e) => setDifficulty(e.target.value)}
                        hidden
                        type="radio"
                      ></input>
                      <p>{item.title}</p>
                    </label>
                  );
                })}
              </div>
            </div>
          </Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default Play;
