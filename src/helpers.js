import * as tf from "@tensorflow/tfjs";

//Hàm kiểm tra thắng
export function handle_winner_5x5(board) {

    // Hàm con kiểm tra k ô liên tiếp giống nhau trong mảng
    const size=Math.sqrt(board.length)
    if (size == 3){
      var k=3
    } else if (size==4) {
      var k=4
    } else {var k=5}
    function checkLine(line) 
    {
        console.log(line)
        let count = 0;

        for (let i=0;i<line.length;i++) 
        {
              
              if (line[i] == 'X')
              {
                count++
                console.log(count)
                if (count==k){
                  return 'X'
                }
                
              } else count=0 
        }

        if (count!=k) count=0 

        for (let i=0;i<line.length;i++) 
        {
            
          if (line[i] === 'O')
          {
            count++
          } else count=0

          if (count===k)
          {
              console.log(count)
              return 'O'
          }

        }
        return null;
    }

    // Kiểm tra các hàng
    for (let row = 0; row < size; row++) {
        let line = [];
        for (let col = 0; col < size; col++) {
            line.push(board[row * size+ col]);
        }
        if (checkLine(line)) return checkLine(line)
    }

    // Kiểm tra các cột
    for (let col = 0; col < size; col++) {
        let line = [];
        for (let row = 0; row < size; row++) {
            line.push(board[row * size + col]);
        }
        if (checkLine(line)) return checkLine(line)
    }

    // Kiểm tra đường chéo chính (từ trái trên xuống phải dưới)
    for (let start = 0; start <= size - k; start++) {
        // Đường chéo từ phía trên
        let line1 = [];
        let line2 = [];
        for (let i = 0; i < size - start; i++) {
            line1.push(board[(start + i) * size + i]); // Đường chéo từ trên xuống
            line2.push(board[i * size + (start + i)]); // Đường chéo từ trái sang phải
        }
        console.log(line1)
        console.log(line2)
        if (checkLine(line1)) return checkLine(line1)
        if (checkLine(line2)) return checkLine(line2)
    }

    // Kiểm tra đường chéo phụ (từ phải trên xuống trái dưới)
    for (let start = 0; start <= size - k; start++) {
        // Đường chéo từ phía trên
        let line1 = [];
        let line2 = [];
        for (let i = 0; i < size - start; i++) {
            line1.push(board[(start + i) * size + (size - 1 - i)]); // Đường chéo phụ từ trên xuống
            line2.push(board[i * size + (size - 1 - start - i)]); // Đường chéo phụ từ phải sang trái
        }
        // console.log(line1)
        // console.log(line2)
        if (checkLine(line1)) return checkLine(line1)
        if (checkLine(line2)) return checkLine(line2)
    }

  return null
    

}

//Hàm kiểm trả hòa
const isBoardFull = (board) => {
    return board.every(cell => cell !== null);
  }

