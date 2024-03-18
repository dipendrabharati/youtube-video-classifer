let timerInterval;
let timeLeft = 0;
let duration = 0;

chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
    duration = data.timerDuration || 10;
    timeLeft = data.timerTimeLeft || 0;

    if (timeLeft > 0) {
        startTimer();
    }
});

function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft = 0;
            updateTimerDisplay();
        }

        chrome.storage.local.set({ timerTimeLeft: timeLeft });
    }, 1000);
}

function updateTimerDisplay() {
    document.getElementById("timerDisplay").textContent = "Time Left: " + timeLeft + " seconds";
}
