window.onload = function (){
  intializeVariables;
  addListeners
}

function intializeVariables(){
  var gameOver = 1
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  var currentPlayer = 'X'
  var winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
  var mode = 'human',
  var bestmove

}

function addListeners(){

  let table = Array.from(document.getElementsByTagName('TD'))
  
  let button = document.getElementById('mode')
  button.addEventListener('click', toggleMode)
  document.getElementById('restart').addEventListener('click', initializeVariables)
  table.forEach(function (element) {
    element.addEventListener('click', function () { boardStatus(element) }, false)
  })
  
  // table.addEventListener('click', function (){boardStatus(event.target)}, false)
}

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
  
  var gameStatus = function gameStatus (virtualBoard = board) {
    for (let i = 0; i < winningCombos.length; i++) {
      if (virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][1]] && virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][2]]) 
      {
        if (virtualBoard[winningCombos[i][0]] === 0) {break;}
        else if (virtualBoard[winningCombos[i][0]] === 'X') 
        {
     
            gameOver = 'X';
          return gameOver;
        }
        else if(virtualBoard[winningCombos[i][0]] === 'O')
        {
          gameOver = 'O';
            return gameOver;
        }
      }
    }
    if (!virtualBoard.some(k => k === 0)) {
        gameOver = 'tie';
        return gameOver;  
    }
  };
 function togglePlayer(player = currentPlayer){
   if (player === 'X'){ return 'O';}
   else {return 'X';}
 }
function getOpenSquares(viBoard){
  let openSquares = [];
  for(let i = 0; i < viBoard.length; i ++)
    {
      if (viBoard[i] === 0)
      {
        openSquares.push(i);
      }
    }
  return openSquares;
}
  
 var  bestmove = 0;
 var ai = function ai(viBoard = board, player = currentPlayer, alpha = -1000, beta = 1000, depth = 0){
    switch(gameStatus(viBoard)) {
        case 'X':
          console.log('X won ');
            return depth - 10;
        case 'O':
          console.log('O won ');
            return 10 - depth;
        case 'tie':
          console.log('tie');
            return 0;
    }
   let availableSquares = getOpenSquares(viBoard);
   let result = 0;
   let move = 0;
   var  bestmove = 0;
   depth+=1;
      
//cannot reset available moves
   //okay, so everytime ai is called it goes and grabs a new version of availbale moves, maybe 
   //this is it, in the other guys code he is using node as a freehand for 
   //library,check my brackets 
   //node and possible game are different variables in the game 
            if (player=='O'){
              for(let i = 0; i < availableSquares.length; i ++)
              {
                console.log(player + ' interation: ' + i)
                move = availableSquares[i];
              viBoard[move] = player;
                player = togglePlayer(player);
               
              result = ai(viBoard, player, alpha, beta, depth);
                debugger;
            viBoard[move] = 0;
            player = togglePlayer(player);
                    if (result > alpha){ 
                    alpha = result;
                      //console.log('alpha' + alpha);
                    // console.log('depth: ' + depth);
                      if(depth === 1){
                    bestmove = move;
                        //console.log('we have a best move: ' + bestmove);
                      }
                    }
                    else if (alpha >= beta){
                      return alpha;
                    }
              }  
              return alpha;
      }else if (player === 'X'){
          for(let i = 0; i < availableSquares.length; i ++) 
              {
               // console.log(player + ' interation: ' + i)
               move = availableSquares[i];
              viBoard[move] = player;
                player = togglePlayer(player);
     
              result = ai(viBoard, player, alpha, beta, depth);
  
              viBoard[move] = 0;
              player = togglePlayer(player);
              
             if (result < beta){ 
                beta = result;
               //console.log('beta' + beta);
               //console.log('depth: ' + depth);
                if(depth === 1){
                  bestmove = move;
                }
              }
                else if (beta <= alpha){
                  return beta;
            }
          }
      return beta;
      }
      //console.log(bestmove)
  };

  function boardStatus (boardSquare) {
    if (gameOver === 1) {
      if (squareOpen(boardSquare)) {
        takeSquare(boardSquare)
      }
      gameStatus()
      if (mode === 'skynet') { ai } 
    }
  }
 