//Hàm tính điểm
const evaluate = (board) => {
    if (handle_winner_5x5(board)==='O') return 10; // người thắng
    if (handle_winner_5x5(board)==='X') return -10; // máy thắng
    return 0;
  }
  
  
  //Hàm đánh giá tình trạng bàn cờ
  const evaluateBoard = (board) => {
    const lines = [];
    const n=board.length
    // Hàng ngang
    for (let row = 0; row < n; row++) {
      const rowStart = row * n;
      const rowEnd = rowStart + n;
      lines.push(board.slice(rowStart, rowEnd));
    }

    // Hàng dọc
    for (let col = 0; col < n; col++) {
      let column = [];
      for (let row = 0; row < n; row++) {
        column.push(board[row * n + col]);
      }
      lines.push(column);
    }

    // Đường chéo chính
    let mainDiagonal = [];
    for (let i = 0; i < n; i++) {
      mainDiagonal.push(board[i * n + i]);
    }
    lines.push(mainDiagonal);

    // Đường chéo phụ
    let antiDiagonal = [];
    for (let i = 0; i < n; i++) {
      antiDiagonal.push(board[i * n + (n - i - 1)]);
    }
    lines.push(antiDiagonal);

    // Tính điểm cho từng dãy
    let score = 0;
    lines.forEach(line => {
      const XCount = line.filter(cell => cell === "X").length;
      const OCount = line.filter(cell => cell === "O").length;

      // Nếu dãy chỉ có O hoặc chỉ có X
      if (XCount === 0) {
        score += Math.pow(10, OCount);  // Càng nhiều O, điểm càng cao
      } else if (OCount === 0) {
        score -= Math.pow(10, XCount);  // Càng nhiều X, điểm càng thấp
      }
    });

    return score;
  };

  //Thuật toán Minimax + depth + alpha-beta
  // export const hard_AI = (board, depth, isMaximizing,alpha,beta) => {
  //   const score = evaluate(board);
    
  //   //Nếu "O" hoặc người chơi thắng
  //   if (score === 10) return 10-depth;
  //   if (score === -10) return depth-10;
  
  //   //Nếu bàn cờ đầy (hoà)
  //   if (isBoardFull(board)) return 0;
  //   if (depth >=3) return evaluateBoard(board)
  
  //   if (isMaximizing) {
  //     let best = -Infinity;
  //     for (let i = 0; i < board.length; i++) {
  //       if (board[i] === null) {
  //         board[i] = "O";
  //         let sr=hard_AI(board, depth + 1, false,alpha,beta)
  //         best = Math.max(best,sr)
  //         board[i] = null
  //         //alpha-beta
  //         alpha=Math.max(alpha,best)
  //         if (beta <= alpha) break
  //       }
  //     }
  //     return best;
  //   } else {
  //     let best = Infinity;
  //     for (let i = 0; i < board.length; i++) {
  //       if (board[i] === null) {
  //         board[i] = "X";
  //         let sr=hard_AI(board, depth + 1, true,alpha,beta)
  //         best = Math.min(best,sr);
  //         board[i] = null;
  //         //alpha-beta
  //         beta=Math.min(beta,best)
  //         if (beta <=alpha) break

  //       }
  //     }
  //     return best;
  //   }
  // }
  
// máy chế độ trung bình
// export const findBestMove_AI_medium = (board) => {

//   // đi nước thắng nếu máy có thể thắng
//   for (let i = 0; i < board.length; i++) {
//     const boardCopy=[...board]
//     if (boardCopy[i]===null){
//       boardCopy[i]='O'
//       if (handle_winner_5x5(boardCopy)==='O') return i
//     }
//   }

//   // chặn người chơi nếu người chơi sắp thắng
//   for (let i = 0; i < board.length; i++) {
//     const boardCopy=[...board]
//     if (boardCopy[i]===null){
//       boardCopy[i]='X'
//       if (handle_winner_5x5(boardCopy)==='X') return i
//     }
//   }
//     return easy_AI(board)
// }

// máy chế độ khó
// export const findBestMove_AI_hard = (board) => {
//   let bestVal = -Infinity;
//   let bestMove = -1;
    
    
//   for (let i = 0; i < board.length; i++) {
//       if (board[i] === null) {
//         board[i] = "O";
//         const moveVal = hard_AI(board, 0, false,-Infinity,Infinity);
//         board[i] = null;
    
//         if (moveVal > bestVal) {
//           bestMove = i;
//           bestVal = moveVal;
//         }
//     }
//   }
  
//   return bestMove;
// }

// máy chế độ dễ
// export const easy_AI = (board) => {
//   let emptyIndexes = [];
//   board.forEach((cell, index) => {
//     if (cell === null) emptyIndexes.push(index);
//   });

//     if (emptyIndexes.length > 0) {
//       const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
//       return randomIndex 
//     }
// }

