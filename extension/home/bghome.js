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
    chrome.action.setBadgeText({ text: timeLeft > 0 ? timeLeft.toString() : "" });
    chrome.action.setBadgeBackgroundColor({ color: timeLeft > 0 ? "green" : "red" });
    document.getElementById("timerDisplay").textContent = "Time Left: " + timeLeft + " seconds";
    // document.getElementById("stop").disabled = timeLeft <= 0;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startTimer") {
        duration = request.duration;
        timeLeft = duration;
        startTimer();
        chrome.storage.local.set({ timerDuration: duration });

    } else if (request.action === "stopTimer") {
        clearInterval(timerInterval);
        timeLeft = 0;
        chrome.storage.local.set({ timerTimeLeft: 0 });
        updateTimerDisplay();
    }
});

chrome.action.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url: "home.html",
        type: "popup",
        width: 300,
        height: 200
    });
});
