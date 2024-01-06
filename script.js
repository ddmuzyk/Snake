import { checkForLose, checkForFruit, updatePlayer, findEmptyBlocks, placeFruitRandomly, checkForDirectionChangePossibility } from "./helpers.js";

const boardEl = document.querySelector('.board');
const scoreEl = document.querySelector('#score-val');
const modalEl = document.querySelector('.modal');
const modalBtn = document.querySelector('#play-again-btn');
const modalScore = document.querySelector('#final-score');
const highScoreEl = document.querySelector('#high-score');

const numOfRows = 15;

let player = []
const board = []

let direction = 'left'
let gameOver = false
let gameStarted = false

let interval = 150
let score = 0

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
        showModal()
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) {
        score++ 
        scoreEl.textContent = score
        placeFruitRandomly(findEmptyBlocks(board))
      }
    } else if (direction === 'right') {
      const tile = board[y][x+1]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        showModal()
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) {
        score++
        scoreEl.textContent = score
        placeFruitRandomly(findEmptyBlocks(board))
      }
    } else if (direction === 'up') {
      const tile = board[y-1] && board[y-1][x]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        showModal()
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) {
        score++
        scoreEl.textContent = score
        placeFruitRandomly(findEmptyBlocks(board))
      }
    } else if (direction === 'down') {
      const tile = board[y+1] && board[y+1][x]
      const gameLost = checkForLose(tile)
      if (gameLost) {
        gameOver = true
        clearInterval(gameInterval)
        showModal()
        return
      }
      const encounteredFruit = checkForFruit(tile)
      updatePlayer(player, tile, direction, encounteredFruit)
      if (encounteredFruit) {
        score++
        scoreEl.textContent = score
        placeFruitRandomly(findEmptyBlocks(board))
      }
    }
  }
}

// Reset game

const resetGame = () => {
  board.forEach((row) => {
    row.forEach((block) => {
      block.element.classList.remove('player')
      block.element.classList.remove('fruit')
      block.type = 'empty'
    })
  })
  player = []
  placePlayer(numOfRows)
  placeFruitRandomly(findEmptyBlocks(board))
  gameOver = false
  gameStarted = false
  direction = 'left'
  score = 0
  scoreEl.textContent = 0
  modalEl.style.display = 'none'
}

const showModal = () => {
  modalScore.textContent = score
  let highScore = localStorage.getItem('highScore')
  if (!highScore) {
    localStorage.setItem('highScore', score)
    highScore = score
  } else if (score >= highScore) {
    localStorage.setItem('highScore', score)
    highScore = score
  }
  highScoreEl.textContent = highScore
  modalEl.style.display = 'flex'
}

createRows(numOfRows)
createBoard(board)
placePlayer(numOfRows)
placeFruitRandomly(findEmptyBlocks(board))

window.addEventListener('keydown', (event) => {

  switch(event.key) {
    case 'ArrowUp':
      if (checkForDirectionChangePossibility(player, board, 'up')) direction = 'up';
      break;
    case 'ArrowDown':
      if (checkForDirectionChangePossibility(player, board, 'down')) direction = 'down';
      break;
    case 'ArrowLeft':
      if (checkForDirectionChangePossibility(player, board, 'left')) direction = 'left';
      break;
    case 'ArrowRight':
      if (checkForDirectionChangePossibility(player, board, 'right')) direction = 'right';
      break;
    default:
      return;
  }
  if (!gameStarted) {
    gameInterval = setInterval(() => {
      move(player, direction)
      gameStarted = true
    }, interval)
  }
})

modalBtn.addEventListener('click', () => {
  resetGame()
})