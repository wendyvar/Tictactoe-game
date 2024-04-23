let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'O' plays first
let playerTurn = true;
let count = 0;
let aiMoves = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide"); // Enable popup
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide"); // Disable popup
};

// This function is executed when a player wins or it's a draw
const endGame = (result) => {
  disableButtons();
  msgRef.innerHTML = result;
  if (result === "It's a Draw") {
    setTimeout(() => {
      alert("The game ended in a draw!"); // Show draw message
    }, 500); // Show the draw message after a slight delay
  }
};

// Check if a player has won
const checkWin = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 && element1 === element2 && element2 === element3) {
      return `${element1} Wins!`; // Return the winning message
    }
  }
  if (count === 9) {
    return "It's a Draw"; // Return draw message
  }
  return null; // No winner yet
};

// Handle button clicks
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (playerTurn && element.innerText === "") {
      element.innerText = "O"; // Player's turn
      count++;
      let winStatus = checkWin();
      if (count === 9 || winStatus) {
        setTimeout(() => {
          endGame(winStatus || "It's a Draw");
        }, 500); // Show the last move before showing the message
      } else {
        playerTurn = false;
        aiMove(); // AI's turn
      }
    }
  });
});

// AI's turn
const aiMove = () => {
  let emptySquares = Array.from(btnRef).filter((btn) => btn.innerText === "");
  let randomIndex = Math.floor(Math.random() * emptySquares.length);
  let selectedSquare = emptySquares[randomIndex];
  selectedSquare.innerText = "X"; // AI plays as X
  aiMoves++;
  let winStatus = checkWin();
  if (count === 9 || winStatus) {
    setTimeout(() => {
      endGame(winStatus || "It's a Draw");
    }, 500); // Show the last move before showing the message
  } else {
    playerTurn = true;
  }
};

// New Game and Restart buttons
newgameBtn.addEventListener("click", () => {
  count = 0;
  aiMoves = 0;
  enableButtons();
  resetBoard();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  aiMoves = 0;
  enableButtons();
  resetBoard();
});

// Reset the game board
const resetBoard = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
  });
  playerTurn = true;
};

// Enable Buttons and disable popup on page load
window.onload = enableButtons;
