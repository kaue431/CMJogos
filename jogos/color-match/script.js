const colors = ["Vermelho", "Verde", "Azul", "Amarelo", "Laranja", "Roxo", "Rosa", "Ciano", "Verde claro"];
        const colorToCode = {
            "Vermelho": "Red",
            "Verde": "Green",
            "Azul": "Blue",
            "Amarelo": "Yellow",
            "Laranja": "Orange",
            "Roxo": "Purple",
            "Rosa": "Pink",
            "Ciano": "Cyan",
            "Verde claro": "Lime"
        };

        let correctColor;
        let score = 0;
        let timeLeft = 30;
        let interval;

        const buttons = document.querySelectorAll("button");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");
        const colorNameDisplay = document.getElementById("colorName");

        function startGame() {
            resetGame();
            interval = setInterval(updateTimer, 1000);
            setNewColor();
            buttons.forEach(button => button.addEventListener("click", checkColor));
        }

        function resetGame() {
            score = 0;
            timeLeft = 30;
            updateScore();
            updateTimer();
        }

        function setNewColor() {
            correctColor = colors[Math.floor(Math.random() * colors.length)];
            colorNameDisplay.textContent = `Clique na cor: ${correctColor}`;
            setButtonColors();
        }

        function setButtonColors() {
            const shuffledColors = colors.sort(() => Math.random() - 0.5);
            buttons.forEach((button, index) => {
                button.style.backgroundColor = colorToCode[shuffledColors[index]];
            });
        }

        function checkColor(event) {
            if (event.target.style.backgroundColor === colorToCode[correctColor].toLowerCase()) {
                score++;
                updateScore();
                setNewColor();
            } else {
                timeLeft -= 3; // Penalidade de tempo
                updateTimer();
            }
        }

        function updateScore() {
            scoreDisplay.textContent = `Pontuação: ${score}`;
        }

        function updateTimer() {
            timeLeft--;
            timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(interval);
                alert(`Fim de jogo! Sua pontuação foi: ${score}`);
                startGame();
            }
        }

        startGame();
