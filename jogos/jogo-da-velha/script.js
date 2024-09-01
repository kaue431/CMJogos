let board = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';

        function makeMove(cell, index) {
            if (cell.innerHTML === '' && !checkWinner()) {
                cell.innerHTML = currentPlayer;
                board[index] = currentPlayer;
                if (checkWinner()) {
                    document.getElementById('status').innerText = `Jogador ${currentPlayer} ganhou!`;
                } else if (board.every(cell => cell !== '')) {
                    document.getElementById('status').innerText = 'Empate!';
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return true;
                }
            }
            return false;
        }

        function resetGame() {
            board = ['', '', '', '', '', '', '', '', ''];
            currentPlayer = 'X';
            document.getElementById('status').innerText = '';
            const cells = document.querySelectorAll('.cell');
            cells.forEach(cell => cell.innerHTML = '');
        }