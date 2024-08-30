const words = ["PASTEL", "MIOJO", "QUEIJO", "DISCORD", "TROPA"];
const gridSize = 8;  // 8x8

function createGrid() {
    const grid = [];
    for (let i = 0; i < gridSize; i++) {
        const row = [];
        for (let j = 0; j < gridSize; j++) {
            row.push('');
        }
        grid.push(row);
    }
    return grid;
}

function placeWord(grid, word) {
    const directions = [
        { x: 1, y: 0 },   // horizontal direita
        { x: -1, y: 0 },  // horizontal esquerda
        { x: 0, y: 1 },   // vertical para baixo
        { x: 0, y: -1 },  // vertical para cima
        { x: 1, y: 1 },   // diagonal direita abaixo
        { x: -1, y: -1 }, // diagonal esquerda acima
        { x: 1, y: -1 },  // diagonal direita acima
        { x: -1, y: 1 },  // diagonal esquerda abaixo
    ];

    let placed = false;

    while (!placed) {
        const startX = Math.floor(Math.random() * gridSize);
        const startY = Math.floor(Math.random() * gridSize);
        const direction = directions[Math.floor(Math.random() * directions.length)];

        let canPlace = true;
        let x = startX;
        let y = startY;

        for (let i = 0; i < word.length; i++) {
            if (x < 0 || y < 0 || x >= gridSize || y >= gridSize || (grid[y][x] !== '' && grid[y][x] !== word[i])) {
                canPlace = false;
                break;
            }
            x += direction.x;
            y += direction.y;
        }

        if (canPlace) {
            x = startX;
            y = startY;

            for (let i = 0; i < word.length; i++) {
                grid[y][x] = word[i];
                x += direction.x;
                y += direction.y;
            }

            placed = true;
        }
    }
}

function fillGrid(grid) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = letters.charAt(Math.floor(Math.random() * letters.length));
            }
        }
    }
}

function renderGrid(grid) {
    const wordSearch = document.getElementById('word-search');
    wordSearch.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;
            wordSearch.appendChild(cell);
        }
    }
}

function renderWordList() {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '';

    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.dataset.word = word;
        wordList.appendChild(li);
    });
}

function checkSelectedWord(selectedCells) {
    const selectedWord = selectedCells.map(cell => cell.textContent).join('');
    if (words.includes(selectedWord)) {
        selectedCells.forEach(cell => {
            cell.classList.add('found');
            cell.classList.remove('selected');
        });

        const wordListItems = document.querySelectorAll('#word-list li');
        wordListItems.forEach(item => {
            if (item.dataset.word === selectedWord) {
                item.style.textDecoration = 'line-through';
            }
        });

        checkIfAllWordsFound();

        return true;
    }

    return false;
}

function checkIfAllWordsFound() {
    const foundWords = document.querySelectorAll('#word-list li[style*="line-through"]').length;
    if (foundWords === words.length) {
        setTimeout(() => {
            document.querySelector('.game-container').classList.add('hidden');
            document.getElementById('victory-message').classList.remove('hidden');
        }, 500);
    }
}

function initializeGame() {
    const grid = createGrid();

    words.forEach(word => placeWord(grid, word));
    fillGrid(grid);

    renderGrid(grid);
    renderWordList();

    let selectedCells = [];

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.classList.contains('selected') && !cell.classList.contains('found')) {
                cell.classList.add('selected');
                selectedCells.push(cell);
            }

            if (checkSelectedWord(selectedCells)) {
                selectedCells = [];
            }
        });
    });

    document.getElementById('restart-button').addEventListener('click', () => {
        document.querySelector('.game-container').classList.remove('hidden');
        document.getElementById('victory-message').classList.add('hidden');
        initializeGame();
    });
}

initializeGame();
