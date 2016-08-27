/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	  start: function start() {
	    intializeVariables();
	    addListeners();
	  },

	  intializeVariables: function intializeVariables() {
	    var gameOver = 1,
	        board = [0, 0, 0, 0, 0, 0, 0, 0, 0],
	        currentPlayer = 'X',
	        winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]],
	        mode = 'human',

	    //table.forEach(function (element) {element.innerHTML = ''}),
	    bestmove = 0;
	  },

	  addListeners: function addListeners() {
	    var table = Array.from(document.getElementsByTagName('TD'));
	    var button = document.getElementById('mode');
	    button.addEventListener('click', toggleMode);
	    document.getElementById('restart').addEventListener('click', intializeVariables);
	    table.forEach(function (element) {
	      element.addEventListener('click', function () {
	        boardStatus(element);
	      }, false);

	      // table.addEventListener('click', function (){boardStatus(event.target)}, false)
	    });
	  },

	  toggleMode: function toggleMode() {
	    if (button.innerHTML === 'Fight Computer') {
	      mode = 'computer';
	      button.innerHTML = 'Fight Human'; //innerHTML needs to be changed to .textContent
	    } else {
	      mode = 'human';
	      button.innerHTML = 'Fight Computer';
	    }
	  },

	  togglePlayer: function togglePlayer() {
	    var player = arguments.length <= 0 || arguments[0] === undefined ? currentPlayer : arguments[0];

	    if (player === 'X') {
	      return 'O';
	    } else {
	      return 'X';
	    }
	  },

	  squareOpen: function squareOpen(square) {
	    if (board[square.id] === 0) {
	      return true;
	    }
	    return false;
	  },

	  takeSquare: function takeSquare(boardSquare) {
	    board[boardSquare.id] = currentPlayer;
	    boardSquare.innerHTML = currentPlayer;
	    if (currentPlayer === 'X') {
	      currentPlayer = 'O';
	    } else {
	      currentPlayer = 'X';
	    }
	  },

	  getOpenSquares: function getOpenSquares(viBoard) {
	    var openSquares = [];
	    for (var i = 0; i < viBoard.length; i++) {
	      if (viBoard[i] === 0) {
	        openSquares.push(i);
	      }
	    }
	    return openSquares;
	  },

	  boardStatus: function boardStatus(boardSquare) {
	    if (gameOver === 1) {
	      if (squareOpen(boardSquare)) {
	        takeSquare(boardSquare);
	      }
	      gameStatus();
	      if (mode === 'computer') {
	        ai;
	      }
	    }
	  },

	  gameStatus: function gameStatus() {
	    var virtualBoard = arguments.length <= 0 || arguments[0] === undefined ? board : arguments[0];

	    for (var i = 0; i < winningCombos.length; i++) {
	      if (virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][1]] && virtualBoard[winningCombos[i][0]] === virtualBoard[winningCombos[i][2]]) {
	        if (virtualBoard[winningCombos[i][0]] === 0) {
	          break;
	        } else if (virtualBoard[winningCombos[i][0]] === 'X') {

	          gameOver = 'X';
	          return gameOver;
	        } else if (virtualBoard[winningCombos[i][0]] === 'O') {
	          gameOver = 'O';
	          return gameOver;
	        }
	      }
	    }
	    if (!virtualBoard.some(function (k) {
	      return k === 0;
	    })) {
	      gameOver = 'tie';
	      return gameOver;
	    }
	  },

	  ai: function (_ai) {
	    function ai() {
	      return _ai.apply(this, arguments);
	    }

	    ai.toString = function () {
	      return _ai.toString();
	    };

	    return ai;
	  }(function () {
	    var viBoard = arguments.length <= 0 || arguments[0] === undefined ? board : arguments[0];
	    var player = arguments.length <= 1 || arguments[1] === undefined ? currentPlayer : arguments[1];
	    var alpha = arguments.length <= 2 || arguments[2] === undefined ? -1000 : arguments[2];
	    var beta = arguments.length <= 3 || arguments[3] === undefined ? 1000 : arguments[3];
	    var depth = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

	    switch (gameStatus(viBoard)) {
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
	    var availableSquares = getOpenSquares(viBoard);
	    var result = 0;
	    var move = 0;
	    bestmove = 0;
	    depth += 1;

	    if (player == 'O') {
	      for (var i = 0; i < availableSquares.length; i++) {
	        //console.log(player + ' interation: ' + i)
	        move = availableSquares[i];
	        viBoard[move] = player;
	        player = togglePlayer(player);

	        result = ai(viBoard, player, alpha, beta, depth);
	        debugger;
	        viBoard[move] = 0;
	        player = togglePlayer(player);
	        if (result > alpha) {
	          alpha = result;
	          //console.log('alpha' + alpha);
	          // console.log('depth: ' + depth);
	          if (depth === 1) {
	            bestmove = move;
	            //console.log('we have a best move: ' + bestmove);
	          }
	        } else if (alpha >= beta) {
	          return alpha;
	        }
	      }
	      return alpha;
	    } else if (player === 'X') {
	      for (var _i = 0; _i < availableSquares.length; _i++) {
	        // console.log(player + ' interation: ' + i)
	        move = availableSquares[_i];
	        viBoard[move] = player;
	        player = togglePlayer(player);

	        result = ai(viBoard, player, alpha, beta, depth);

	        viBoard[move] = 0;
	        player = togglePlayer(player);

	        if (result < beta) {
	          beta = result;
	          //console.log('beta' + beta);
	          //console.log('depth: ' + depth);
	          if (depth === 1) {
	            bestmove = move;
	          }
	        } else if (beta <= alpha) {
	          return beta;
	        }
	      }
	      return beta;
	    }
	    //console.log(bestmove)
	  }) }; //error for bracket

/***/ }
/******/ ]);