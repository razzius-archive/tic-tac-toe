
export var App = {

  start: fuction(){
    intializeVariables()
    addListeners()
  },

  intializeVariables: function(){
    let gameOver = 1,
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0],
    currentPlayer = 'X',
    winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]],
    mode = 'human',
    //table.forEach(function (element) {element.innerHTML = ''}),
    bestmove = 0;
  },

  addListeners: function() {
    let table = Array.from(document.getElementsByTagName('TD'))
    let button = document.getElementById('mode')
    button.addEventListener('click', toggleMode)
    document.getElementById('restart').addEventListener('click', intializeVariables)
    table.forEach(function (element) {
      element.addEventListener('click', function () { boardStatus(element) }, false)
  
    // table.addEventListener('click', function (){boardStatus(event.target)}, false)
  },

  toggleMode: function(){
    if (button.innerHTML === 'Fight Computer') {
      mode = 'computer'
      button.innerHTML = 'Fight Human' //innerHTML needs to be changed to .textContent
    } else {
      mode = 'human'
      button.innerHTML = 'Fight Computer'
    }
  },

  togglePlayer: function(player = currentPlayer){
    if (player === 'X'){ return 'O';}
    else {return 'X';}
  },

  squareOpen: function(square) {
    if (board[square.id] === 0) {return true}
    return false
  }, 

  takeSquare: function(boardSquare) {
  board[boardSquare.id] = currentPlayer
  boardSquare.innerHTML = currentPlayer
  if (currentPlayer === 'X') { currentPlayer = 'O'} 
    else {currentPlayer = 'X'}
  },

  getOpenSquares: function(viBoard){
  let openSquares = [];
  for(let i = 0; i < viBoard.length; i ++)
    {
      if (viBoard[i] === 0)
      {
        openSquares.push(i);
      }
    }
  return openSquares;
  },

  boardStatus: function(boardSquare) {
  if (gameOver === 1) {
    if (squareOpen(boardSquare)) {
      takeSquare(boardSquare)
    }
    gameStatus()
    if (mode === 'computer') { ai } 
  },

  gameStatus: function(virtualBoard = board) {
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
  },

  ai: function(viBoard = board, player = currentPlayer, alpha = -1000, beta = 1000, depth = 0){
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
   bestmove = 0;
   depth+=1;
      

          if (player=='O'){
            for(let i = 0; i < availableSquares.length; i ++)
            {
              //console.log(player + ' interation: ' + i)
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







 