const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
const jumpButton = document.querySelector('.jump-button');
let isJumping = false;
let isGameOver = false;
let position = 0;
let score = 0;
let cactusSpeed = 10;

function handleJump() {
    if (!isJumping) {
        jump();
    }
}

function jump() {
    isJumping = true;
    const jumpHeight = 120;
    const gravity = 10;

    let upInterval = setInterval(() => {
        if (position >= jumpHeight) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    position = 0;
                } else {
                    position -= gravity;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += gravity;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = background.clientWidth;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftTimer = setInterval(() => {
        if (cactusPosition < -40) {
            clearInterval(leftTimer);
            background.removeChild(cactus);
            score++;
            if (score % 5 === 0) {
                cactusSpeed++;
            }
        } else if (cactusPosition > 0 && cactusPosition < 100 && position < 60) {
            clearInterval(leftTimer);
            isGameOver = true;
            alert(`Você perdeu! Sua pontuação foi: ${score}`);
            document.location.reload();
        } else {
            cactusPosition -= cactusSpeed;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

// Eventos para dispositivos móveis e desktop
jumpButton.addEventListener('click', handleJump);
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        handleJump();
    }
});

createCactus();
