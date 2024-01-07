export const checkForLose = (tile) => {
  if (!tile) {
    return true
  } else if (tile.type === 'player') {
    return true
  }
}

export const checkForFruit = (tile) => {
  return (tile.type === 'fruit')
}

export const updatePlayer = (player, tile, direction, fruit) => {
  const lastTile = player[player.length-1]

  if (!fruit) {
    lastTile.element.classList.remove('player')
    lastTile.type = 'empty'
  }
  
  for (let i = player.length-1; i > 0; i--) {
    player[i] = player[i-1];
  }

  if (fruit) {
    player.push(lastTile)
    tile.element.classList.remove('fruit')
  }

  
  tile.element.classList.add('player')
  tile.type = 'player'
  player[0] = tile
}

export const findEmptyBlocks = (board) => {
  return board.flat().filter((block) => {
    return block.type !== 'player'
  })
}

export const placeFruitRandomly = (blocks) => {
  const block = blocks[Math.floor(Math.random() * blocks.length)]
  block.type = "fruit"
  block.element.classList.add('fruit')
}

export const checkForDirectionChangePossibility = (player, board, direction, numOfRows) => {
  let x = parseInt(player[0].x)
  let y = parseInt(player[0].y)
  switch (direction) {
    case 'left':
      x === 0 ? x = numOfRows - 1 : x--
      return player.length === 1 || (player[1] !== board[y][x])
    case 'right':
      x === numOfRows - 1 ? x = 0 : x++
      return player.length === 1 || (player[1] !== board[y][x])
    case 'up':
      y === 0 ? y = numOfRows - 1 : y--
      return player.length === 1 || (player[1] !== board[y][x])
    case 'down':
      y === numOfRows - 1 ? y = 0 : y++
      return player.length === 1 || (player[1] !== board[y][x])
  }
}