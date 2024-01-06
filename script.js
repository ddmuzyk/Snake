import { checkForLose, checkForFruit, updatePlayer, findEmptyBlocks, placeFruitRandomly } from "./helpers.js";

const boardEl = document.querySelector('.board');

const numOfRows = 15;

const player = []
const board = []

let direction = 'left'
let gameOver = false
let gameStarted = false

let interval = 200

let gameInterval

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
  if (!gameOver) {
    const head = player[0]
    const x = parseInt(head.x)
    const y = parseInt(head.y)
  
    if (direction === 'left') {
      const tile = board[y][x-1]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) placeFruitRandomly(findEmptyBlocks(board))
    } else if (direction === 'right') {
      const tile = board[y][x+1]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) placeFruitRandomly(findEmptyBlocks(board))
    } else if (direction === 'up') {
      const tile = board[y-1] && board[y-1][x]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) placeFruitRandomly(findEmptyBlocks(board))
    } else if (direction === 'down') {
      const tile = board[y+1] && board[y+1][x]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) placeFruitRandomly(findEmptyBlocks(board))
    }
  }
}

createRows(numOfRows)
createBoard(board)
placePlayer(numOfRows)
placeFruitRandomly(findEmptyBlocks(board))

// move(player, direction)

window.addEventListener('keydown', (event) => {
  switch(event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== "up") direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
    default:
      return; // exit this handler for other keys
  }
  if (!gameStarted) {
    gameInterval = setInterval(() => {
      move(player, direction)
      gameStarted = true
    }, interval)
  }
})