function init() {

  // * DOM elements
  const grid = document.querySelector('.grid')
  const cells = [] // Array of divs
  const joeCount = document.querySelector('#joes-remaining')
  const timer = document.querySelector('#timer')
  const newGameButton = document.querySelector('#reset-game-button')
  const overlay = document.querySelector('#overlay')
  const overlayButton = document.querySelector('#remove-overlay')

  // * Grid variables
  const height = 9
  const width = 9
  const cellCount = width * height

  // * Game variables
  let isPlaying = false
  let timerId
  
  // ? Create grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells.forEach(cell => cell.classList.add('unclicked'))
  }
  
  // ? Timer functions
  function startTimer() {
    let timePassed = 0
    timerId = setInterval(() => {
      timePassed += 1
      timer.textContent = timePassed
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timerId)
  }

  // ? Board populates and timer starts on player's first click within the grid
  function generateBoard(event) {
    if (isPlaying) return
    isPlaying = true

    startTimer()

    // ? Generate Joe's and display sum in joeCount, guarantee that first cell clicked will always be '0'
    const nums = new Array(cellCount)
    const randomNums = []
    const firstCell = cells.indexOf(event.target)

    while (randomNums.length < 10) {
      const randomIndex = Math.floor(Math.random() * nums.length)
      if (randomIndex !== firstCell && 
          randomIndex !== firstCell - width - 1 && 
          randomIndex !== firstCell - width && 
          randomIndex !== firstCell - width + 1 && 
          randomIndex !== firstCell - 1 && 
          randomIndex !== firstCell + 1 && 
          randomIndex !== firstCell + width - 1 && 
          randomIndex !== firstCell + width && 
          randomIndex !== firstCell + width + 1) {
        if (!randomNums.includes(randomIndex)) {
          nums.splice(randomIndex, 1)
          randomNums.push(randomIndex)
          cells[randomIndex].classList.add('joe')
        }
      }
    }

    joeCount.textContent = (grid.querySelectorAll('.joe')).length

    // ? Generate and display numbers within non-Joe cells to indicate in relation to cells with 'joe' class
    cells.forEach((cell, index) => {
      // * Variables for adjacent cells
      const topLeftNeighbour = cells[index - width - 1] // -10
      const topNeighbour = cells[index - width] // -9
      const topRightNeighbour = cells[index - width + 1] // -8
      const leftNeighbour = cells[index - 1] // -1
      const rightNeightbour = cells[index + 1] // 1
      const bottomLeftNeighbour = cells[index + width - 1] // 8
      const bottomNeighbour = cells[index + width] // 9
      const bottomRightNeighbour = cells[index + width + 1] // 10

      // * Variable to help cells display correct number
      const x = index % width

      let joeCounter = 0

      if (x > 0 && topLeftNeighbour && topLeftNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (topNeighbour && topNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (x < width - 1 && topRightNeighbour && topRightNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (x > 0 && leftNeighbour && leftNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (x < width - 1 && rightNeightbour && rightNeightbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (bottomNeighbour && bottomNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (x < width - 1 && bottomRightNeighbour && bottomRightNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }
      if (x > 0 && bottomLeftNeighbour && bottomLeftNeighbour.classList.contains('joe')) {
        joeCounter += 1
      }

      cell.textContent = joeCounter

      if (cell.classList.contains('joe')) {
        cell.textContent = ''
      }
      // ! BUG: The below finds all cells that contain a zero and removes their cover (i.e. removes the 'unclicked' class). Ideally, this would be in a separate function and would only find  the '0' cells near the event.target and alter their classes
      // * Clearing empty cells to reveal a border of numbers
      if (cell.textContent === '0') {
        if (x > 0 && topLeftNeighbour) {
          topLeftNeighbour.classList.remove('unclicked')
        }
        if (topNeighbour) {
          topNeighbour.classList.remove('unclicked')
        }
        if (x < width - 1 && topRightNeighbour) {
          topRightNeighbour.classList.remove('unclicked')
        }
        if (x > 0 && leftNeighbour) {
          leftNeighbour.classList.remove('unclicked')
        }
        if (x < width - 1 && rightNeightbour) {
          rightNeightbour.classList.remove('unclicked')
        }
        if (bottomNeighbour) {
          bottomNeighbour.classList.remove('unclicked')
        }
        if (x < width - 1 && bottomRightNeighbour) {
          bottomRightNeighbour.classList.remove('unclicked')
        }
        if (x > 0 && bottomLeftNeighbour) {
          bottomLeftNeighbour.classList.remove('unclicked')
        }
        cell.textContent = ''
        cell.classList.remove('unclicked')
      }
    })
  }

  function playerMove(event) {
    event.target.classList.remove('unclicked')

    if (event.target.classList.contains('joe')) {
      gameOver()
    }

    if ((grid.querySelectorAll('.unclicked')).length === (grid.querySelectorAll('.joe')).length) {
      stopTimer()
      newGameButton.classList.add('winner')
      cells.forEach(cell => {
        if (cell.classList.contains('joe')) {
          cell.classList.add('flagged')
        }
      })
    }
  }

  // ? Placing flags: Right click places and/or removes flag on board, it also increases or decreases the joeCount displayed
  function placeFlag(event) {
    if (!isPlaying) return

    event.preventDefault()
    if (event.target.classList.contains('flagged')) {
      event.target.classList.remove('flagged')
      joeCount.textContent = parseInt(joeCount.textContent) + 1
    } else {
      event.target.classList.add('flagged')
      joeCount.textContent = parseInt(joeCount.textContent) - 1
    }
  }

  function gameOver() {
    stopTimer()
    newGameButton.classList.add('game-over')
    joeCount.textContent = (grid.querySelectorAll('.joe')).length

    cells.forEach(cell => {
      if (cell.classList.contains('joe')) {
        cell.classList.remove('unclicked')
      }
    })
  }

  function resetGame() {
    stopTimer()
    newGameButton.classList.remove('game-over')
    newGameButton.classList.remove('winner')
    cells.forEach(cell => {
      if (!cell.classList.contains('unclicked')) {
        cell.classList.add('unclicked')
      }
      cell.classList.remove('flagged')
      cell.classList.remove('joe')
    })
    timer.textContent = '000'
    joeCount.textContent = '000'
    isPlaying = false
  }

  createGrid()
  
  function removeOverlay() {
    overlay.classList.add('hidden')
    overlayButton.removeEventListener('click', removeOverlay)
  }

  // * Event listeners
  overlayButton.addEventListener('click', removeOverlay)
  grid.addEventListener('click', generateBoard)
  cells.forEach(cell => {
    cell.addEventListener('contextmenu', placeFlag)
    cell.addEventListener('click', playerMove)
  })
  newGameButton.addEventListener('click', resetGame)
}

window.addEventListener('DOMContentLoaded', init)