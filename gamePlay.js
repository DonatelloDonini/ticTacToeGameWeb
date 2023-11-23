const board = document.getElementById('board');
        const cells = document.querySelectorAll('[data-cell]');
        const message = document.getElementById('message');
        const restartButton = document.getElementById('restartButton');

        let currentPlayer = 'X';
        let isGameActive = true;

        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        function checkWin() {
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    return true;
                }
            }
            return false;
        }

        function checkDraw() {
            return Array.from(cells).every(cell => cell.textContent);
        }

        function endGame(winner) {
            isGameActive = false;
            message.textContent = winner ? `${winner} wins!` : 'It\'s a draw!';
        }

        function handleCellClick(e) {
            const cell = e.target;

            if (!isGameActive || cell.textContent !== '') {
                return;
            }

            cell.textContent = currentPlayer;
            if (checkWin()) {
                endGame(currentPlayer);
            } else if (checkDraw()) {
                endGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function restartGame() {
            isGameActive = true;
            currentPlayer = 'X';
            message.textContent = '';
            cells.forEach(cell => cell.textContent = '');
        }

        cells.forEach(cell => cell.addEventListener('click', handleCellClick));
        restartButton.addEventListener('click', restartGame);