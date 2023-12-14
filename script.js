// script.js
document.addEventListener('DOMContentLoaded', () => {
    const mineSweeper = document.getElementById('minesweeper');
    const gridSize = 9;
    const totalCells = gridSize * gridSize;
    const totalMines = 10; // Változtathatod a kívánt aknaszámra
    let revealedCells = 0;
  
    function initializeGame() {
      mineSweeper.innerHTML = '';
      revealedCells = 0;
      const mines = Array(totalMines).fill(0).map(() => Math.floor(Math.random() * totalCells));
      
      for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
  
        cell.addEventListener('click', () => revealCell(cell, mines));
        
        if (mines.includes(i)) {
          cell.classList.add('mine');
        }
  
        mineSweeper.appendChild(cell);
      }
    }
  
    function revealCell(cell, mines) {
      const index = parseInt(cell.dataset.index);
  
      if (cell.classList.contains('mine')) {
        alert('Aknára léptél :(');
        revealMines(mines);
        initializeGame();
      } else {
        const mineCount = countNearbyMines(index, mines);
        cell.classList.add('revealed', 'number');
        cell.textContent = mineCount > 0 ? mineCount : '';
  
        revealedCells++;
  
        if (revealedCells === totalCells - totalMines) {
          showWinMessage();
          initializeGame();
        }
  
        if (mineCount === 0) {
          revealEmptyArea(index, mines);
        }
      }
    }
  
    function countNearbyMines(index, mines) {
      const adjacentIndices = getAdjacentIndices(index);
      return adjacentIndices.filter((adjacentIndex) => mines.includes(adjacentIndex)).length;
    }
  
    function getAdjacentIndices(index) {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const indices = [];
  
      for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, gridSize - 1); i++) {
        for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, gridSize - 1); j++) {
          indices.push(i * gridSize + j);
        }
      }
  
      return indices;
    }
  
    function revealEmptyArea(index, mines) {
      const visited = new Set();
      const queue = [index];
  
      while (queue.length > 0) {
        const current = queue.shift();
        const cell = mineSweeper.querySelector(`[data-index="${current}"]`);
        const mineCount = countNearbyMines(current, mines);
  
        if (!visited.has(current)) {
          visited.add(current);
  
          if (mineCount === 0) {
            cell.classList.add('revealed');
            const adjacentIndices = getAdjacentIndices(current);
            queue.push(...adjacentIndices.filter((adjacentIndex) => !visited.has(adjacentIndex)));
          } else {
            cell.classList.add('revealed', 'number');
            cell.textContent = mineCount;
          }
        }
      }
    }
  
    function revealMines(mines) {
      mines.forEach((mineIndex) => {
        const mineCell = mineSweeper.querySelector(`[data-index="${mineIndex}"]`);
        mineCell.classList.add('revealed', 'mine');
      });
    }
  
    function showWinMessage() {
      const winMessage = document.createElement('div');
      winMessage.classList.add('win-message');
      winMessage.textContent = 'Gratulálunk! Nyertél!';
      document.body.appendChild(winMessage);
  
      setTimeout(() => {
        winMessage.remove();
      }, 3000);
    }
  
    initializeGame();
  });
