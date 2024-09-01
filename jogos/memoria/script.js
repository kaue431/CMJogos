const cards = [
    '🍎', '🍎', '🍌', '🍌', 
    '🍇', '🍇', '🍉', '🍉', 
    '🍊', '🍊', '🍒', '🍒',
    '🍓', '🍓', '🍑', '🍑'
];

let gameBoard = document.getElementById('gameBoard');
let cardElements = [];
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.cardValue = card;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
    cardElements.push(cardElement);
}

function flipCard() {
    if (lockBoard) return;
    this.classList.add('flipped');
    this.innerText = this.dataset.cardValue;

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.cardValue === secondCard.dataset.cardValue;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchedCards += 2;
    resetBoard();
    if (matchedCards === cards.length) {
        document.getElementById('status').innerText = 'Você ganhou!';
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    matchedCards = 0;
    gameBoard.innerHTML = '';
    document.getElementById('status').innerText = '';
    cardElements = [];
    initializeGame();
}

function initializeGame() {
    shuffle(cards);
    cards.forEach(createCard);
}

initializeGame();