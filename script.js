document.addEventListener('DOMContentLoaded', () => {
    const mineSweeper = document.getElementById('minesweeper');
    const gridSize = 9;
    const totalCells = gridSize * gridSize;
    const totalMines = 10; // Változtathatod a kívánt aknaszámra
    const difficultySelect = document.getElementById('difficultySelect');
    let revealedCells = 0;
    let currentDifficulty = 'easy';
 
  
    var indulasiIdo = new Date(); //oldallal egyutt toltodjon be.

    function initializeGame() {
      mineSweeper.innerHTML = '';
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
      

      const difficultySelect = document.getElementById('difficultySelect');
      difficultySelect.addEventListener('change', changeDifficulty);
    }
    function changeDifficulty() {
      const selectedDifficulty = difficultySelect.value;
      // Frissiti a nehézséget.
      if (selectedDifficulty !== currentDifficulty) {
        currentDifficulty = selectedDifficulty; //nem biztos hogy mukodik, ez arra valo hogy ne valtozoon minden uj jatek utan a nehezseg az alapertelmezettre.
      if (selectedDifficulty === 'easy') {
        totalMines = 10;
      } else if (selectedDifficulty === 'medium') {
        totalMines = 15;
      } else if (selectedDifficulty === 'hard') {
        totalMines = 20;
      }
      initializeGame();
    }
  }

   // Az idő számláló frissítése (1 másodperc) időközönként
   setInterval(function() {
    var jelenlegiIdo = new Date();
    var elteltMasodperc = Math.floor((jelenlegiIdo - indulasiIdo) / 1000);

    var ora = Math.floor(elteltMasodperc / 3600);
    var perc = Math.floor((elteltMasodperc % 3600) / 60);
    var masodperc = elteltMasodperc % 60;

    // az ora formazasa
    var formazottIdo = (ora < 10 ? "0" : "") + ora + ":" +
                       (perc < 10 ? "0" : "") + perc + ":" +
                       (masodperc < 10 ? "0" : "") + masodperc;

    // megjelenjen a html-en keresztul is.
    document.getElementById("ido").textContent = formazottIdo;
}, 1000);


  
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

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (rotationEnabled) {
        cell.classList.add('clicked');
        setTimeout(() => {
          cell.classList.remove('clicked');
        }, 300);
      }
      
    });
  });

  
