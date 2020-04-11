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
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      grid.appendChild(cell)
      cells.push(cell)
      cell.textContent = i
    }
  }

  function startGame() {
    if (isPlaying) return
    isPlaying = true

    generateBoard()
  }

  function generateBoard() {
    // Generate Joe's
    const joeCells = []

    while (joeCells.length < 10) {
      const randomIndex = Math.floor(Math.random() * cells.length)
      cells[randomIndex].classList.add('joe')
      joeCells.push(randomIndex)
    }
    joeCount.textContent = joeCells.length

    console.log(cells)
    console.log(joeCells)

  }

  createGrid()

  // * Event listeners
  grid.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)