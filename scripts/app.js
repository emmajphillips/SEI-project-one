function init() {

  // * DOM elements
  const grid = document.querySelector('.grid')
  const cells = []

  // * Grid variables
  const width = 9
  const height = 9
  const cellCount = width * height

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
  }
  createGrid()
}

window.addEventListener('DOMContentLoaded', init)