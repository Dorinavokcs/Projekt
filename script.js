let boardSize;
        let bombCount;

        function updateSettings() {
            const difficultyLevel = document.getElementById("difficultyLevel").value;

            switch (difficultyLevel) {
                case "easy":
                    boardSize = 8;
                    bombCount = 10;
                    break;
                case "medium":
                    boardSize = 10;
                    bombCount = 20;
                    break;
                case "hard":
                    boardSize = 12;
                    bombCount = 30;
                    break;
                case "impossible":
                    boardSize = 15;
                    bombCount = 50;
                    break;
                default:
                    boardSize = 10;
                    bombCount = 20;
                    break;
            }

            resetGame();
            // Üzenetablak a frissítés megerősítésére
 const messageBox = document.getElementById("messageBox");
 messageBox.textContent = "A beállítások sikeresen frissültek";
 messageBox.style.display = "block";

 // Ablak eltűntetése néhány másodperc után
 setTimeout(() => {
     messageBox.style.display = "none";
 }, 3000);
}



        document.addEventListener("DOMContentLoaded", function () {
    const boardSize = 10;
    const bombCount = 20;
    let board = [];
    let revealedCells = 0;

    function initializeBoard() {
        // Create the board
        for (let i = 0; i < boardSize; i++) {
            board[i] = [];
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = { isBomb: false, count: 0, revealed: false };
            }
        }

        // Place bombs randomly
        let bombsPlaced = 0;
        while (bombsPlaced < bombCount) {
            const row = Math.floor(Math.random() * boardSize);
            const col = Math.floor(Math.random() * boardSize);
            if (!board[row][col].isBomb) {
                board[row][col].isBomb = true;
                bombsPlaced++;
            }
        }

        // Calculate counts for non-bomb cells
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (!board[i][j].isBomb) {
                    board[i][j].count = countBombs(i, j);
                }
            }
        }
    }

    function countBombs(row, col) {
        let count = 0;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < boardSize && j >= 0 && j < boardSize && board[i][j].isBomb) {
                    count++;
                }
            }
        }
        return count;
    }

    function revealCell(row, col) {
        const cell = document.getElementById(`cell_${row}_${col}`);
        if (!cell || board[row][col].revealed) {
            return;
        }

        board[row][col].revealed = true;
        revealedCells++;

        if (board[row][col].isBomb) {
            // Game over
            cell.classList.add("bomb");
            alert("Aknára léptél x(");
            resetGame();
        } else {
            // Continue playing
            cell.textContent = board[row][col].count || "";
            cell.classList.add("revealed");
            if (revealedCells === boardSize * boardSize - bombCount) {
                // You won
                alert("Gratulálunk! Nyertél!");
                resetGame();
            } else if (board[row][col].count === 0) {
                // Auto-reveal adjacent cells if count is 0
                for (let i = row - 1; i <= row + 1; i++) {
                    for (let j = col - 1; j <= col + 1; j++) {
                        if (i >= 0 && i < boardSize && j >= 0 && j < boardSize) {
                            revealCell(i, j);
                        }
                    }
                }
            }
        }
    }

    function resetGame() {
       
        board = [];
        revealedCells = 0;
        initializeBoard();
        renderBoard();
        
    }
    
    

    function renderBoard() {
        const boardContainer = document.getElementById("board");
        boardContainer.innerHTML = "";

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                const cell = document.createElement("div");
                cell.id = `cell_${i}_${j}`;
                cell.classList.add("cell");
                cell.addEventListener("click", () => revealCell(i, j));
                boardContainer.appendChild(cell);
            }
        }
    }

    initializeBoard();
    renderBoard();
});
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Nice, you triggered this alert message!', 'success')
  })
}