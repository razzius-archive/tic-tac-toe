/*
window.addEventListener("load", function load(event){
    window.removeEventListener("load", load, false); //remove listener, no longer needed
    myExtension.init();  
},false)
*/

// maybe refactor with ternary operators 

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
 
    function ai(viBoard, player, alpha, beta, depth){
      // i need the part of this code that delas with the returned values
      //when we call the next level of recursion is will be equal to something that uses thesew values to evaluate
      //whether it is the best possible option
//       if (gameStatus(viBoard) !== 1){
//         if (gameOver === 'tie'){
//           return 0, move
//         } //return move
//           else if (gameOver === 'X'){
//             return -10, depth// return alpha value
//           }
//             else if (gameOver === 'O'){
//               return 10, depth
//             }
//       }
      //all this return shit needs to only apply to terminal nodes
      for (let h= 0; h < viBoard.length; h++){
          if (viBoard[h] === 0){
          if (player=='X'){
            viBoard[h] = player
            player = togglePlayer(player)
            let v = ai(viBoard, player, alpha, beta, depth)
            //do some calculation to determine what's going on with v
            }
          else if (player == 'O'){
            viBoard[h] = player
            player = togglePlayer(player)
            let v = ai(viBoard, player, alpha, beta, depth)
        }
      }
    }
  //check win conditon, return a score from depth, and win and set eqial to max on your move or min on other persons move, if there can be no grater max then leave loop, I need to look at the alpha beta loop to understand this part more fully, otherwise I just need to streamline my win solution part and pass around playuer and borad rather than having them be global. skynet mostly calls recursice call, I think I can do this easily
  //----------
    // base case is that there is a winner.
    // otherwise find all the open possible spaces and call again with the player switched
    // return a value
    // things to possibly return include array of moves and end result
    // I don't know how to call them which each is evaluated
    // the first function to make a call will be nothing but a simple if, else, the if will evaluate if it ended and then have a best move variable
    // that resolves if this was the best option
  }
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
      }
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
      if (mode === 'skynet') { skynet()} // maybe no paranthethese 
    }
  }
} // ask Kenrick about how best to write and configure this- should it all be in the onload function it does not seem as
// elegant but I don't know how to reorganize it and I'm at a loss of what to do, I caould also wrap this in a function
// that is called form a script tag in html or should it be in classes
