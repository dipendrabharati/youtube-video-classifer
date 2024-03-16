document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
        const duration = data.timerDuration || 10;
        const timeLeft = data.timerTimeLeft || 0;

        document.getElementById("duration").value = duration;
        document.getElementById("start").disabled = timeLeft > 0;
    });
    document.getElementById("start").addEventListener("click", function() {
        const duration = parseInt(document.getElementById("duration").value, 10);
        chrome.runtime.sendMessage({ action: "startTimer", duration: duration });
    });

    // document.getElementById("stop").addEventListener("click", function() {
    //     chrome.runtime.sendMessage({ action: "stopTimer" });
    // });
});
