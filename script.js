const board = document.querySelector('.board');

const numOfRows = 15;

const player = []

const rows = []

const createRows = (numOfRows) => {
  for (let x = 0; x < numOfRows; x++) {
    const row = [];
    for (let y = 0; y < numOfRows; y++) {
      const element = document.createElement('div');
      element.className = 'block'
      // element.dataset.status = 'empty'
      const block = {
        element,
        x,
        y,
        type: 'empty'
      }
      row.push(block)
    }
    rows.push(row)
  }
}

const createBoard = (rows) => {
  rows.forEach((row) => {
    row.forEach((block) => {
      board.appendChild(block.element)
    })
  })
}

const placePlayer = (numOfRows) => {
  let middle = Math.floor(numOfRows/2)
  const block = rows[middle][middle]
  block.type = 'player'
  block.element.classList.add('player')
  player.push(block)
}

const move = (player, direction) => {

}

createRows(numOfRows)
createBoard(rows)
placePlayer(numOfRows)

console.log(rows)