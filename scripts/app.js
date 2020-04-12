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
      let joeCounter = 0
      const topNeighbour = -width // -9
      const bottomNeighbour = width // 9
      const topRightNeighbour = (-width + 1) // -8
      const bottomRightNeighbour = width + 1 // 10
      const topLeftNeighbour = (-width - 1) // -10
      const bottomLeftNeighbour = width - 1 // 8
      if (cells[index + 1] && cells[index + 1].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index - 1] && cells[index - 1].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + topNeighbour] && cells[index + topNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + bottomNeighbour] && cells[index + bottomNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + topRightNeighbour] && cells[index + topRightNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + bottomRightNeighbour] && cells[index + bottomRightNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + topLeftNeighbour] && cells[index + topLeftNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      if (cells[index + bottomLeftNeighbour] && cells[index + bottomLeftNeighbour].hasAttributes()) {
        joeCounter += 1
      }
      cell.textContent = joeCounter

      if (cells[index].hasAttributes()) {
        cell.textContent = ''
      }
    })
    
  }

  function playerMove(event) {
    console.log(event.target)
    if (event.target.classList.contains('joe')) {
      alert('You lose')
    }
  }

  createGrid()

  // * Event listeners
  grid.addEventListener('click', startGame)
  cells.forEach(cell => {
    cell.addEventListener('click', playerMove)
  })
}

window.addEventListener('DOMContentLoaded', init)