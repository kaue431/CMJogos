let randomNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        function checkGuess() {
            const guess = Number(document.getElementById('guess').value);
            attempts++;
            const resultDiv = document.getElementById('result');
            const attemptsTable = document.getElementById('attemptsTable');

            if (guess === randomNumber) {
                resultDiv.textContent = `Parabéns! Você adivinhou o número ${randomNumber} em ${attempts} tentativas!`;
                resultDiv.style.color = 'green';
                addAttempt(guess, 'Correto');
                resetGame();
            } else if (guess < randomNumber) {
                resultDiv.textContent = 'Muito baixo! Tente novamente.';
                resultDiv.style.color = 'red';
                addAttempt(guess, 'Muito baixo');
            } else {
                resultDiv.textContent = 'Muito alto! Tente novamente.';
                resultDiv.style.color = 'red';
                addAttempt(guess, 'Muito alto');
            }
        }

        function addAttempt(guess, result) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${attempts}</td><td>${guess} - ${result}</td>`;
            document.getElementById('attemptsTable').appendChild(row);
        }

        function resetGame() {
            randomNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            document.getElementById('guess').value = '';
            document.getElementById('attemptsTable').innerHTML = '';
        }