//MCTS
export const MCTS = (board, player, iterations ) => {
  const opponent = player === "X" ? "O" : "X"

  const getAvailableMoves = (board) => {
    return board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null)
  };

  const isGameOver = (board) => handle_winner_5x5(board) !== null || getAvailableMoves(board).length === 0;

  const simulate = (board, currentPlayer) => {
    let currentBoard = board.slice()
    let turn = currentPlayer

    while (!isGameOver(currentBoard)) {
      const moves = getAvailableMoves(currentBoard)
      const randomMove = moves[Math.floor(Math.random() * moves.length)] 
      currentBoard[randomMove] = turn
      turn = turn === "X" ? "O" : "X"
    }

    return handle_winner_5x5(currentBoard)
  }

  

  const moves = getAvailableMoves(board)
  const scores = moves.map(() => 0)

  for (let i = 0; i < iterations; i++) {
    const moveIndex = Math.floor(Math.random() * moves.length)
    const move = moves[moveIndex]
    const newBoard = board.slice()
    newBoard[move] = player

    const winner = simulate(newBoard, opponent)
    if (winner === player) scores[moveIndex]++
    if (winner === opponent) scores[moveIndex]--
  }

  const bestMoveIndex = scores.indexOf(Math.max(...scores))
  return moves[bestMoveIndex]
};


// máy siêu khó

const MAP_SCORE_COMPUTER = new Map([
  [5, Infinity], [4, 2000], [3, 500], [2, 300], [1, 100]
])
const MAP_POINT_HUMAN = new Map([
  [4, 999999], [3, 1000], [2, 400], [1, 10], [0, 0]
])


export function bot_extreme(board){
  let maxScore=-Infinity
  let pointsComputer=[]
  let listScorePoint=[]
  const cols=Math.sqrt(board.length)
  for (let index=0; index<board.length;index++)
  {
    if (board[index]===null)
    {
      let score=MAP_SCORE_COMPUTER.get(Math.max(getCountFlat(index, 0, 1, 'O', board, cols),getCountFlat(index, 1, 0, 'O', board, cols),getCountFlat(index, -1, 1, 'O', board, cols),getCountFlat(index, -1, -1, 'O', board, cols)))
      +MAP_POINT_HUMAN.get(Math.max(getCountFlat(index, 0, 1, 'X', board, cols),getCountFlat(index, 1, 0, 'X', board, cols),getCountFlat(index, -1, 1, 'X', board, cols),getCountFlat(index, -1, -1, 'X', board, cols))-1)
      if (maxScore <= score) {
        maxScore = score
        listScorePoint.push({
            "score": score,
            "point": [index],
        })
      }
    }
  }
  for (const element of listScorePoint) {
    if (element.score === maxScore) {
        pointsComputer.push(element.point)
    }
  }
  return pointsComputer[Math.floor(Math.random()*pointsComputer.length)]
}

function getCountFlat(index, dx, dy, player, matrixFlat, cols) {
  let count = 1;
  let rows = Math.floor(matrixFlat.length / cols); // Số hàng trong "ma trận"

  const size=Math.sqrt(matrixFlat.length)
  if (size===3){
    var k=3
  } else if (size===4){
    var k=4
  } else var k=5

  // duyệt phía trước / phía trên
  for (let i = 1; i < k; i++) {
      let row = Math.floor(index / cols) + i * dx;
      let col = (index % cols) + i * dy;
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
          let newIndex = row * cols + col;
          if (matrixFlat[newIndex] === player) {
              count++;
          } else {
              break;
          }
      } else {
          break;
      }
  }

  // duyệt phía sau / phía dưới
  for (let i = 1; i < k; i++) {
      let row = Math.floor(index / cols) - i * dx;
      let col = (index % cols) - i * dy;
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
          let newIndex = row * cols + col;
          if (matrixFlat[newIndex] === player) {
              count++;
          } else {
              break;
          }
      } else {
          break;
      }
  }

  return count;
}









 

