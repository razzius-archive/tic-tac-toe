window.onload = function () {
  let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let currentPlayer = 'X'
  let mode = 'human'
  let gameOver = 1
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
    board[boardSqaure.id] = currentPlayer // problem child
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
      if (board[winningCombos[i][0]] === board[winningCombos[i][1]] && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
        if (board[winningCombos[i][0]] === 0) {break}
        else if (board[winningCombos[i][0]] === 'X') {
          alert('X wins')
          gameOver = 0
        }
        else (board[winningCombos[i][0]] === 'O')
        {
        alert('O wins')
        gameOver = 0

        }
      }
    }
    if (!board.some(k => k === 0)) {
      alert('tie')
      gameOver = 0
    }
  }

  function boardStatus (boardSquare) {
    if (gameOver === 1) {
      if (squareOpen(boardSquare)) {
        takeSquare(boardSquare)
      }
      gameStatus()
      if (mode === 'skynet') { skynet()}
    }
  }
}
