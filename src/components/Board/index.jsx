import styles from "./Board.module.scss";
import Cell from "../Cell";

const Board = ({ Cells, BgColor, CellColor, onClick, disabled = false }) => {
  return (
    <div
      className={styles.board}
      style={{
        display: "grid",
        margin: "10px",
        padding: "10px",
        gridTemplateColumns: `repeat(${Math.sqrt(Cells.length)},1fr)`,
        gridTemplateRows: `repeat(${Math.sqrt(Cells.length)},1fr)`,
        "--color-bg-board": BgColor,
      }}
    >
      {Cells.map((item, index) => (
        <Cell
          disabled={disabled}
          key={index}
          value={item}
          onClick={() => onClick(index)}
          bgColor={BgColor}
          cellColor={CellColor}
        ></Cell>
      ))}
    </div>
  );
};

export default Board;
