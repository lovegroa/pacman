function init() {

  //Classes

  class Sprite {

    constructor(name, type, behaviour, controller, nextMove, row, col, delayTime) {
      this.name = name
      this.type = type
      this.behaviour = behaviour
      this.controller = controller
      this.nextMove = nextMove
      this.delayTime = delayTime
      this.row = row
      this.col = col
      this.rowMomentum = 0
      this.colMomentum = 0
      this.currentMove
      this.totalScore = 0
      this.lives = 3
      this.delay = true
      sprites.push(this)

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

      this.currentMove === 'right' & tunnel ? gridArray[this.row][28][this.name] = false : gridArray[this.row][this.col][this.name] = false
      this.currentMove === 'left' & tunnel ? gridArray[this.row][0][this.name] = false : gridArray[this.row][this.col][this.name] = false

      this.previousRow = this.row
      this.previousCol = this.col

      this.row += this.rowMomentum
      this.col += this.colMomentum

      gridArray[this.row][this.col]['direction'] = this.currentMove
      gridArray[this.previousRow][this.previousCol]['direction'] = 'right'
      gridArray[this.row][this.col][this.name] = true

    }

    score(points) {

      playAudio('assets/audio/coin.wav')
      this.totalScore += points * difficulty.value * cheat
      scoreSpan.innerText = this.totalScore
      updateLeaderboard()

    }

    cherry() {


      allAudioTags = document.querySelectorAll('audio')
      allAudioTags.forEach(tag => {

        tag.volume = 0.1

      })
      playAudioOnce('assets/audio/run.wav')
      sprites.forEach(sprite => sprite.run())

      setTimeout(() => {

        allAudioTags.forEach(tag => {

          tag.volume = 1

        })

      }, 5000)

    }

    capture() {

      gridArray[this.row][this.col][this.name] = false
      this.lives -= 1
      this.row = 14
      this.col = 0
      this.currentMove = 'right'
      this.nextMove = 'right'

      sprites.forEach(sprite => {

        sprite.run()


      })

      if (this.lives > 0) {

        livesSpan.innerText = this.lives
        playAudio('assets/audio/die.wav')


      } else {

        endGame()
      }

    }

    run() {

      this.behaviour = 'run'

      setTimeout(() => {

        this.behaviour = 'chase'

      }, 1000 * 5)

    }

  }

  //Global Variables

  const gameContainer = document.querySelector('#game-container')
  const rows = 29
  const cols = 29
  const fps = 5
  const fpsTime = 1000 / fps
  const gridArray = [[]]
  const blockIdArray = []
  const startPauseBtn = document.querySelector('#start-pause')
  const ghostBehaviourBtn = document.querySelector('#toggle-ghost-behaviour')
  const pathDataBtn = document.querySelector('#toggle-path-data')
  const scoreSpan = document.querySelector('#score')
  const livesSpan = document.querySelector('#lives')
  const difficulty = document.querySelector('#difficultySlider')
  const highScores = document.querySelector('#high-scores')
  // const playerName = window.prompt('What is your name?')
  let playerName = 'Current Score'
  let audioCount = 0
  let totalCoins = 0
  let totalCherries = 0
  let cheat = 1
  let allAudioTags


  if (!localStorage.getItem('scores')) {

    localStorage.setItem('scores', '[]')

  }

  let showPathData = false

  let isRunning = false
  let frame
  const sprites = []

  const pacman = new Sprite('pacman', 'pacman', 'run', 'player', 'null', 14, 0, 0)
  new Sprite('ghost1', 'ghost', 'chase', 'computer', 'null', 14, 14, 2)
  new Sprite('ghost2', 'ghost', 'chase', 'computer', 'null', 14, 14, 4)
  new Sprite('ghost3', 'ghost', 'chase', 'computer', 'null', 14, 14, 8)
  new Sprite('ghost1', 'ghost', 'chase', 'computer', 'null', 14, 14, 10)



  let allCorners = []

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
            tempCell.classList.add(sprite.name)
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

          gridArray[row][col][sprite.name] = false

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

    sprites.forEach(sprite => {

      gridArray[sprite.row][sprite.col][sprite.name] = true

    })

  }


  function setGrid() {

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        cells.forEach(cell => {

          if (cell.id === `r${row}-c${col}`) {

            sprites.forEach(sprite => {

              gridArray[row][col][sprite.name] ? cell.classList.add(sprite.name) : cell.classList.remove(sprite.name)

            })

            gridArray[row][col].block ? cell.classList.add('block') : cell.classList.remove('block')
            gridArray[row][col].coin ? cell.classList.add('coin') : cell.classList.remove('coin')
            gridArray[row][col].cherry ? cell.classList.add('cherry') : cell.classList.remove('cherry')



          }

        })

      }

    }

  }

  function updateGrid() {

    pathFind(pacman.row, pacman.col)



    moveGhost()




    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        cells.forEach(cell => {

          if (cell.id === `r${row}-c${col}`) {

            //displays the sprite on each frame

            sprites.forEach(sprite => {

              if (sprite.type === 'ghost') {


                if (gridArray[row][col][sprite.name] && gridArray[row][col].pacman) {

                  if (sprite.behaviour === 'chase') {

                    pacman.capture()

                  }


                } else if (sprite.previousCol === pacman.col && sprite.previousRow === pacman.row && pacman.previousCol === sprite.col && sprite.previousRow === pacman.row) {

                  //prevents issue where pacman and ghost are moving in opposite directions and don't actually land on the same cell at the same time but cross paths!
                  //this checks to see if they have simply switched positions, which means they must have passed
                  if (sprite.behaviour === 'chase') {

                    pacman.capture()

                  }
                }
              }

            })



            sprites.forEach(sprite => {

              gridArray[row][col][sprite.name] ? cell.classList.add(sprite.name) : cell.classList.remove(sprite.name)

            })


            if (gridArray[row][col].cornerValue && gridArray[row][col].isCorner) cell.innerText = gridArray[row][col].cornerValue
            if (!showPathData) cell.innerText = ''

            gridArray[row][col].direction === 'right' ? cell.classList.add('right') : cell.classList.remove('right')
            gridArray[row][col].direction === 'left' ? cell.classList.add('left') : cell.classList.remove('left')
            gridArray[row][col].direction === 'up' ? cell.classList.add('up') : cell.classList.remove('up')
            gridArray[row][col].direction === 'down' ? cell.classList.add('down') : cell.classList.remove('down')

            //when pacman eats a coin

            if (gridArray[row][col].pacman && gridArray[row][col].coin) {

              cell.classList.remove('coin')
              gridArray[row][col].coin = false
              totalCoins -= 1
              pacman.score(100)

            }

            if (gridArray[row][col].pacman && gridArray[row][col].cherry) {

              cell.classList.remove('cherry')
              gridArray[row][col].cherry = false
              totalCherries -= 1
              pacman.cherry()

            }

            if (totalCoins === 0) addCoins()
            if (totalCherries === 0) addCherries()


            if (gridArray[row][col].coin) cell.classList.add('coin')
            if (gridArray[row][col].cherry) cell.classList.add('cherry')


            sprites.forEach(sprite => {

              if (sprite.type === 'ghost') {

                if (gridArray[row][col][sprite.name] && gridArray[row][col].coin) {

                  cell.classList.remove('coin')

                }

                if (gridArray[row][col][sprite.name] && gridArray[row][col].cherry) {

                  cell.classList.remove('cherry')

                }




              }


            })







          }

        })

      }

    }


  }

  function logKey(e) {
    // console.log(e.keyCode)
    if (e.keyCode === 38) {

      pacman.nextMove = 'up'

    } else if (e.keyCode === 40) {


      pacman.nextMove = 'down'

    } else if (e.keyCode === 37) {


      pacman.nextMove = 'left'

    } else if (e.keyCode === 39) {


      pacman.nextMove = 'right'

    }
  }

  function moveGhost() {

    const randNum = Math.random()
    const difficultyNo = randNum * difficulty.value

    sprites.forEach(sprite => {



      let min = 1000
      let max = 0

      if (sprite.type === 'ghost') {

        if (!sprite.delay) {


          if (gridArray[sprite.row][sprite.col].isCorner) {


            if (difficultyNo < 10 && difficulty.value !== 100) {

              const corners = gridArray[sprite.row][sprite.col].corners

              sprite.nextMove = corners[Math.floor(Math.random() * corners.length)].direction

            } else {

              gridArray[sprite.row][sprite.col].corners.forEach(corner => {

                // console.log(corner, gridArray[corner.row][corner.col].cornerValue)

                if (sprite.behaviour === 'chase') {

                  if (gridArray[corner.row][corner.col].cornerValue < min) {

                    min = gridArray[corner.row][corner.col].cornerValue
                    sprite.nextMove = corner.direction

                  }


                } else {

                  if (gridArray[corner.row][corner.col].cornerValue > max) {

                    max = gridArray[corner.row][corner.col].cornerValue
                    sprite.nextMove = corner.direction

                  }


                }

              })

            }

          }

        }





      }


    })







  }

  let chaseMusic
  let waka

  function startPause() {

    if (isRunning) {

      stopAudio(chaseMusic)
      stopAudio(waka)
      clearInterval(frame)
      startPauseBtn.innerHTML = 'Resume'
      isRunning = false

    } else {

      chaseMusic = repeatAudio('assets/audio/chase.wav')
      waka = repeatAudio('assets/audio/waka.mp3')

      startTimer()
      startPauseBtn.innerHTML = 'Pause'
      isRunning = true

      sprites.forEach(sprite => {

        if (sprite.delay) {

          setTimeout(() => {

            console.log(sprite.delayTime)
            sprite.delay = false

          }, sprite.delayTime * 1000)

        }

      })

    }

  }

  function startTimer() {

    frame = setInterval(() => {

      sprites.forEach(sprite => {

        sprite.move()
      }
      )
      updateGrid()

    }, fpsTime)

  }

  function findCorners() {


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
            allCorners.push([row, col])
          } else if (cornerCount === 1) {

            gridArray[row][col].isCorner = false

          } else if (!((up && down) || (left && right))) {

            gridArray[row][col].isCorner = true
            allCorners.push([row, col])


          }

        }
      }
    }


    allCorners = Array.from(new Set(allCorners))

    //identify which corners are connected

    //loop through all corners to find shortest node value  

  }

  function addCoins() {

    for (let row = 0; row < rows; row++) {

      for (let col = 0; col < cols; col++) {

        if (!(gridArray[row][col].block || row % 2 === 0)) {

          gridArray[row][col].coin = true
          totalCoins += 1

        }


      }
    }


  }

  function addCherries() {

    gridArray[2][1].cherry = true
    gridArray[2][27].cherry = true
    gridArray[26][1].cherry = true
    gridArray[26][27].cherry = true

    totalCherries = 4

  }

  function findNearestCorners() {

    let distance = 0


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




  }

  function measureCorners() {


    let allCornersValue = false

    while (!allCornersValue) {



      allCornersValue = true

      allCorners.forEach(corner => {

        const tempCorner = gridArray[corner[0]][corner[1]]

        //checks to see if the current cell has a value

        if (tempCorner.cornerValue === 1000) {

          allCornersValue = false

        }

        // if not it is set the lowest value of the connecting corners plus the distance if they have a value
        let min = 1000
        tempCorner.corners.forEach(tempCorner2 => {

          //checks to see if those corners have a value

          if (gridArray[tempCorner2.row][tempCorner2.col].cornerValue) {

            //if they do and it's smaller than the min then the min is updated with that value plus distance

            if (((gridArray[tempCorner2.row][tempCorner2.col].cornerValue + tempCorner2.distance) < min)) {

              min = gridArray[tempCorner2.row][tempCorner2.col].cornerValue + tempCorner2.distance

            }


          }



        })
        // if (corner[0] === 27 && corner[1] === 27) console.log('line27', min)
        //then the min value is added as that corner value
        if (tempCorner.cornerValue > min) tempCorner.cornerValue = min
        // if (min !== 1000) tempCorner.cornerValue = min
        // console.log(`Corner value added to ${corner[0]}:${corner[1]} of ${tempCorner.cornerValue}`)


      })



    }



    allCorners.forEach(corner => {

      const tempCorner = gridArray[corner[0]][corner[1]]

      //checks to see if the current cell has a value

      if (!tempCorner.cornerValue) {

        // if not it is set the lowest value of the connecting corners plus the distance if they have a value
        let min = 10
        tempCorner.corners.forEach(tempCorner2 => {

          //checks to see if those corners have a value

          if (gridArray[tempCorner2.row][tempCorner2.col].cornerValue) {

            //if they do and it's smaller than the min then the min is updated with that value plus distance

            if ((gridArray[tempCorner2.row][tempCorner2.col].cornerValue + tempCorner2.distance) < min) {

              min = gridArray[tempCorner2.row][tempCorner2.col].cornerValue + tempCorner2.distance

            }


          }



        })

        //then the min value is added as that corner value

        tempCorner.cornerValue = min
        // console.log(`Corner value added to ${tempCorner.row}:${tempCorner.col} of ${tempCorner.cornerValue}`)



      }

    })

  }

  function pathFind(endRow, EndCol) {

    allCorners.forEach(corner => {

      // console.log(corner[0], corner[1])

      gridArray[corner[0]][corner[1]].cornerValue = 1000

    })

    //adds the first node values to the corners nearest the end coords

    //if (gridArray[endRow][EndCol].isCorner) {


    gridArray[endRow][EndCol].cornerValue = 1 //not sure what's going on here, I set this value to 0
    // console.log(gridArray[endRow][EndCol]) // and then when I look here it's set to cornerValue = ""
    //}



    // console.log(`Corner value added to ${endRow}:${EndCol} of 0`)


    gridArray[endRow][EndCol].corners.forEach(corner => {

      gridArray[corner.row][corner.col].cornerValue = corner.distance
      // console.log(`Corner value added to ${corner.row}:${corner.col} of ${corner.distance}`)


    })


    measureCorners()

    // console.log(gridArray[pacman.row][pacman.col])


  }

  function toggleGhost() {

    cheat = 0

    sprites.forEach(sprite => {

      if (sprite.type === 'ghost') {

        sprite.behaviour === 'run' ? sprite.behaviour = 'chase' : sprite.behaviour = 'run'

        console.log(sprite.behaviour)

      }

    })



  }

  function showPathDataF() {

    showPathData ? showPathData = false : showPathData = true

  }

  function saveLeaderboard() {

    const tempHighScores = JSON.parse(localStorage.getItem('scores'))
    tempHighScores.push([pacman.totalScore, playerName])

    localStorage.setItem('scores', JSON.stringify(tempHighScores))

  }

  function endGame() {

    playAudio('assets/audio/dead.wav')
    document.querySelector('#end-game-score').innerText = pacman.totalScore
    endGameScreen.style.display = 'block'
    endGameScreen.style.border = '30px solid black'
    endGameScreen.style.width = '30%'
    endGameScreen.style.height = '30%'
    livesSpan.innerText = 0
    startPauseBtn.click()
    startPauseBtn.style.display = 'none'
    startPauseBtn.disabled = true

  }

  function updateLeaderboard() {

    //local storage can only store strings this turns it into an object

    const scores = JSON.parse(localStorage.getItem('scores'))

    // scores.push(pacman.totalScore)
    // localStorage.setItem('scores')
    scores.push([pacman.totalScore, playerName])

    scores.sort(sortFunction)
    highScores.innerHTML = ''

    let count = 0

    scores.forEach(score => {

      if (count < 10) {

        highScores.innerHTML += `${score[1]} : ${score[0]} <br>`
        count += 1


      }


    })



  }

  function sortFunction(a, b) {

    //sort function based on first index in a two dimensional array

    if (a[0] === b[0]) {
      return 0
    } else {
      return (a[0] > b[0]) ? -1 : 1
    }
  }

  function playAudio(audioLocation) {

    audioCount += 1
    const tempAudio = document.createElement('audio')
    tempAudio.id = `audio-${audioCount}`
    gameContainer.appendChild(tempAudio)
    tempAudio.src = audioLocation
    tempAudio.addEventListener('ended', deleteAudio)

    tempAudio.onloadedmetadata = function () {
      console.log(tempAudio.duration * 1000)
      const playbackSpeed = (tempAudio.duration * 1000) / fpsTime
      console.log(playbackSpeed)
      tempAudio.playbackRate = playbackSpeed
    }

    tempAudio.play()

  }

  function playAudioOnce(audioLocation) {

    audioCount += 1
    const tempAudio = document.createElement('audio')
    tempAudio.id = `audio-${audioCount}`
    gameContainer.appendChild(tempAudio)
    tempAudio.src = audioLocation
    tempAudio.addEventListener('ended', deleteAudio)
    tempAudio.play()

  }

  function deleteAudio(e) {

    gameContainer.removeChild(e.target)

  }

  function repeatAudio(audioLocation) {

    audioCount += 1
    const tempAudio = document.createElement('audio')
    tempAudio.id = `audio-${audioCount}`
    gameContainer.appendChild(tempAudio)
    tempAudio.src = audioLocation
    tempAudio.loop = true
    tempAudio.play()
    return tempAudio

  }

  function stopAudio(element) {

    element.pause()
    gameContainer.removeChild(element)

  }

  function updateMultiplier() {

    document.querySelector('#multiplier').innerText = difficulty.value

  }

  function submitScore(e) {

    e.preventDefault()
    playerName = document.querySelector('#player-name').value

    endGameScreen.style.display = 'none'
    endGameScreen.style.border = '0px solid black'
    endGameScreen.style.width = '0%'
    endGameScreen.style.height = '0%'

    saveLeaderboard()
  }

  function resetGame() {

    location.reload()

  }

  const form = document.querySelector('form')
  form.addEventListener('submit', submitScore)
  const endGameScreen = document.querySelector('#end-game')
  const resetBtn = document.querySelector('#reset')


  //End Functions

  document.addEventListener('keydown', logKey)
  addBlockIds()
  startPauseBtn.addEventListener('click', startPause)
  ghostBehaviourBtn.addEventListener('click', toggleGhost)
  pathDataBtn.addEventListener('click', showPathDataF)
  difficulty.addEventListener('change', updateMultiplier)
  resetBtn.addEventListener('click', resetGame)

  livesSpan.innerText = pacman.lives

  updateMultiplier()
  createGrid()
  const cells = document.querySelectorAll('.cell')
  createGridArray()
  findCorners()
  findNearestCorners()
  addCoins()
  addCherries()
  setGrid()
  updateLeaderboard()
  //updateGrid()

  // console.log(gridArray[23][27])

}

window.addEventListener('DOMContentLoaded', init)


//start at the end position, set any connected corners to the distance of end cell

//run throught all of the corners, if they connect to a corner with a value they add that value to the distance and have a value
//if there i