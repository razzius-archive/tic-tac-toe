window.onload = function () {
  let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let player = 1
  let mode = 'human'

  let table = document.getElementsByTagName('TD')

  function initializeGame () {
  }

  for (let i = 0; i < board.length; i++) {
    table[i].onclick = function (event) {
      console.log(event.target + i)
    }
  }
  function squareOpen (square) {
    switch (board[square]) {
      case 0:
        return true
      case 1:
        return false
      case -1:
        return false
    }
  }

  function takeSquare (boardSquare, playerSymbol = 'X') {
    board[sqaure] = player // change to boardSquare id
    boardSquare.innerHTML = 'X'
  // toggle player if mode == human 
  }
  function skynet () {
    // min-max 
    // calls takeSquare
    // if the board is full call results function maybe 
  }
  function gameStatus () {
  }
  function boardStatus (boardSquare) {
    if (squareOpen(boardSquare)) {
      if (mode == 'computer') {
        skynet()
      } else if (player === -1 && mode == 'human') {
        takeSquare(boardSquare, 'O')
      } else {
        takeSquare(boardSquare)
      }
    } // can these become promises or callbacks
  }
  gameStatus()
}

// loop to add onclick handlers  I want to tie the dom elements to their class and status in the game without so many calls
// to get ElementID and whatever, look at people who did not use canvas and see what they did
