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
  
  // ? Create grid
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
    }
    
    generateBoard()
  }
  
  function generateBoard() {
    // ? Generate Joe
    for (let i = 0; i < 10; i++ ) {
      const randomIndex = Math.floor(Math.random() * cellCount)
      cells[randomIndex].classList.add('joe')
    }
    joeCount.textContent = (grid.querySelectorAll('.joe')).length
    
    // ? Generate numbers in relation to joeCells
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
  }

  createGrid()

  // * Event listeners
  grid.addEventListener('click', playerMove)
}

window.addEventListener('DOMContentLoaded', init)