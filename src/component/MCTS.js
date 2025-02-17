


this.onmessage=(e)=>{
  console.log(e)
    const {board,player,interations}=e.data
    
    const MCTS = (board, player, iterations ) => {
        const opponent = player === "X" ? "O" : "X";
        function handle_winner_5x5(board) {

            // Hàm con kiểm tra k ô liên tiếp giống nhau trong mảng
            const size=Math.sqrt(board.length)
            if (size == 3){
              var k=3
            } else {
              var k=4
            }
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
                if (checkLine(line1) || checkLine(line2)) return checkLine(line1)
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
                if (checkLine(line1) || checkLine(line2)) return checkLine(line1)
            }
        
          return null
            
        
        }
        const getAvailableMoves = (board) => {
          return board
            .map((cell, index) => (cell === null ? index : null))
            .filter((index) => index !== null);
        };
      
        const isGameOver = (board) => handle_winner_5x5(board) !== null || getAvailableMoves(board).length === 0;
      
        const simulate = (board, currentPlayer) => {
          let currentBoard = board.slice();
          let turn = currentPlayer;
      
          while (!isGameOver(currentBoard)) {
            const moves = getAvailableMoves(currentBoard);
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            currentBoard[randomMove] = turn;
            turn = turn === "X" ? "O" : "X";
          }
      
          return handle_winner_5x5(currentBoard);
        };
      
        
      
        const moves = getAvailableMoves(board);
        const scores = moves.map(() => 0);
      
        for (let i = 0; i < iterations; i++) {
          const moveIndex = Math.floor(Math.random() * moves.length);
          const move = moves[moveIndex];
          const newBoard = board.slice();
          newBoard[move] = player;
      
          const winner = simulate(newBoard, opponent);
          if (winner === player) scores[moveIndex]++;
          if (winner === opponent) scores[moveIndex]--;
        }
      
        const bestMoveIndex = scores.indexOf(Math.max(...scores));
        return moves[bestMoveIndex]
       
    }
    const best=MCTS(board,player,interations)
    this.postMessage(best)
}