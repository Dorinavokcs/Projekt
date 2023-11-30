const board = document.getElementById('board');
const size = 8; // Pálya mérete (pl.: 8x8)
const numMines = 10; // Aknák száma

let mineLocations = [];

function createBoard() {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
  }
}

function placeMines() {
  for (let i = 0; i < numMines; i++) {
    let randomCell;
    do {
      randomCell = Math.floor(Math.random() * (size * size));
    } while (mineLocations.includes(randomCell));
    mineLocations.push(randomCell);
  }
}

function revealMines() {
  mineLocations.forEach(mine => {
    const cell = board.querySelector(`[data-index='${mine}']`);
    cell.textContent = 'X';
  });
}

function handleCellClick(e) {
  const clickedCell = e.target;
  const index = parseInt(clickedCell.dataset.index);

  if (mineLocations.includes(index)) {
    // Ha aknára kattintott
    revealMines();
    