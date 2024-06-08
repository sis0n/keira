document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const quizContainer = document.getElementById('quizContainer');
    const questionsDiv = document.getElementById('questions');
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const nextButton = document.getElementById('nextButton');
    const prevButton = document.getElementById('prevButton');
    const scoreDisplay = document.getElementById('scoreDisplay');

    let correctAnswers = 0;
    let currentQuestionIndex = 0;
    let selectedQuestions = [];
    let userAnswers = {};
    let noButtonClickCount = 0; // Counter for "No" button clicks

    // Array of questions
    const questions = [
        {
            question: "miss mo ba ako?",
            answer: "Yes"
        },
    ];

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetQuiz();
        loadQuestions();
        quizForm.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion(selectedQuestions[currentQuestionIndex]);
    });

    yesButton.addEventListener('click', () => {
        userAnswers[currentQuestionIndex] = "Yes";
        Swal.fire({
            title: "aw :( miss u more!",
            icon: "success",
            confirmButtonText: "OK"
        });
        goToNextQuestion();
    });

    noButton.addEventListener('click', () => {
        if (noButtonClickCount === 0) {
            noButton.textContent = "sure?";
        } else if (noButtonClickCount === 1) {
            noButton.textContent = "di nga?";
            noButton.style.padding = 'auto';
        } else if (noButtonClickCount === 2) {
            noButton.textContent = "masakit ah";
            noButton.style.width = '100px';
        } else if (noButtonClickCount === 3) {
            noButton.textContent = "nuba";
        } else if (noButtonClickCount === 4) {
            noButton.textContent = "last chance?";
        } else {
            noButton.textContent = "No"; // Reset the text to default
            noButtonClickCount = 0;
            userAnswers[currentQuestionIndex] = "No"; // Record the answer
            moveNoButton();
            // Show SweetAlert after the fifth click
            Swal.fire({
                title: "k.",
                icon: "success",
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                resetNoButtonPosition();
            }, 2000);
            return;
        }
        
        userAnswers[currentQuestionIndex] = "No";
        moveNoButton();
        noButtonClickCount++; // Increment the counter
    });

    function resetQuiz() {
        correctAnswers = 0;
        currentQuestionIndex = 0;
        userAnswers = {};
        prevButton.style.display = 'none';
        nextButton.style.display = 'inline-block';
    }

    function loadQuestions() {
        selectedQuestions = questions;
    }

    function displayQuestion(question) {
        questionsDiv.innerHTML = '';
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');

        const questionNumber = document.createElement('h3');
        questionElement.appendChild(questionNumber);

        const questionText = document.createElement('h4');
        questionText.textContent = question.question;
        questionText.style.fontSize = '30px';
        questionText.style.textAlign = 'center';
        questionElement.appendChild(questionText);

        questionsDiv.appendChild(questionElement);

        prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
        nextButton.style.display = 'none';
        yesButton.style.display = 'inline-block';
        noButton.style.display = 'inline-block';
    }

    function moveNoButton() {
        const randomPositionX = Math.floor(Math.random() * (window.innerWidth - noButton.offsetWidth));
        const randomPositionY = Math.floor(Math.random() * (window.innerHeight - noButton.offsetHeight));
        noButton.style.position = 'absolute';
        noButton.style.top = randomPositionY + 'px';
        noButton.style.left = randomPositionX + 'px';
    }

    function resetNoButtonPosition() {
        noButton.style.position = 'static';
        noButton.style.top = 'auto';
        noButton.style.left = 'auto';
    }

    function goToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            displayQuestion(selectedQuestions[currentQuestionIndex]);
        } else {
            showResults();
        }
    }

    function showResults() {
        questionsDiv.innerHTML = '';

        selectedQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                correctAnswers++;
            }
        });

        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
    }
});