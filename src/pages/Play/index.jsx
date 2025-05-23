import { use, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import styles from "./Play.module.scss";
import Board from "../../components/Board";

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
    title: "extr",
    value: "extreme",
  },
];

const size_list = [
  {
    title: "3x3",
    value: 9,
  },
  {
    title: "5x5",
    value: 25,
  },
  {
    title: "7x7",
    value: 49,
  },
  {
    title: "9x9",
    value: 81,
  },
];

const mode_options = [
  {
    title: "computer",
    value: "computer",
  },
  {
    title: "player",
    value: "player",
  },
  {
    title: "online",
    value: "online",
  },
];

const style_board_colors = [
  {
    background: "#fff",
    cell: "#c77dff",
    text: "#fff",
  },
  {
    background: "#c77dff",
    cell: "#fff",
    text: "#3c096c",
  },
];

const Play = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [size, setSize] = useState(9);
  const [mode, SetMode] = useState("computer");
  const [board, setBoard] = useState([
    "x",
    "o",
    "o",
    "o",
    "x",
    "o",
    "o",
    "x",
    "x",
  ]);
  console.log(difficulty);
  console.log(size);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={styles["mode-item"]}>
          <div className={styles["mode-item-content"]}>
            <div className={styles["mode-options"]}>
              {mode_options.map((item, index) => {
                return (
                  <label
                    key={index}
                    style={{
                      opacity: mode === item.value ? "100%" : "50%",
                      textDecoration:
                        mode === item.value ? "underline" : "none",
                    }}
                    className={styles["mode-option"]}
                  >
                    <input
                      name="mode"
                      value={item.value}
                      onChange={(e) => SetMode(e.target.value)}
                      hidden
                      type="radio"
                    ></input>
                    <p>{item.title}</p>
                  </label>
                );
              })}
            </div>
            <div className={styles.difficulty}>
              {difficulty_list.map((item, index) => {
                return (
                  <label
                    key={index}
                    style={{
                      opacity:
                        difficulty === item.value && mode === "computer"
                          ? "100%"
                          : "50%",
                    }}
                    className={styles["difficulty-item"]}
                  >
                    <input
                      disabled={mode === "computer" ? false : true}
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
            <div className={styles.sizes}>
              {size_list.map((item, index) => {
                return (
                  <label
                    key={index}
                    style={{
                      opacity: size == item.value ? "100%" : "50%",
                    }}
                    className={styles["sizes-item"]}
                  >
                    <input
                      name="size"
                      value={item.value}
                      onChange={(e) => setSize(e.target.value)}
                      hidden
                      type="radio"
                    ></input>
                    <p>{item.title}</p>
                  </label>
                );
              })}
            </div>
            <div className={styles["style-board"]}>
              <Board
                disabled={true}
                Cells={board}
                BgColor={"#fff"}
                CellColor={"#c77dff"}
              />
              <div className={styles["style-board-options"]}>
                {style_board_colors.map((item, index) => {
                  return (
                    <div className={styles["style-color-group"]}>
                      <div style={{backgroundColor:item.background}} className={styles["color-item"]}></div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button>PLAY THIS MODE</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Play;
