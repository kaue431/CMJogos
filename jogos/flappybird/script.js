const canvas = document.getElementById('flappyBirdCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = 320;
        canvas.height = 480;

        const bird = {
            x: 50,
            y: 150,
            width: 20,
            height: 20,
            gravity: 0.3,
            lift: -6, // Diminuiu de -10 para -6
            velocity: 0
        };

        let pipes = [];
        const pipeWidth = 40; 
        const pipeGap = 120;
        let frame = 0;
        let score = 0;

        function drawBird() {
            ctx.fillStyle = 'yellow';
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
        }

        function drawPipes() {
            ctx.fillStyle = 'green';
            for (let pipe of pipes) {
                ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
                ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);
            }
        }

        function updatePipes() {
            if (frame % 75 === 0) {
                const topPipeHeight = Math.random() * (canvas.height / 2);
                pipes.push({
                    x: canvas.width,
                    top: topPipeHeight,
                    bottom: topPipeHeight + pipeGap
                });
            }

            for (let pipe of pipes) {
                pipe.x -= 2;

                // Check collision with bird
                if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipeWidth &&
                    (bird.y < pipe.top || bird.y + bird.height > pipe.bottom)) {
                    resetGame();
                }

                // Increment score
                if (pipe.x + pipeWidth === bird.x) {
                    score++;
                }
            }

            pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
        }

        function resetGame() {
            bird.y = 150;
            bird.velocity = 0;
            pipes.length = 0;
            frame = 0;
            score = 0;
        }

        function updateBird() {
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            if (bird.y + bird.height > canvas.height || bird.y < 0) {
                resetGame();
            }
        }

        function drawScore() {
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText(`Score: ${score}`, 10, 25);
        }

        function gameLoop() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            drawBird();
            updateBird();
            
            drawPipes();
            updatePipes();
            
            drawScore();
            
            frame++;
            requestAnimationFrame(gameLoop);
        }

        canvas.addEventListener('click', function() {
            bird.velocity = bird.lift;
        });

        gameLoop();