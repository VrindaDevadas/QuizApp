
const categoryContainer = document.getElementById('category-container');
const startContainer = document.getElementById('start-container');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');

const categoryButtons = document.querySelectorAll('.categories-button');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const timerEl = document.getElementById('timer');
const timeTextEl = document.getElementById('time-text');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const scoreEl = document.getElementById('score');

let currentQuestionIndex, score, timeLeft, timer;
let selectedQuestions = [];

const quizData = {
    cat1: [
        { question: "What is the capital of France?", answers: [{ text: "Berlin", correct: false }, { text: "Madrid", correct: false }, { text: "Paris", correct: true }, { text: "Rome", correct: false }] },
        { question: "Which is the largest ocean in the world?", answers: [{ text: "Atlantic", correct: false }, { text: "Indian", correct: false }, { text: "Pacific", correct: true }, { text: "Arctic", correct: false }] },
        { question: "What is the longest river in the world?", answers: [{ text: "Amazon", correct: false }, { text: "Nile", correct: true }, { text: "Yangtze", correct: false }, { text: "Mississippi", correct: false }] },
        { question: "Which desert is the largest in the world?", answers: [{ text: "Sahara", correct: false }, { text: "Arabian", correct: false }, { text: "Gobi", correct: false }, { text: "Antarctic Polar", correct: true }] },
        { question: "What is the capital of Japan?", answers: [{ text: "Beijing", correct: false }, { text: "Seoul", correct: false }, { text: "Tokyo", correct: true }, { text: "Bangkok", correct: false }] }
    ],
    cat2: [
        { question: "Which planet is known as the Red Planet?", answers: [{ text: "Earth", correct: false }, { text: "Mars", correct: true }, { text: "Jupiter", correct: false }, { text: "Venus", correct: false }] },
        { question: "What is the chemical symbol for water?", answers: [{ text: "O2", correct: false }, { text: "CO2", correct: false }, { text: "H2O", correct: true }, { text: "NaCl", correct: false }] },
        { question: "What is the smallest bone in the human body?", answers: [{ text: "Femur", correct: false }, { text: "Humerus", correct: false }, { text: "Skull", correct: false }, { text: "Stapes", correct: true }] },
        { question: "What force pulls objects toward the center of the Earth?", answers: [{ text: "Magnetism", correct: false }, { text: "Gravity", correct: true }, { text: "Friction", correct: false }, { text: "Inertia", correct: false }] },
        { question: "Which planet is known as the Blue Planet?", answers: [{ text: "Earth", correct: true }, { text: "Neptune", correct: false }, { text: "Uranus", correct: false }, { text: "Saturn", correct: false }] }
    ],
    cat3: [
        // Category 3
        { question: "Who wrote 'Romeo and Juliet'?", answers: [{ text: "Charles Dickens", correct: false }, { text: "William Shakespeare", correct: true }, { text: "Jane Austen", correct: false }, { text: "Mark Twain", correct: false }] },
        { question: "What is the main ingredient in guacamole?", answers: [{ text: "Tomato", correct: false }, { text: "Onion", correct: false }, { text: "Avocado", correct: true }, { text: "Lime", correct: false }] },
        { question: "In which sport would you perform a slam dunk?", answers: [{ text: "Soccer", correct: false }, { text: "Basketball", correct: true }, { text: "Tennis", correct: false }, { text: "Baseball", correct: false }] },
        { question: "What does 'CPU' stand for?", answers: [{ text: "Central Processing Unit", correct: true }, { text: "Computer Personal Unit", correct: false }, { text: "Central Power Unit", correct: false }, { text: "Core Processing Unit", correct: false }] },
        { question: "How many continents are there?", answers: [{ text: "5", correct: false }, { text: "6", correct: false }, { text: "7", correct: true }, { text: "8", correct: false }] }
    ],
    cat4: [
        // Category 4
        { question: "What is the hardest natural substance on Earth?", answers: [{ text: "Gold", correct: false }, { text: "Iron", correct: false }, { text: "Diamond", correct: true }, { text: "Quartz", correct: false }] },
        { question: "Which country is known as the Land of the Rising Sun?", answers: [{ text: "China", correct: false }, { text: "Japan", correct: true }, { text: "South Korea", correct: false }, { text: "Thailand", correct: false }] },
        { question: "How many legs does a spider have?", answers: [{ text: "6", correct: false }, { text: "8", correct: true }, { text: "10", correct: false }, { text: "12", correct: false }] },
        { question: "What is the currency of the United Kingdom?", answers: [{ text: "Euro", correct: false }, { text: "Dollar", correct: false }, { text: "Pound Sterling", correct: true }, { text: "Yen", correct: false }] },
        { question: "Who painted the Mona Lisa?", answers: [{ text: "Vincent van Gogh", correct: false }, { text: "Pablo Picasso", correct: false }, { text: "Leonardo da Vinci", correct: true }, { text: "Michelangelo", correct: false }] }
    ]
};


startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
categoryButtons.forEach(button => {
    button.addEventListener('click', selectCategory);
});


function selectCategory(e) {
    const selectedCategoryId = e.target.id;
    selectedQuestions = quizData[selectedCategoryId];
    categoryContainer.classList.add('hide');
    startContainer.classList.remove('hide');
}

function startQuiz() {
    startContainer.classList.add('hide');
    quizContainer.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    showNextQuestion();
}

function showNextQuestion() {
    resetState();
    if (currentQuestionIndex < selectedQuestions.length) {
        const question = selectedQuestions[currentQuestionIndex];
        questionEl.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            if (answer.correct) {
                button.dataset.correct = true;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsEl.appendChild(button);
        });
        startTimer();
    } else {
        endQuiz();
    }
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answerButtonsEl.children).forEach(button => {
        button.disabled = true;
    });

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
        Array.from(answerButtonsEl.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestionIndex++;
        showNextQuestion();
    }, 1500);
}

function startTimer() {
    timeLeft = 60;
    timeTextEl.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeTextEl.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (score > 0) score--;
            currentQuestionIndex++;
            showNextQuestion();
        }
    }, 1000);
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.classList.add('hide');
    resultsContainer.classList.remove('hide');
    scoreEl.innerText = `${score} / ${selectedQuestions.length}`;
}

function restartQuiz() {
    resultsContainer.classList.add('hide');
    categoryContainer.classList.remove('hide');
    restartBtn.classList.add('display');
}