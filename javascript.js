function createPlayer(symbol) {
    const placeMove = (gameboard, x, y) => {
        let board = gameboard.board;
        if (x < 0 || x >= 3 || y < 0 || y >+ 3 || board[x][y] != 0) {
            return -1;
        }
        board[x][y] = symbol;
        return 1;
    }
    return {placeMove, symbol};
}
player1 = createPlayer("X");
player2 = createPlayer("O");
const gameboard = (function(player1, player2) {
    let board = [
        [0,0,0],
        [0,0,0],
        [0,0,0],
    ];
    function checkboard() {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
                return board[i][0];
            }
            if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) {               
                return board[0][i];
            }
        }
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != 0 ||
        board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[1][1] != 0) {
            return board[1][1];
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    return false;
                }
            }
        }
        return true;
    }
    
    const win = () => {
        const val = checkboard();
        if (val != false) {
            if (player1.symbol == val) {
                document.querySelector(".winner").innerHTML += " player 1 has won!"
                return 1;
            } else if (player2.symbol == val) {
                document.querySelector(".winner").innerHTML += " player 2 has won!"
                return 1;
            } else {
                document.querySelector(".winner").innerHTML += " tie!"
                return 1;
            }
        }
        return 0;
    }

    
    return {board, win};
})(player1, player2);

const displayController = (function (gameboard, player1, player2) {
    
    const controlDisplay = () => {
        const button = document.querySelector("button");
        let move = player1;
        console.log(move.symbol);
        button.addEventListener("click", () => {
            while (true) {
                let x = prompt("x coordinate of grid");
                let y = prompt("y coordinate of grid");
                if (move.placeMove(gameboard, x, y) != 1) {
                    alert("Move is illegal!");
                    continue;
                }
                const box = document.querySelector("#grid" + (Number(x*3) + Number(y)));
                box.innerHTML = move.symbol;
                if (gameboard.win() == 1) {
                    break;
                }
                if (move == player1) move = player2;
                else move = player1;
                break;
            }
        })
    }
    return {controlDisplay};
})(gameboard, player1, player2);
displayController.controlDisplay();
