window.onload = () => {
    const squareOne = document.getElementById('one'),
          squareTwo = document.getElementById('two'),
          squareThree = document.getElementById('three'),
          squareFour = document.getElementById('four'),
          squareFive = document.getElementById('five'),
          squareSix = document.getElementById('six'),
          squareSeven = document.getElementById('seven'),
          squareEight = document.getElementById('eight'),
          squareNine = document.getElementById('nine'),
          arrayOfSquareVar = [squareOne, squareTwo, squareThree, squareFour, squareFive,
              squareSix, squareSeven, squareEight, squareNine
          ];
      let playerToken = "",
          computerToken = "",
          gameStarted = false,
          gameBoard = {
              0: 0,
              1: 0,
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0
          };
  
      resetGame();
  
      document.getElementById('x-btn').onclick = () => {
          resetGame();
          playerToken = "X";
          computerToken = "O";
          whoGoFirst();
      }
  
      document.getElementById('o-btn').onclick = () => {
          resetGame();
          playerToken = "O";
          computerToken = "X";
          whoGoFirst();
      }
  
      document.getElementById('reset-btn').onclick = resetGame;
  
      // Randomizes which player goes first
      function whoGoFirst() {
          if (Math.floor(Math.random() * 2) == 0) {
              alert("Computer goes first!");
              computerTurn();
          } else {
              alert("You go first!");
          }
          gameStarted = true;
      }
  
      // Determines computer's next move
      function computerTurn() {
          setTimeout(() => {
              if (blockOrWin()) {
                  // It's ok, nothing has to go here
              } else if (blocksForks()) {
                  // Here either...really
              } else {
                  determinesMove();
              }
              checkForWinner();
          }, 300);
      }
  
      // Checks for 2-in-a-row to either block or win the game; returns a boolean
      function blockOrWin() {
          let firstSquare,
              secondSquare,
              thirdSquare,
              arrayOfFirstSquares = [
                  [0, 1, 2],
                  [3, 4, 5],
                  [6, 7, 8],
                  [0, 3, 6],
                  [1, 4, 7],
                  [2, 5, 8],
                  [0, 4, 8],
                  [2, 4, 6]
              ];
  
          for (let i = 0; i < arrayOfFirstSquares.length; i++) {
              firstSquare = arrayOfFirstSquares[i][0];
              secondSquare = arrayOfFirstSquares[i][1];
              thirdSquare = arrayOfFirstSquares[i][2];
  
              if (!isSquareEmpty(firstSquare) && gameBoard[thirdSquare] === gameBoard[firstSquare]) {
                  if (isSquareEmpty(secondSquare)) {
                      setsGameTokens(computerToken, secondSquare);
                      return true;
                  }
              } else if (!isSquareEmpty(firstSquare) && gameBoard[secondSquare] === gameBoard[firstSquare]) {
                  if (isSquareEmpty(thirdSquare)) {
                      setsGameTokens(computerToken, thirdSquare);
                      return true;
                  }
              } else if (!isSquareEmpty(secondSquare) && gameBoard[thirdSquare] === gameBoard[secondSquare]) {
                  if (isSquareEmpty(firstSquare)) {
                      setsGameTokens(computerToken, firstSquare);
                      return true;
                  }
              }
          }
          return false;
      }
  
      // If there is a potential fork, tries to block it
      function blocksForks() {
          const topLeftCorner = gameBoard[0],
              topRightCorner = gameBoard[2],
              botLeftCorner = gameBoard[6],
              botRightCorner = gameBoard[8];
  
          if (topLeftCorner == playerToken && botRightCorner == playerToken) {
              setsGameTokens(computerToken, 3);
              return true;
          } else if (topRightCorner == playerToken && botLeftCorner == playerToken) {
              setsGameTokens(computerToken, 1);
              return true;
          }
          return false;
      }
  
      // Determines move priority if no block win move
      function determinesMove() {
          const movePriority = [4, 0, 8, 6, 2, 1, 3, 5, 7];
          for (let i = 0; i < movePriority.length; i++) {
              let moveIndex = movePriority[i];
              if (isSquareEmpty(moveIndex)) {
                  return setsGameTokens(computerToken, moveIndex);
              }
          }
          return;
      }
  
      // Determine if a square is empty
      function isSquareEmpty(index) {
          if (gameBoard[index] == 0) {
              return true;
          } else {
              return false;
          }
      }
  
      // onclick function to place player token on gameBoard
      for (let i = 0; i < arrayOfSquareVar.length; i++) {
          arrayOfSquareVar[i].onclick = function playerMove() {
              if (this.innerHTML != "") {
                  return;
              }
              for (let i = 0; i < arrayOfSquareVar.length; i++) {
                  if (gameStarted == true) {
                      if (this == arrayOfSquareVar[i]) {
                          gameBoard[i] = playerToken;
                          setsGameTokens(playerToken, i);
                      }
                  }
              }
              checkForWinner();
              computerTurn();
          }
      }
  
      // Places tokens on gameBoard based on arguments when called
      const setsGameTokens = (token, index) => { 
        gameBoard[index] = token;
        return arrayOfSquareVar[index].innerHTML = token;
      }
  
      // Ends game if anyone has a winning move
      function checkForWinner() {
          setTimeout(function () {
              let filledSquares = 0,
                  winningCombos = [
                      [gameBoard[0], gameBoard[1], gameBoard[2]],
                      [gameBoard[3], gameBoard[4], gameBoard[5]],
                      [gameBoard[6], gameBoard[7], gameBoard[8]],
                      [gameBoard[0], gameBoard[3], gameBoard[6]],
                      [gameBoard[1], gameBoard[4], gameBoard[7]],
                      [gameBoard[2], gameBoard[5], gameBoard[8]],
                      [gameBoard[0], gameBoard[4], gameBoard[8]],
                      [gameBoard[2], gameBoard[4], gameBoard[6]]
                  ];
              for (let j = 0; j < 9; j++) {
                  if (gameBoard[j] != 0) {
                      filledSquares++;
                  }
              }
              for (let i = 0; i < winningCombos.length; i++) {
                  if (winningCombos[i][0] === playerToken && winningCombos[i][1] === playerToken &&
                      winningCombos[i][2] === playerToken) {
                      resetGame();
                      return alert("You Won!");
                  } else if (winningCombos[i][0] === computerToken && winningCombos[i][1] === computerToken &&
                      winningCombos[i][2] === computerToken) {
                      resetGame();
                      return alert("You Lost!");
                  } else if (filledSquares == 9) {
                      resetGame();
                      return alert("Draw!");
                  }
              }
              return;
          }, 0);
      }
  
      // Resets global variables back to defaults
      function resetGame() {
        
        for (let i = 0; i < 9; i++) {
          gameBoard[i] = 0;
        }
        squareOne.innerHTML = "";
        squareTwo.innerHTML = "";
        squareThree.innerHTML = "";
        squareFour.innerHTML = "";
        squareFive.innerHTML = "";
        squareSix.innerHTML = "";
        squareSeven.innerHTML = "";
        squareEight.innerHTML = "";
        squareNine.innerHTML = "";
        playerOne = "";
        computerToken = "";
        gameStarted = false;
      }
  
  }