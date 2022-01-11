function init() {

  //Classes

  class Sprite {

    constructor(name, type, behaviour, controller, nextMove, row, col) {
      this.name = name
      this.type = type
      this.behaviour = behaviour
      this.controller = controller
      this.nextMove = nextMove
      this.row = row
      this.col = col
      this.rowMomentum = 0
      this.colMomentum = 0
      this.currentMove


    }


    move() {

      let tunnel = false
      this.rowMomentum = 0
      this.colMomentum = 0

      //this moves the sprite at the next interval using the latest keystroke, if possible

      switch (this.nextMove) {
        case 'up':
          gridArray[this.row - 1][this.col].block ? this.rowMomentum = 0 : this.rowMomentum = -1
          break
        case 'down':
          gridArray[this.row + 1][this.col].block ? this.rowMomentum = 0 : this.rowMomentum = +1
          break
        case 'left':
          this.row === 14 && this.col === 0 ? tunnel = true : tunnel = false
          tunnel ? this.col = 28 : this.col = this.col
          gridArray[this.row][this.col - 1].block ? this.colMomentum = 0 : this.colMomentum = -1
          break
        case 'right':
          this.row === 14 && this.col === 28 ? tunnel = true : tunnel = false
          tunnel ? this.col = 0 : this.col = this.col
          gridArray[this.row][this.col + 1].block ? this.colMomentum = 0 : this.colMomentum = +1
          break


      }

      //If the next move is blocked, the player will continue in their current direction until the next move is available.

      if (this.rowMomentum === 0 && this.colMomentum === 0) {


        switch (this.currentMove) {
          case 'up':
            gridArray[this.row - 1][this.col].block ? this.rowMomentum = 0 : this.rowMomentum = -1
            break
          case 'down':
            gridArray[this.row + 1][this.col].block ? this.rowMomentum = 0 : this.rowMomentum = +1
            break
          case 'left':
            this.row === 14 && this.col === 0 ? tunnel = true : tunnel = false
            tunnel ? this.col = 28 : this.col = this.col
            gridArray[this.row][this.col - 1].block ? this.colMomentum = 0 : this.colMomentum = -1
            break
          case 'right':
            this.row === 14 && this.col === 28 ? tunnel = true : tunnel = false
            tunnel ? this.col = 0 : this.col = this.col
            gridArray[this.row][this.col + 1].block ? this.colMomentum = 0 : this.colMomentum = +1
            break


        }

      } else {

        this.currentMove = this.nextMove

      }

      this.currentMove === 'right' & tunnel ? gridArray[this.row][28][this.type] = false : gridArray[this.row][this.col][this.type] = false
      this.currentMove === 'left' & tunnel ? gridArray[this.row][0][this.type] = false : gridArray[this.row][this.col][this.type] = false

      this.row += this.rowMomentum
      this.col += this.colMomentum

      gridArray[this.row][this.col]['direction'] = this.currentMove
      gridArray[this.row][this.col][this.type] = true

    }

  }

  //Global Variables

  const gameContainer = document.querySelector('#game-container')
  const rows = 29
  const cols = 29
  const gridArray = [[]]
  const blockIdArray = []
  const startPauseBtn = document.querySelector('#start-pause')
  let isRunning = false
  let frame
  const sprites = []
  const pacman = new Sprite('pacman', 'pacman', 'run', 'player', 'null', 13, 18)
  sprites.push(pacman)
  const ghost1 = new Sprite('ghost1', 'ghost1', 'chase', 'computer', 'null', 14, 14)
  sprites.push(ghost1)

  //Functions

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

  }

  function createGrid() {

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        const tempCell = document.createElement('div')
        tempCell.classList.add('cell')

        sprites.forEach(sprite => {

          if (row === sprite.row && col === sprite.col) {
            tempCell.classList.add(sprite.type)
          }

        })



        tempCell.id = `r${row}-c${col}`
        tempCell.style.gridColumnStart = col + 1
        tempCell.style.gridRowStart = row + 1

        gameContainer.appendChild(tempCell)

      }

    }

  }

  function createGridArray() {

    //adds the different key value pairs to the gridArray object

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        gridArray[row].push({})
        gridArray[row][col].block = false
        gridArray[row][col].isCorner = false

        sprites.forEach(sprite => {

          gridArray[row][col][sprite.type] = false

        })

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

            sprites.forEach(sprite => {

              gridArray[row][col][sprite.type] ? cell.classList.add(sprite.type) : cell.classList.remove(sprite.type)

            })

            gridArray[row][col].direction === 'right' ? cell.classList.add('right') : cell.classList.remove('right')
            gridArray[row][col].direction === 'left' ? cell.classList.add('left') : cell.classList.remove('left')
            gridArray[row][col].direction === 'up' ? cell.classList.add('up') : cell.classList.remove('up')
            gridArray[row][col].direction === 'down' ? cell.classList.add('down') : cell.classList.remove('down')

            gridArray[row][col].block ? cell.classList.add('block') : cell.classList.remove('block')


          }

        })

      }

    }


  }

  function logKey(e) {
    console.log(e.keyCode)
    if (e.keyCode === 38) {

      pacman.nextMove = 'up'

    } else if (e.keyCode === 40) {


      pacman.nextMove = 'down'

    } else if (e.keyCode === 37) {


      pacman.nextMove = 'left'

    } else if (e.keyCode === 39) {


      pacman.nextMove = 'right'

    } else if (e.keyCode === 87) {


      ghost1.nextMove = 'up'

    } else if (e.keyCode === 83) {


      ghost1.nextMove = 'down'

    } else if (e.keyCode === 65) {


      ghost1.nextMove = 'left'

    } else if (e.keyCode === 68) {


      ghost1.nextMove = 'right'

    }
  }

  function startPause() {

    if (isRunning) {

      clearInterval(frame)
      startPauseBtn.innerHTML = 'Resume'
      isRunning = false

    } else {

      startTimer()
      startPauseBtn.innerHTML = 'Pause'
      isRunning = true

    }

  }

  function startTimer() {

    frame = setInterval(() => {

      sprites.forEach(sprite => {

        sprite.move()
      }
      )
      updateGrid()

    }, 5)

  }

  function findCorners() {

    let distance = 0

    //identify which cells are corners

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {

        if (gridArray[row][col].block || row === 14 && col === 28 || row === 14 && col === 0) {

          gridArray[row][col].isCorner = false

        } else {

          let up
          let down
          let left
          let right
          let cornerCount = 0
          gridArray[row][col].isCorner = false

          // if (row === 23 && col === 6) console.log(gridArray[row - 1][col].block)

          gridArray[row - 1][col].block ? up = false : up = true
          gridArray[row + 1][col].block ? down = false : down = true
          gridArray[row][col - 1].block ? left = false : left = true
          gridArray[row][col + 1].block ? right = false : right = true

          up ? cornerCount += 1 : cornerCount += 0
          down ? cornerCount += 1 : cornerCount += 0
          left ? cornerCount += 1 : cornerCount += 0
          right ? cornerCount += 1 : cornerCount += 0

          if (cornerCount > 2) {
            gridArray[row][col].isCorner = true
          } else if (!((up && down) || (left && right))) {

            gridArray[row][col].isCorner = true

          }

        }
      }
    }

    //identify which corners are connected

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {





        if (gridArray[row][col].block) {

          gridArray[row][col].corners = []

        } else {

          gridArray[row][col].corners = []

          //corner data saved as [corner row, corner col, distance to corner]
          //check until blocked and return cell id and distance

          //find right corner

          const directions = ['right', 'left', 'up', 'down']

          directions.forEach(direction => {

            let rowDistance = 0
            let colDistance = 0
            let tunnel = false
            let operator
            let rowDistanceMultiplier = 0
            let colDistanceMultiplier = 0

            //allows the while loop to ignore the starting cell
            let skipFirst = true

            direction === 'right' || direction === 'down' ? operator = 1 : operator = -1
            direction === 'right' || direction === 'left' ? colDistanceMultiplier = 1 : rowDistanceMultiplier = 1
            // if (direction === 'right') colDistance = 1
            // if (direction === 'left') colDistance = 1


            // console.log(direction, row, col)
            // if (row === 1 && col === 1) console.log('it made it here', row + (rowDistance * operator), col + (colDistance * operator))


            while (!(gridArray[row + (rowDistance * operator)][col + (colDistance * operator)].isCorner || gridArray[row + (rowDistance * operator)][col + (colDistance * operator)].block) || skipFirst) {

              // if (row === 1 && col === 1) console.log('it made it here', row + (rowDistance * operator), col + (colDistance * operator))

              skipFirst = false

              // allow for the tunnel

              // if (row === 14 && col === 0) console.log('it made it here')
              if ((row === 14 && col > 24 && direction === 'right') || (row === 14 && col < 4 && direction === 'left')) {
                // console.log(direction, row, col, 'tunnel')

                tunnel = true
                break

              } else {

                rowDistance += (1 * rowDistanceMultiplier)
                colDistance += (1 * colDistanceMultiplier)

                // console.log(col, colDistance, operator, direction)
                // console.log(row + rowDistance * operator, col + colDistance * operator)

              }

            }

            // rowDistance === 0 ? colDistance -= 1 : rowDistance -= 1

            if (rowDistance > 0 || colDistance > 0) {

              if (!gridArray[row + (rowDistance * operator)][col + (colDistance * operator)].block) {

                gridArray[row][col].corners.push({})
                gridArray[row][col].corners[gridArray[row][col].corners.length - 1].row = row + (rowDistance * operator)
                gridArray[row][col].corners[gridArray[row][col].corners.length - 1].col = col + (colDistance * operator)

                rowDistance > colDistance ? distance = rowDistance : distance = colDistance

                gridArray[row][col].corners[gridArray[row][col].corners.length - 1].distance = distance
                gridArray[row][col].corners[gridArray[row][col].corners.length - 1].direction = direction

                gridArray[row + (rowDistance * operator)][col + (colDistance * operator)].isCorner = true

              }
            }

          })

        }
      }
    }
    //identify which corners are connected

    //loop through all corners to find shortest node value  

  }

  // function pathFind(startRow, startCol, endRow, EndCol) {



  // }

  //End Functions

  document.addEventListener('keydown', logKey)

  addBlockIds()
  startPauseBtn.addEventListener('click', startPause)
  createGrid()
  const cells = document.querySelectorAll('.cell')
  createGridArray()

  sprites.forEach(sprite => {

    gridArray[sprite.row][sprite.col][sprite.type] = true

  })

  updateGrid()

  findCorners()
  // console.log(gridArray[14][3])

}

window.addEventListener('DOMContentLoaded', init)