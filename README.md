![General Assembly](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)

# Project one: Tiger King Minesweeper

![Tiger King](/assets/joe-exotic.jpg)

## Overview

Minesweeper is a classic game where the player aims to clear a board containing hidden "mines" without detonating any of them. The location of the mines can be determined through numbered clues displayed in adjacent tiles.

In this Tiger King version of Minesweeper, the mines are replaced by Joe Exotic and the flags are displayed as paw prints.

This was my first project from General Assembly's Software Engineering Immersive course. It was an individual project which was built over the course of a week. 

## Table of contents

* [Brief](#Brief)
* [Final product](#Final-product)
* [Wins and challenges](#Wins-and-challenges)
* [Bugs](#Bugs)

## Brief

* Render a grid-based game in the browser
* The game should be playable for one player, playing against the computer
* Design game logic for winning, losing and resetting the game
* Use vanilla JavaScript for DOM manipulation

### Languages used

* HTML5
* CSS3
* JavaScript

## Final product

![Minesweeeper](/assets/tiger-king-minesweeper.jpg)

### Game

I tried to keep the game logic as similar as possible to the original PC game. This included:

* The first click within the grid triggers the board to be generated, randomly placing bombs
* Neither the first cell nor the surrounding cells can be bombs, therefore guaranteeing a better user experience on the first click
* Cells display the number of adjacent bombs. Cells that aren't touching bombs are blank
* Right-clicking a cell places a flag to indicate a bomb and decreases the bomb count
* The reset button reflects the result of the game. The button shows a happy tiger for a successful game and a sad tiger if the game is lost
* If a cell with a bomb is clicked, the game ends and all bombs within the board are revealed
* Once all cells that do not contain a bomb are cleared, the game is over and the player has won

### Design

I drew inspiration from Carole Baskin and the Big Cat Rescue website for the design aspects of the game. The orange and coral colours along with the Oswald font feature throughout Baskin's vlogs and articles for Big Cat Rescue, so I wanted to incorporate them into this version of minesweeper. The colour scheme is used across the page, and the font is can be seen on the instructional overlay, the timer, the 'Joe' count and the numbers displayed inside the cells of the game. In the Tiger King documentary, Carole is always seen wearing an article of animal print clothing. This is reflected in the page background, which features a subtle tiger stripe.

## Wins and challenges

A win, for me, was implementing the game logic to be as close to the original as possible. I used to play minesweeper on the family PC growing up, so it was really fun to try and re-create it for this updated version of the game.

One of the biggest challenges was in my data structure for the grid. I used a one dimensional array to produce, store and display the grid which created several constraints in how I was able to implement the game. Reflecting on this, I would opt for a two dimensional array in order to access each cell based on its horizontal ad vertical coordinates (e.g. the first cell in the top left would be represented by [0, 0]).

### Bugs

There was one bug that I was unable to resolve during development, which had to do with zero, or blank, cells. The logic I implemented made it so that once the board was generated, all blank cells that were not adjacent to bombs were revealed. While this does not affect the ability for the game to be played, I feel that it makes the game slightly easier as it ultimately reveals the overall outline of the game board and where the bombs are located.

### Future content

With hindsight, I would re-create the game using a two-dimensional array for the grid of cells, which would help in targeting and accessing specific cells and groups of cells. I beieve this would also help with th bug described above. Ideally what I want is for the first click to produce is a series of blank cells with a perimeter of numbered cells to indicate bombs, but without every blank cell being revealed.

From a design perscpetive, I woul dalso like to explore making the cells appear more three dimensional when they are covered.
