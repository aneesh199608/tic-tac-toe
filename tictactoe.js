const Game = (() => {
    let board = [
        ["","",""],
        ["","",""],
        ["","",""]
    ];
    let currentPlayer = "X";

    function isValidMove(row, col) {
        if(row < 0 || row > 2 || col < 0 || col > 2 || board[row][col] !== "") {
            return false;
        }
        else return true;
    }

    function checkWin() {
        for (let row = 0; row < 3; row++) {
            if(board[row][0] !== "" && board[row][0] === board[row][1] && board[row][1] === board [row][2]) {
                return board[row][0];
            }
        }

        for (let col = 0; col < 3; col++) {
            if(board[0][col] !== "" && board[0][col] === board[1][col] && board[1][col] === board [2][col]) {
                return board[0][col];
            }
        }

        if(board[0][0] !== "" && board[0][0] === board [1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if(board[0][2] !== "" && board[0][2] === board [1][1] && board[1][1] === board[2][0]) {
            return board[2][0];
        }
        return null;
    }

    return {
        makeMove(row, col) {
            if(!isValidMove(row, col)) {
                console.log("Invalid move!");
                return false;
            }
            board[row][col] = currentPlayer;
            const winner = checkWin();
            const isDraw = !winner && board.every( row => row.every(cell => cell !== ""));

            console.log(`Player ${currentPlayer} placed at position (${row}, ${col})`);
            this.getBoard();

            if(!winner && !isDraw) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            return {success: true, gameOver: false, winner: null};
            }
            else if(winner) {
                console.log(`Player ${winner} wins`);
                return { success: true, gameOver: true, winner};
            }
            else {
                console.log("Game is a draw");
                return { success: true, gameOver: true, winner: null};
            }
        },

        getBoard() {
            console.log(board.map(row => [...row]));
        },
        resetGame() {
            board = [
                ["","",""],
                ["","",""],
                ["","",""]
            ];
            currentPlayer = "X";
            console.log("Game has been reset");
            this.getBoard();
        },
        getCurrentPlayer() {
            return currentPlayer;
        }
    };

})();

function playGameInConsole() {
    console.log("Welcome to Tic-Tac-Toe! Enter moves in the format row, col");
    function getPlayerMove(){
        const input = prompt (`Player ${Game.getCurrentPlayer()}, enter your move(row, col):`);
        if(!input) return;

        const [row,col] = input.split(",").map(Number);

        if (isNaN(row) || isNaN(col)) {
            console.log("Invalid format. Enter again");
            return getPlayerMove();
        }

        const result = Game.makeMove(row, col);
        if(!result.success) return getPlayerMove();

        if(!result.gameOver) {
            getPlayerMove();
        }
        else {
            Game.resetGame();
            getPlayerMove();
        }
    }
    getPlayerMove();
}

playGameInConsole();
