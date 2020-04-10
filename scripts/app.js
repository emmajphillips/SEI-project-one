function init() {

  // * DOM elements
  const grid = document.querySelector('.grid')
  const cells = []
  const joeCount = document.querySelector('#joes-remaining')
  console.log(joeCount)

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
    }
  }

  function startGame() {
    if (isPlaying) return
    isPlaying = true
    for (let i = 0; i < 10; i++) {
      cells[Math.floor(Math.random() * cellCount)].classList.add('joe')
    }
    joeCount.textContent = (grid.querySelectorAll('.joe')).length
    insertNumbers()
  }

  function insertNumbers() {
    const numberCells = cells.filter(cell => !cell.classList.contains('joe'))
    numberCells.forEach(cell => cell.style.backgroundColor = 'yellow')
  }

  createGrid()

  // * Event listeners
  grid.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)