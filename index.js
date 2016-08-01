/*
window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();  
},false)
*/

window.onload = function () {
  let gameOver = 1
  let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  let currentPlayer = 'X'
  let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  let mode = 'human'
  let table = Array.from(document.getElementsByTagName('TD'))

  let button = document.getElementById('mode')
  button.addEventListener('click', toggleMode)

  document.getElementById('restart').addEventListener('click', initializeVariables)

  table.forEach(function (element) {
    element.addEventListener('click', function () { boardStatus(element) }, false)
  })

  function toggleMode () {
    if (button.innerHTML === 'Fight Skynet') {
      mode = 'skynet'
      button.innerHTML = 'Fight Human'
    } else {
      mode = 'human'
      button.innerHTML = 'Fight Skynet'
    }
  }

  function initializeVariables () {
    gameOver = 1
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    currentPlayer = 'X'
    table.forEach(function (element) {element.innerHTML = ''})
  }

  function squareOpen (square) {
    if (board[square.id] === 0) {return true}
    return false
  }

  function takeSquare (boardSquare) {
    board[boardSquare.id] = currentPlayer
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
          break
        // needs to break out of whole function
        }
        else (board[winningCombos[i][0]] === 'O')
        {
        alert('O wins')
        gameOver = 0
        break

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
      if (mode === 'skynet') { skynet()} // maybe no paranthethese 
    }
  }
} // ask Kenrick about how best to write and configure this- should it all be in the onload function it does not seem as
// elegant but I don't know how to reorganize it and I'm at a loss of what to do, I caould also wrap this in a function
// that is called form a script tag in html or should it be in classes
