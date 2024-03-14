let timerInterval;

document.getElementById("start").addEventListener("click", function() {
    const duration = parseInt(document.getElementById("duration").value, 10);
    let timeLeft = duration;
    console.log("timeleft ", timeLeft);
    
    // var dynamicValue = "Hello, world!";
    // Store the dynamic value in chrome.storage
    chrome.storage.local.set({ myDynamicValue: duration });

    timerInterval = setInterval(function() {
        document.getElementById("timerDisplay").textContent = "Time Left: " + timeLeft + " seconds";
        timeLeft--;
        // store timeleft

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").textContent = "Time's up!";
            document.getElementById("stop").disabled = true;
        }
    }, 1000);

    document.getElementById("stop").disabled = false;
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timerInterval);
    document.getElementById("timerDisplay").textContent = "Timer Stopped";
    document.getElementById("stop").disabled = true;
});
