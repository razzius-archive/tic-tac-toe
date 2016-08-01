window.onload = function () {
  let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let currentPlayer = 'X'
  let mode = 'human'
  let table = document.getElementsByTagName('TD')

  let button = document.getElementById('mode')
  button.onclick = function toggleMode () {
    if (button.innerHTML === 'Fight Skynet') {
      mode = 'skynet'
      button.innerHTML = 'Fight Human'
    } else {
      mode = 'human'
      button.innerHTML = 'Fight Skynet'
    }
  }

  function restartGame () {
    document.getElementById('restart').onclick = function () {
      initializeGame()
    }
  }

  function initializeGame () {
  }

  for (let i = 0; i < board.length; i++) {
    table[i].onclick = function (event) {
      boardStatus(event.target)
    }
  }
  function squareOpen (square) {
    if (board[square.id] === 0) {return true}
    return false
  }

  function takeSquare (boardSquare) {
    board[boardSqaure.id] = currentPlayer
    boardSquare.innerHTML = currentPlayer
    if (currentPlayer === 'X') { currentPlayer = 'O'} else {currentPlayer = 'X'}
  }
  function skynet () {
    // min-max 
    // calls takeSquare
    // if the board is full call results function maybe 
  }
  function gameStatus () {
    for (let i = 0; i < winningCombos.length; i++) {
      if (board[winningCombos[i][0]] == board[winningCombos[i][1]] == board[winningCombos[i][2]]) {
      }
    }
    // use && instead of == maybe
    // compare each three int array as index on the board to eachother and see if any are == 0
    // if so break here
    // then compare them to each other and see if they are the same
    // if they are the same determine the person who has won and break the entire function 
    // also end the ability to onclick= may need another variable for end of game
    // otherwise cycle through the array of arrays

  }

  function boardStatus (boardSquare) {
    if (squareOpen(boardSquare)) {
      takeSquare(boardSquare)
    }
    gameStatus()
    if (mode === 'skynet') { skynet()}
  }

// loop to add onclick handlers  I want to tie the dom elements to their class and status in the game without so many calls
// to get ElementID and whatever, look at people who did not use canvas and see what they did
}
