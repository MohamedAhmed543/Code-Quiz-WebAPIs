import { questions } from './questions.js';


const startButton = document.getElementById("start");
const timeElement = document.getElementById("time");
const questionTitle = document.getElementById("question-title");
const choices = document.getElementById("choices");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const finalScore = document.getElementById("final-score");

let currentQuestionIndex = 0;
let timeLeft = 60; // Set your initial time limit

// Event listener to start the quiz
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");

  // Initialize the timer
  updateTimer();
  const timerInterval = setInterval(() => {
    updateTimer();
    if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);

  // Display the first question
  displayQuestion(currentQuestionIndex);
}

function updateTimer() {
  timeElement.textContent = `Time: ${timeLeft}`;
  timeLeft--;
}

function displayQuestion(index) {
  if (index < questions.length) {
    const question = questions[index];
    questionTitle.textContent = question.question;
    choices.innerHTML = "";

    for (let i = 0; i < question.choices.length; i++) {
      const choice = document.createElement("button");
      choice.textContent = question.choices[i];
      choice.addEventListener("click", () => checkAnswer(choice, question));
      choices.appendChild(choice);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedChoice, question) {
  if (selectedChoice.textContent === question.answer) {
    currentQuestionIndex++;
    displayQuestion(currentQuestionIndex);
  } else {
    timeLeft -= 10; // Penalty for incorrect answer
    displayQuestion(++currentQuestionIndex);
  }
}

function endQuiz() {
  document.getElementById("questions").classList.add("hide");
  document.getElementById("end-screen").classList.remove("hide");
  finalScore.textContent = timeLeft;

  submitButton.addEventListener("click", saveScore);
}

function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials) {
    // Save the score and initials, e.g., using localStorage
    // Example: localStorage.setItem("highScores", JSON.stringify([...]));
    alert(`Score saved for ${initials}`);
  }

  // Redirect to the highscores page or take any other action as needed.
  // Example: window.location.href = "highscores.html";
}
