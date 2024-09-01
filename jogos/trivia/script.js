const questions = [
    {
        question: "Qual é a capital do Brasil?",
        answers: [
            { text: "Rio de Janeiro", correct: false },
            { text: "Brasília", correct: true },
            { text: "São Paulo", correct: false },
            { text: "Salvador", correct: false }
        ]
    },
    {
        question: "Qual é o maior planeta do sistema solar?",
        answers: [
            { text: "Terra", correct: false },
            { text: "Marte", correct: false },
            { text: "Júpiter", correct: true },
            { text: "Saturno", correct: false }
        ]
    },
    {
        question: "Qual é o nome do protagonista de 'Naruto'?",
        answers: [
            { text: "Naruto Uzumaki", correct: true },
            { text: "Sasuke Uchiha", correct: false },
            { text: "Kakashi Hatake", correct: false },
            { text: "Sakura Haruno", correct: false }
        ]
    },
    {
        question: "Qual é o melhor anime existente?",
        answers: [
            { text: "Boku no hero", correct: false },
            { text: "Horimiya", correct: true },
            { text: "Demon slayer", correct: false },
            { text: "Death note", correct: false }
        ]
    },
    {
        question: "Qual é o melhor anime a se recomendar a um iniciante?",
        answers: [
            { text: "Boku no pico", correct: true },
            { text: "Attack on titan", correct: false },
            { text: "Dragon ball", correct: false },
            { text: "Overflow", correct: false }
        ]
    },
    {
        question: "Quem sempre queima a rosca da Nudeln Truppe mit Käse?",
        answers: [
            { text: "O noia", correct: false },
            { text: "O ADM", correct: true },
            { text: "O inteligente", correct: false },
            { text: "O vagabundo", correct: false }
        ]
    },
    {
        question: "Onde a Nudeln Truppe mit Käse se reune?",
        answers: [
            { text: "Em qualquer lugar", correct: true },
            { text: "No panamá", correct: false },
            { text: "Em casa", correct: false },
            { text: "No discord", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;

function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('final-score').style.display = 'none';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    document.getElementById('question').innerText = question.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('div');
        button.innerText = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(answer) {
    const nextButton = document.getElementById('next-btn');
    if (answer.correct) {
        correctAnswers++;
        alert('Resposta correta!');
    } else {
        incorrectAnswers++;
        alert('Resposta errada!');
    }
    nextButton.style.display = 'block';
}

document.getElementById('next-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        document.getElementById('next-btn').style.display = 'none';
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    document.getElementById('question').style.display = 'none';
    document.getElementById('answers').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';
    const finalScore = document.getElementById('final-score');
    finalScore.innerText = `Você acertou ${correctAnswers} e errou ${incorrectAnswers} perguntas.`;
    finalScore.style.display = 'block';
}

startGame();