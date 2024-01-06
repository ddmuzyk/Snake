const boardEl = document.querySelector('.board');

const numOfRows = 15;

const player = []
const board = []

const direction = 'left'

const createRows = (numOfRows) => {
  for (let y = 0; y < numOfRows; y++) {
    const row = [];
    for (let x = 0; x < numOfRows; x++) {
      const element = document.createElement('div');
      element.className = 'block'
      element.dataset.x = x
      element.dataset.y = y
      const block = {
        element,
        x,
        y,
        type: 'empty'
      }
      row.push(block)
    }
    board.push(row)
  }
}

const createBoard = (board) => {
  board.forEach((row) => {
    row.forEach((block) => {
      boardEl.appendChild(block.element)
    })
  })
}

const placePlayer = (numOfRows) => {
  let middle = Math.floor(numOfRows/2)
  const block = board[middle][middle]
  block.type = 'player'
  block.element.classList.add('player')
  player.push(block)
}

const move = (player, direction) => {
  const head = player[0]
  const x = parseInt(head.x)
  const y = parseInt(head.y)

  if (direction === 'left') {
    const tile = board[y][x-1]
    const gameOver = checkForLose(tile)
    if (gameOver) return
  } else if (direction === 'right') {
    const tile = board[y][x+1]
    const gameOver = checkForLose(tile)
    if (gameOver) return
  } else if (direction === 'up') {
    const tile = board[y-1][x]
    const gameOver = checkForLose(tile)
    if (gameOver) return
  } else if (direction === 'down') {
    const tile = board[y+1][x]
    const gameOver = checkForLose(tile)
    if (gameOver) return
  }
}

const checkForLose = (tile) => {
  if (!tile) {
    return true
  } else if (tile.type === 'player') {
    console.log('You hit yourself!')
    return true
  }
}

createRows(numOfRows)
createBoard(board)
placePlayer(numOfRows)

move(player, direction)