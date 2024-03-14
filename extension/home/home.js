let timerInterval;
let timeLeft;

document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
        if (data.timerTimeLeft > 0) {
            timeLeft = data.timerTimeLeft;
            updateTimerDisplay();
            startTimer();
        }
        document.getElementById("duration").value = data.timerDuration || 10;
    });
});

document.getElementById("start").addEventListener("click", function() {
    const duration = parseInt(document.getElementById("duration").value, 10);
    timeLeft = duration;

    chrome.storage.local.set({ timerDuration: duration });

    startTimer();
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timerInterval);
    timeLeft = 0;
    updateTimerDisplay();
    chrome.storage.local.set({ timerTimeLeft: 0 });
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
    document.getElementById("stop").disabled = timeLeft <= 0;
}
