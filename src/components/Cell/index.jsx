import styles from "./Cell.module.scss";

const Cell = ({ bgColor, cellColor, value, onClick, disabled }) => {
  return (
    <button
      style={{
        "--cell-color": cellColor,
        animationName: "zoomIn",
        animationDuration: "0.5s",
      }}
      className={styles["game-cell"]}
      onClick={onClick}
      disabled = {disabled}
    >
      <p>{value}</p>
    </button>
  );
};

export default Cell
