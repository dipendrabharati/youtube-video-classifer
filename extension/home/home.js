document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.local.get("timerDuration", function(data) {
        document.getElementById("duration").value = data.timerDuration || 10;
    });

    document.getElementById("start").addEventListener("click", function() {
        const duration = parseInt(document.getElementById("duration").value, 10);
        chrome.runtime.sendMessage({ action: "startTimer", duration: duration });
    });

    document.getElementById("stop").addEventListener("click", function() {
        chrome.runtime.sendMessage({ action: "stopTimer" });
    });
});
