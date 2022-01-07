function init() {

  const gameContainer = document.querySelector('#game-container')
  const rows = 29
  const cols = 29
  const gridArray = [[]]
  const blockIdArray = []

  function addBlockIds() {

    const lines = []
    const line0 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    lines.push(line0)
    const line1 = [0, 6, 7, 8, 20, 21, 22, 28]
    lines.push(line1)
    const line2 = [0, 2, 3, 4, 10, 12, 13, 15, 16, 18, 24, 25, 26, 28]
    lines.push(line2)
    const line3 = [0, 2, 3, 4, 5, 6, 7, 9, 10, 12, 16, 18, 19, 21, 22, 23, 24, 25, 26, 28]
    lines.push(line3)
    const line4 = [0, 2, 3, 4, 12, 14, 16, 24, 25, 26, 28]
    lines.push(line4)
    const line5 = [0, 6, 7, 9, 10, 18, 19, 21, 22, 28]
    lines.push(line5)
    const line6 = [0, 2, 4, 10, 12, 13, 14, 15, 16, 18, 24, 26, 28]
    lines.push(line6)
    const line7 = [0, 2, 6, 7, 8, 10, 13, 14, 15, 18, 20, 21, 22, 26, 28]
    lines.push(line7)
    const line8 = [0, 2, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15, 17, 18, 20, 21, 22, 23, 24, 26, 28]
    lines.push(line8)
    const line9 = [0, 4, 5, 6, 7, 11, 13, 14, 15, 17, 21, 22, 23, 24, 28]
    lines.push(line9)
    const line10 = [0, 1, 2, 4, 9, 19, 24, 26, 27, 28]
    lines.push(line10)
    const line11 = [0, 1, 2, 6, 7, 9, 10, 11, 12, 14, 16, 17, 18, 19, 21, 22, 26, 27, 28]
    lines.push(line11)
    const line12 = [0, 1, 2, 4, 6, 7, 9, 19, 21, 22, 24, 26, 27, 28]
    lines.push(line12)
    const line13 = [0, 1, 2, 9, 11, 12, 13, 15, 16, 17, 19, 26, 27, 28]
    lines.push(line13)
    const line14 = [4, 5, 6, 7, 11, 17, 21, 22, 23, 24]
    lines.push(line14)
    const line15 = [0, 1, 2, 9, 11, 12, 13, 14, 15, 16, 17, 19, 26, 27, 28]
    lines.push(line15)
    const line16 = [0, 1, 2, 4, 5, 7, 8, 9, 19, 20, 21, 23, 24, 26, 27, 28]
    lines.push(line16)
    const line17 = [0, 1, 2, 4, 5, 9, 11, 12, 13, 14, 15, 16, 17, 19, 23, 24, 26, 27, 28]
    lines.push(line17)
    const line18 = [0, 1, 2, 4, 5, 7, 14, 21, 23, 24, 26, 27, 28]
    lines.push(line18)
    const line19 = [0, 4, 5, 7, 8, 10, 11, 12, 14, 16, 17, 18, 20, 21, 23, 24, 28]
    lines.push(line19)
    const line20 = [0, 2, 4, 5, 7, 8, 10, 11, 12, 16, 17, 18, 20, 21, 23, 24, 26, 28]
    lines.push(line20)
    const line21 = [0, 4, 10, 11, 12, 13, 15, 16, 17, 18, 24, 28]
    lines.push(line21)
    const line22 = [0, 1, 2, 4, 6, 8, 10, 11, 12, 13, 15, 16, 17, 18, 20, 22, 24, 26, 27, 28]
    lines.push(line22)
    const line23 = [0, 8, 20, 28]
    lines.push(line23)
    const line24 = [0, 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 28]
    lines.push(line24)
    const line25 = [0, 2, 3, 4, 14, 24, 25, 26, 28]
    lines.push(line25)
    const line26 = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28]
    lines.push(line26)
    const line27 = [0, 28]
    lines.push(line27)
    const line28 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    lines.push(line28)



    for (let row = 0; row < lines.length; row++) {
      lines[row].forEach(col => {

        blockIdArray.push(`r${row}-c${col}`)

      })

    }



    blockIdArray.push('r13-c1')
    blockIdArray.push('r13-c2')
    blockIdArray.push('r13-c11')
    blockIdArray.push('r13-c12')
    blockIdArray.push('r13-c13')
    blockIdArray.push('r13-c15')
    blockIdArray.push('r13-c16')
    blockIdArray.push('r13-c17')
    blockIdArray.push('r13-c26')
    blockIdArray.push('r13-c27')



    blockIdArray.push('r14-c11')
    blockIdArray.push('r14-c17')
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