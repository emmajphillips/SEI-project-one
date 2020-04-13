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
      let joeCounter = 0
      const topNeighbour = -width // -9
      const bottomNeighbour = width // 9
      const topRightNeighbour = (-width + 1) // -8
      const bottomRightNeighbour = width + 1 // 10
      const topLeftNeighbour = (-width - 1) // -10
      const bottomLeftNeighbour = width - 1 // 8
      if (cells[index + 1] && cells[index + 1].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index - 1] && cells[index - 1].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + topNeighbour] && cells[index + topNeighbour].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + bottomNeighbour] && cells[index + bottomNeighbour].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + topRightNeighbour] && cells[index + topRightNeighbour].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + bottomRightNeighbour] && cells[index + bottomRightNeighbour].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + topLeftNeighbour] && cells[index + topLeftNeighbour].classList.contains('joe')) {
        joeCounter += 1
      }
      if (cells[index + bottomLeftNeighbour] && cells[index + bottomLeftNeighbour].classList.contains('joe')) {
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