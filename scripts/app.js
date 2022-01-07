function init() {

  const gameContainer = document.querySelector('#game-container')
  const rows = 29
  const cols = 29
  const gridArray = [[]]
  const blockIdArray = [
    // 'r0-c0',
    // 'r0-c1',
    // 'r0-c2'

  ]

  function addBlockIds() {

    //top and bottom borders

    for (let i = 0; i < cols; i++) {
      blockIdArray.push(`r0-c${i}`)
      blockIdArray.push(`r${rows - 1}-c${i}`)
    }

    //left and right borders

    for (let i = 0; i < rows; i++) {

      if (i !== 11 && i !== 12 && i !== 14 && i !== 16 && i !== 17) {
        blockIdArray.push(`r${i}-c0`)
        blockIdArray.push(`r${i}-c${cols - 1}`)
      }
    }

    blockIdArray.push('r13-c11')
    blockIdArray.push('r13-c12')
    blockIdArray.push('r13-c13')
    blockIdArray.push('r13-c15')
    blockIdArray.push('r13-c16')
    blockIdArray.push('r13-c17')
    blockIdArray.push('r15-c11')
    blockIdArray.push('r15-c12')
    blockIdArray.push('r15-c13')
    blockIdArray.push('r15-c14')
    blockIdArray.push('r15-c15')
    blockIdArray.push('r15-c16')
    blockIdArray.push('r15-c17')


  }

  addBlockIds()
  console.log(blockIdArray)



  console.log(gameContainer)

  function createGrid() {

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        const tempCell = document.createElement('div')
        tempCell.classList.add('cell')
        tempCell.id = `r${row}-c${col}`
        tempCell.style.gridColumnStart = col + 1
        tempCell.style.gridRowStart = row + 1

        gameContainer.appendChild(tempCell)

      }

    }

  }

  function createGridArray() {

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        gridArray[row].push({ block: false, pacman: false })

        // add blocks

        blockIdArray.forEach(blockId => {

          if (blockId === `r${row}-c${col}`) {
            gridArray[row][col].block = true

          }


        })


      }

      gridArray.push([])

    }

  }

  function updateGrid() {


    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        cells.forEach(cell => {

          if (cell.id === `r${row}-c${col}`) {

            if (gridArray[row][col].block) {

              cell.classList.add('block')

            }

          }

        })
        gridArray[row].push({ block: true })

      }

    }


  }

  createGrid()
  const cells = document.querySelectorAll('.cell')
  createGridArray()
  updateGrid()
  console.log(gridArray)
}

window.addEventListener('DOMContentLoaded', init)