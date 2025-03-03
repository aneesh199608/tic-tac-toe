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

    return {
        makeMove(row, col) {
            if(!isValidMove(row, col)) return false;
            board[row][col] = currentPlayer;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            return console.log(board.map(row => [...row]));
        },
        getCurrentPlayer() {
            return currentPlayer;
        }
    };

})();

Game.makeMove(0,0);