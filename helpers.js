export const checkForLose = (tile) => {
  if (!tile) {
    console.log('Out of board')
    return true
  } else if (tile.type === 'player') {
    console.log('You hit yourself!')
    return true
  }
}

export const checkForFruit = (tile) => {
  return (tile.type === 'fruit')
}

export const updatePlayer = (player, tile, direction, fruit) => {
  if (!fruit) {
    const lastTile = player[player.length-1]
    lastTile.element.classList.remove('player')
    lastTile.type = 'empty'
  }

  console.log('update')
  
  const lastTile = player[player.length-1]
  

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