function init() {

  // * DOM elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * Grid variables
  const width = 9
  const height = 9
  const cellCount = width * height

  // * Game variables
  let isPlaying = false

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }

  function startGame(event) {
    console.log('clicked', event.target.textContent)
    if (isPlaying) return
    isPlaying = true
    for (let i = 0; i < 10; i++) {
      cells[Math.floor(Math.random() * cellCount)].classList.add('joe')
    }
  }
  
  createGrid()

  // * Event listeners
  grid.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)