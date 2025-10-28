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
        "question": "Which is the largest ocean in the world?",
        "answers": [
            { "text": "Atlantic Ocean", "correct": false },
            { "text": "Indian Ocean", "correct": false },
            { "text": "Pacific Ocean", "correct": true },
            { "text": "Arctic Ocean", "correct": false }
        ]
    },
    {
        "question": "What is the smallest bone in the human body? ",
        "answers": [
            { "text": "Femur", "correct": false },
            { "text": "Humerus", "correct": false },
            { "text": "Skull", "correct": false },
            { "text": "Stapes", "correct": true }
        ]
    },
    {
        "question": "Which planet is known as the Blue Planet? ",
        "answers": [
            { "text": "Earth", "correct": true },
            { "text": "Neptune", "correct": false },
            { "text": "Uranus", "correct": false },
            { "text": "Saturn", "correct": false }
        ]
    },
]


const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const startBtn = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const scoreEl = document.getElementById('score');
const resultsEl = document.getElementById('results');
const timeTextEl = document.getElementById('time-text');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    showNextQuestion();
}

function showNextQuestion() {
    resetState();
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
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
    }
    clearInterval(timer);
    setTimeout(() => {
        currentQuestionIndex++;
        showNextQuestion();
    }, 1000);
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function startTimer() {
    timeLeft = 60;
    timeTextEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeTextEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            score--;
            currentQuestionIndex++;
            showNextQuestion();
        }
    }, 1000);
}

function endQuiz() {
    quizContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');

    const totalQuestions = quizData.length;

    scoreEl.innerText = `${score} / ${totalQuestions}`;

    // clear the resultsEl before showing new results
    resultsEl.innerHTML = "";
}

