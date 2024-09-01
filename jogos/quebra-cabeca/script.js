const image = new Image();
        image.src = 'data:image/jpeg;base64,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'; // Substitua pela URL da imagem desejada

        const puzzleContainer = document.getElementById('puzzle-container');
        let pieces = [];
        let emptyPieceIndex = 8; // Posição inicial da peça vazia

        image.onload = function () {
            createPuzzle();
            renderPuzzle();
        };

        function createPuzzle() {
            for (let i = 0; i < 9; i++) {
                if (i < 8) {
                    pieces[i] = { index: i }; // Armazena apenas o índice
                } else {
                    pieces[i] = null; // Posição vazia
                }
            }
        }

        function renderPuzzle() {
            puzzleContainer.innerHTML = '';
            pieces.forEach((piece, index) => {
                const div = document.createElement('div');
                div.className = 'piece';
                if (piece) {
                    div.style.backgroundImage = `url(${image.src})`;
                    div.style.backgroundPosition = `-${(piece.index % 3) * 100}px -${Math.floor(piece.index / 3) * 100}px`;
                    div.style.backgroundSize = '300px 300px';
                    div.draggable = true;
                    div.addEventListener('dragstart', (e) => dragStart(e, index));
                } else {
                    div.style.backgroundColor = 'transparent'; // Cor do espaço vazio
                }
                puzzleContainer.appendChild(div);
            });
        }

        function dragStart(e, index) {
            e.dataTransfer.setData('text/plain', index);
        }

        puzzleContainer.addEventListener('dragover', (e) => e.preventDefault());
        puzzleContainer.addEventListener('drop', (e) => dropPiece(e));

        function dropPiece(e) {
            const index = e.dataTransfer.getData('text/plain');
            const pieceIndex = parseInt(index);
            if (isAdjacent(pieceIndex, emptyPieceIndex)) {
                pieces[emptyPieceIndex] = pieces[pieceIndex];
                pieces[pieceIndex] = null;
                emptyPieceIndex = pieceIndex;
                renderPuzzle();
                checkWin();
            }
        }

        function isAdjacent(index1, index2) {
            const row1 = Math.floor(index1 / 3);
            const col1 = index1 % 3;
            const row2 = Math.floor(index2 / 3);
            const col2 = index2 % 3;
            return (Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1);
        }

        function shufflePuzzle() {
            let shuffled;
            do {
                shuffled = pieces.slice();
                for (let i = 0; i < 100; i++) {
                    const randomIndex = Math.floor(Math.random() * 9);
                    if (randomIndex !== emptyPieceIndex && isAdjacent(randomIndex, emptyPieceIndex)) {
                        shuffled[emptyPieceIndex] = shuffled[randomIndex];
                        shuffled[randomIndex] = null;
                        emptyPieceIndex = randomIndex;
                    }
                }
            } while (!isSolvable(shuffled));

            pieces = shuffled;
            renderPuzzle();
        }

        function isSolvable(shuffled) {
            const inversions = countInversions(shuffled);
            return inversions % 2 === 0;
        }

        function countInversions(array) {
            let count = 0;
            for (let i = 0; i < array.length - 1; i++) {
                if (array[i]) {
                    for (let j = i + 1; j < array.length; j++) {
                        if (array[j] && array[i].index > array[j].index) {
                            count++;
                        }
                    }
                }
            }
            return count;
        }

        function checkWin() {
            const isWin = pieces.every((piece, index) => piece ? piece.index === index : index === 8);
            if (isWin) {
                document.getElementById('result').textContent = 'Parabéns! Você completou o quebra-cabeça!';
            }
        }