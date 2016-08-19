/*
window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();  
},false)
*/
 window.onload= function doThis(){
  console.log('this worked')
  
}

window.onload = function (){
  var gameOver = 1
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  var currentPlayer = 'X'
  var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  var mode = 'human'
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
      button.innerHTML = 'Fight Human' //innerHTML needs to be changed to .textContent
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
 
    function ai(viBoard, player, alpha, beta, moves){
      if (gameStatus(viBoard) !== 1){
        if (gameOver === 'tie'){
          return 0, moves 
        } 
        else if (gameOver === 'X'){
            return -10 + moves.length, moves
        }
        else if (gameOver === 'O'){
            return 10 - moves.length, moves
        }
      }
      
      for (let h= 0; h < viBoard.length; h++){
          if (viBoard[h] === 0){
          if (player=='O'){
            viBoard[h] = player
            moves.push(h)
            player = togglePlayer(player)
            let bestmove = 0
            let v = alpha 
            if (v > beta){
              let result = ai(viBoard, player, v, beta, moves)
              if (result[0] > alpha){ 
                alpha = result[0]
                bestmove = result[1]
                //there should be a return call in here for all the moment's that won't otherwise return where they are passing up
                //a move and an alpha beta score or something
              }
              }
          }
            }

          else if (player == 'X'){
            viBoard[h] = player
            moves.push(h)
            player = togglePlayer(player)
            let bestmove = 0
            let v = beta
            if (v > alpha){
              let result = ai(viBoard, player, alpha, v, moves)
              if (result[0] > beta){ 
                beta = result[0]
                bestmove = result[1]
        //return best move after all this for the final recursive turn// no
              }
            }
          }
    }//eoforloop

  }//eofunction
  
  
  function gameStatus (virtualBoard = board) {
    for (let i = 0; i < winningCombos.length; i++) {
      if (virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][1]] && virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][2]]) {
        if (virtualBoard[winningCombos[i][0]] === 0) {break}
        else if (virtualBoard[winningCombos[i][0]] === 'X') {
          return gameOver = 'X'

        // needs to break out of whole function
        }
        else (virtualBoard[winningCombos[i][0]] === 'O')
        {
        return gameOver = 'O'

        }
      }//maybe
    }
    if (!virtualBoard.some(k => k === 0)) {
      return gameOver = 'tie'
    }
  }


  function boardStatus (boardSquare) {
    if (gameOver === 1) {
      if (squareOpen(boardSquare)) {
        takeSquare(boardSquare)
      }
      gameStatus()
      if (mode === 'skynet') { skynet } 
    }
  }
      
  
