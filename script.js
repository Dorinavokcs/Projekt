function handleClick(event) {
    if (mines.length === 0) {
      plantMines();
      calculateMineCounts();
    }
  
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
  
    if (board[row][col].isMine) {
      revealMines();
      alert("Game Over! You stepped on a mine.");
    } else {
      revealCell(row, col);
    }
  }
  

document.addEventListener("DOMContentLoaded", function () {
    const boardSize = 10;
    const totalMines = 10;
  
    let board = [];
    let mines = [];
  
    function createBoard() {
      for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
          row.push({ isMine: false, revealed: false, count: 0 });
        }
        board.push(row);
      }
    }
  
    function plantMines() {
      for (let i = 0; i < totalMines; i++) {
        let x, y;
        do {
          x = Math.floor(Math.random() * boardSize);
          y = Math.floor(Math.random() * boardSize);
        } while (board[x][y].isMine);
        board[x][y].isMine = true;
        mines.push({ x, y });
      }
    }
  
    function calculateMineCounts() {
      for (let mine of mines) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newX = mine.x + i;
            const newY = mine.y + j;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
              board[newX][newY].count++;
            }
          }
        }
      }
    }
  
    function renderBoard() {
      const gameBoard = document.getElementById("game-board");
      gameBoard.innerHTML = "";
  
      for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
          const cell = document.createElement("div");
          cell.classList.add("cell");
          cell.dataset.row = i;
          cell.dataset.col = j;
  
          cell.addEventListener("click", handleClick);
  
          gameBoard.appendChild(cell);
        }
      }
    }
  
    function handleClick(event) {
      const row = parseInt(event.target.dataset.row);
      const col = parseInt(event.target.dataset.col);
  
      if (board[row][col].isMine) {
        revealMines();
        alert("Game Over! You stepped on a mine.");
      } else {
        revealCell(row, col);
      }
    }
  
    function revealMines() {
      for (let mine of mines) {
        const cell = document.querySelector(`[data-row="${mine.x}"][data-col="${mine.y}"]`);
        cell.classList.add("mine");
        cell.innerHTML = "💣";
      }
    }
  
    function revealCell(row, col) {
      const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  
      if (!board[row][col].revealed) {
        board[row][col].revealed = true;
        cell.classList.add("revealed");
  
        if (board[row][col].count > 0) {
          cell.innerHTML = board[row][col].count;
        } else {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newX = row + i;
              const newY = col + j;
              if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                revealCell(newX, newY);
              }
            }
          }
        }
      }
    }
  
    function startGame() {
      createBoard();
      plantMines();
      calculateMineCounts();
      renderBoard();
    }
  
    startGame();
  });
  