const quizData = [
    {
        "question": "What is the capital of France?",
        "answers": [
            { "text": "Berlin", "correct": false },
            { "text": "Madrid", "correct": false },
            { "text": "Paris", "correct": true },
            { "text": "Rome", "correct": false }
        ]
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "text": "Earth", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Jupiter", "correct": false },
            { "text": "Venus", "correct": false }
        ]
    },
    {
        "question": "Who is the President of India?",
        "answers": [
            { "text": "Narendra Modi", "correct": false },
            { "text": "Pranab Mukherjee", "correct": true },
            { "text": "Droupadi Murmu", "correct": false },
            { "text": "Rahul Gandhi", "correct": false }
        ]
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "text": "Earth", "correct": false },
            { "text": "Mars", "correct": true },
            { "text": "Jupiter", "correct": false },
            { "text": "Venus", "correct": false }
        ]
    }
];

const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const startBtn = document.getElementById('start-btn');
const timerEl = document.getElementById('timer');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const scoreEl = document.getElementById('score');
const resultsEl = document.getElementById('results');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

startBtn = addEventListener('click', startQuiz);

function startQuiz() {
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    showNextQuestion();
}

function showNextQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const question = quizData[currentQuestionIndex];
        questionEl.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
        startTimer();
    } else {
        endQuiz();
    }
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct;
    setStatusClass(document.body, correct);
}