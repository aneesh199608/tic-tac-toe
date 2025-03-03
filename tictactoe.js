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
            return board[0][2];
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

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset-button');

    let isGameOver = false;

    function updateStatus() {
        status.textContent = `Player ${Game.getCurrentPlayer()}'s turn`;
    }

    function handleCellClick(event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (isGameOver || cell.textContent !== '') {
            return;
        }

        // Get the current player before making the move
        const currentPlayer = Game.getCurrentPlayer();
        const result = Game.makeMove(row, col);

        if (result.success) {
            // Use the stored currentPlayer value instead of getting it after the move
            cell.textContent = currentPlayer;

            if (result.gameOver) {
                isGameOver = true;
                status.textContent = result.winner ? `Player ${result.winner} wins!` : 'Game is a draw';
            } else {
                updateStatus();
            }
        }
    }

    function resetGame() {
        Game.resetGame();
        cells.forEach(cell => {
            cell.textContent = '';
        });
        isGameOver = false;
        updateStatus();
    }

    // Add event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    // Initialize the game status
    updateStatus();
});
