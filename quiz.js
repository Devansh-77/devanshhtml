document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answersContainer = document.getElementById('answers-container');
    const submitButton = document.getElementById('submit-button');
    const restartButton = document.getElementById('restart-button');
    const resultContainer = document.getElementById('result-container');
    const resultElement = document.getElementById('result');
    const continueButton = document.getElementById('continue-button');
    const timerElement = document.getElementById('timer');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeModalButton = document.getElementById('close-modal');
    const closeModalIcon = document.querySelector('.close-button');

    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswerIndex = null;
    let timerInterval = null;
    const questionTime = 20;

    const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Paris", "London", "Rome", "Berlin"],
            correct: 0
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "Who wrote 'To Kill a Mockingbird'?",
            answers: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
            correct: 0
        },
        {
            question: "What is the hardest natural substance on Earth?",
            answers: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correct: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: ["Vincent van Gogh", "Claude Monet", "Leonardo da Vinci", "Pablo Picasso"],
            correct: 2
        },
        {
            question: "What is the chemical symbol for gold?",
            answers: ["Au", "Ag", "Pb", "Fe"],
            correct: 0
        }
    ];

    function startTimer() {
        let timeLeft = questionTime;
        timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitAnswer();
            }
        }, 1000);
    }

    function loadQuestion() {
        const q = questions[currentQuestionIndex];
        questionElement.textContent = q.question;
        answersContainer.innerHTML = '';
        q.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.className = 'answer-button';
            button.addEventListener('click', () => handleAnswerClick(index));
            answersContainer.appendChild(button);
        });
        selectedAnswerIndex = null;
        submitButton.disabled = false;
        startTimer();
    }

    function handleAnswerClick(index) {
        selectedAnswerIndex = index;
        const buttons = Array.from(answersContainer.querySelectorAll('.answer-button'));
        buttons.forEach((button, btnIndex) => {
            button.style.backgroundColor = btnIndex === index ? '#03dac6' : '#6200ea';
        });
        submitButton.disabled = false;
    }

    function submitAnswer() {
        clearInterval(timerInterval);
        if (selectedAnswerIndex === null) return;
        const correctAnswerIndex = questions[currentQuestionIndex].correct;
        if (selectedAnswerIndex === correctAnswerIndex) {
            score++;
            resultElement.textContent = 'Correct! Your score: ' + score;
            resultElement.style.color = '#03dac6';
            setTimeout(() => nextQuestion(), 1000); // Automatically go to the next question after 1 second
        } else {
            resultElement.textContent = 'Wrong! The correct answer was: ' + questions[currentQuestionIndex].answers[correctAnswerIndex];
            resultElement.style.color = '#ff5722';
            resultContainer.style.display = 'block';
            submitButton.disabled = true;
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resultContainer.style.display = 'none';
            loadQuestion();
        } else {
            resultElement.textContent = 'Quiz Completed! Your final score: ' + score;
            resultElement.style.color = '#bb86fc';
            resultContainer.style.display = 'block';
            submitButton.style.display = 'none';
            restartButton.style.display = 'block';
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.style.display = 'none';
        submitButton.style.display = 'block';
        restartButton.style.display = 'none';
        loadQuestion();
    }

    function showFeedbackModal() {
        feedbackModal.style.display = 'flex';
    }

    function closeFeedbackModal() {
        feedbackModal.style.display = 'none';
    }

    submitButton.addEventListener('click', submitAnswer);
    restartButton.addEventListener('click', restartQuiz);
    continueButton.addEventListener('click', restartQuiz);
    closeModalButton.addEventListener('click', closeFeedbackModal);
    closeModalIcon.addEventListener('click', closeFeedbackModal);

    loadQuestion();
});
