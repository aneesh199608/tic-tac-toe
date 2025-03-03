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
            }
            else if(winner) {
                console.log(`Player ${winner} wins`);
            }
            else {
                console.log("Game is a draw");
            }
            return {
                success: true,
                gameOver: !!winner || isDraw,
                winner: winner || null
            };
        },

        getBoard() {
            console.log(board.map(row => [...row]));
        },
        getCurrentPlayer() {
            return currentPlayer;
        }
    };

})();

Game.makeMove(0,0);
Game.makeMove(1,1);
Game.makeMove(0,1);
Game.makeMove(1,2);
Game.makeMove(0,2);
Game.getBoard(); 
