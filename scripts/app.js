function init() {

  // * DOM elements
  const grid = document.querySelector('.grid')
  const cells = []
  const joeCount = document.querySelector('#joes-remaining')

  // * Grid variables
  const width = 9
  const height = 9
  const cellCount = width * height

  // * Game variables
  let isPlaying = false

  function createGrid() {
    // ? Create grid
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      
      grid.appendChild(cell)
      cells.push(cell)
    }
    cells.forEach(cell => cell.classList.add('unclicked'))
  }

  function startGame() {
    if (isPlaying) return
    isPlaying = true

    generateBoard()

  }
  
  function generateBoard() {
    // ? Generate Joe's and display sum in joeCount
    // ! BUG: The below does not always generate 10, as there are occasional duplicates with randomIndex variable
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * cellCount)
      cells[randomIndex].classList.add('joe')
    }
    joeCount.textContent = (grid.querySelectorAll('.joe')).length

    // ? Generate and display numbers within non-Joe cells to indicate in relation to cells with 'joe' class
    cells.forEach((cell, index) => {
      // Variables for adjacent cells
      const topLeftNeighbour = cells[index - width - 1] // -10
      const topNeighbour = cells[index - width] // -9
      const topRightNeighbour = cells[index - width + 1] // -8
      const leftNeighbour = cells[index - 1] // -1
      const rightNeightbour = cells[index + 1] // 1
      const bottomLeftNeighbour = cells[index + width - 1] // 8
      const bottomNeighbour = cells[index + width] // 9
      const bottomRightNeighbour = cells[index + width + 1] // 10

      const x = index % width
      const y = Math.floor(index / width)
      
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
      
      if (cells[index].classList.contains('joe')) {
        cell.textContent = ''
      }
    })
    
  }

  function playerMove(event) {
    console.log(event.target)
    event.target.classList.remove('unclicked')
  }

  createGrid()

  // * Event listeners
  grid.addEventListener('click', startGame)
  cells.forEach(cell => {
    cell.addEventListener('click', playerMove)
  })
}

window.addEventListener('DOMContentLoaded', init)