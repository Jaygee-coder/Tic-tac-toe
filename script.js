//declaring the gameboard variable
var gameBoard;

//creating the winning combos
const winCombos = [
    [0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

//creating the player objects

const humanPlayer = {
    name: 'characterName',
    character: 'x',
};

const compPlayer = {
    name: 'The Bachelor',
    character: 'o',
};

//gameBoard sections
const boardSquares = document.querySelectorAll('.boardColumn');

resetGame();

//function to reset/start the game
function resetGame (){
    document.querySelector('.winmodal').classList.remove('active');
    gameBoard = Array.from(Array(9).keys());
    for(var i=0; i<boardSquares.length; i++){
		boardSquares[i].innerText = '';
		boardSquares[i].className = "boardColumn";
		boardSquares[i].style.removeProperty('box-shadow');
        boardSquares[i].addEventListener('click', turnClick, false)
	}
}

function turnClick(cell) {
    if (typeof gameBoard[cell.target.id] == 'number') {
		turn(cell.target.id, humanPlayer)
		if (!checkTie()) turn(compSpot(), compPlayer);
	}
}

function turn(cellId, player){
   gameBoard[cellId] = player;
   
   document.getElementById(cellId).innerText = player.character; 

   if (player === humanPlayer){
	document.getElementById(cellId).className = "looney"; 
   }
   else{
	document.getElementById(cellId).className = "bachelor";  
   }
   let gameWon = checkWin(gameBoard, player)
    
   if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) {
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) {
	for (let index of winCombos[gameWon.index]) {
		document.getElementById(index).style.boxShadow =
			gameWon.player ==  humanPlayer ? "10px 10px 20px green" : "10px 10px 20px purple";
	}
	for (var i = 0; i < boardSquares.length; i++) {
		boardSquares[i].removeEventListener('click', turnClick, false);
    }
    document.querySelector("#girly").style.display = 'block';
    document.querySelector("#playAgain").style.marginTop = '130px';
    declareWinner(gameWon.player ==  humanPlayer ? "YOU DID IT, PRINCE CHARMING!" : "THE HOT BACHELOR HAS WON!");
}

function declareWinner(who) {
    setTimeout(function (){
        document.querySelector(".winmodal").classList.add('active');
    }, 1000);
	document.querySelector("#winmessage").innerHTML = who;
}

function emptyCells() {
	return gameBoard.filter(c => typeof c == 'number');
}

function compSpot() {
	return emptyCells()[0];
}

function checkTie() {
	if (emptyCells().length == 0) {
		for (var i = 0; i < boardSquares.length; i++) {
			boardSquares[i].style.boxShadow = "10px 10px 20px pink";
			boardSquares[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("OOPS, IT'S A TIE!")
        document.querySelector("#girly").style.display = 'none';
        document.querySelector("#playAgain").style.marginTop = '50px';
        return true;
	}
	return false;
}