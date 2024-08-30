const playerCar = document.querySelector('.player-car');
const road = document.querySelector('.road');
const scoreElement = document.querySelector('.score');

let playerCarPosition = road.offsetWidth / 2 - playerCar.offsetWidth / 2;
let score = 0;
let gameInterval;
let obstacleCreationTimeout = null;
let obstacleSpeed = 5; // Velocidade inicial dos obstáculos

function moveLeft() {
    if (playerCarPosition > 0) {
        playerCarPosition -= 10;
        playerCar.style.left = playerCarPosition + 'px';
    }
}

function moveRight() {
    if (playerCarPosition < road.offsetWidth - playerCar.offsetWidth) {
        playerCarPosition += 10;
        playerCar.style.left = playerCarPosition + 'px';
    }
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    let obstaclePosition = Math.floor(Math.random() * (road.offsetWidth - 40));
    obstacle.style.left = obstaclePosition + 'px';
    road.appendChild(obstacle);

    let obstacleInterval = setInterval(() => {
        const obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        if (obstacleTop > road.offsetHeight) {
            clearInterval(obstacleInterval);
            road.removeChild(obstacle);
            score += 10; // Incrementa a pontuação
            scoreElement.textContent = 'Pontuação: ' + score;

            // Aumenta a velocidade a cada 100 pontos
            if (score % 100 === 0) {
                obstacleSpeed += 2;
            }
        } else {
            obstacle.style.top = obstacleTop + obstacleSpeed + 'px';
        }

        if (obstacleTop > road.offsetHeight - playerCar.offsetHeight - 10 &&
            obstaclePosition < playerCarPosition + playerCar.offsetWidth &&
            obstaclePosition + 40 > playerCarPosition) {
            clearInterval(obstacleInterval);
            clearInterval(gameInterval);
            if (obstacleCreationTimeout) {
                clearTimeout(obstacleCreationTimeout);
            }
            alert('Você colidiu! Pontuação final: ' + score);
            location.reload();
        }
    }, 20);
}

function startGame() {
    createObstacle();
    obstacleCreationTimeout = setTimeout(function repeatObstacleCreation() {
        createObstacle();
        obstacleCreationTimeout = setTimeout(repeatObstacleCreation, Math.random() * 2000 + 2000);
    }, Math.random() * 2000 + 2000);
}

function handleKeydown(event) {
    switch (event.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
}

document.addEventListener('keydown', handleKeydown);

startGame();
