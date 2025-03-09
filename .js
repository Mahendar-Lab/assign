let timerInterval;
let timeRemaining = 0;
let timerMode = "short"; // Default to short break

const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const timerModeSelect = document.getElementById("timer-mode");

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

function startTimer() {
    if (timerMode === "short") {
        timeRemaining = 300; // 5 minutes
    } else {
        timeRemaining = 900; // 15 minutes
    }
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    timerInterval = setInterval(function() {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining < 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeRemaining = 0;
    updateTimerDisplay();
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
}

// Event Listeners
startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
timerModeSelect.addEventListener("change", () => {
    timerMode = timerModeSelect.value;
    resetTimer(); // Reset timer when mode changes
});
