chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Extension Activated");
    
    let prev_url;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0) {
            let activeTabId = tabs[0].id;

            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                let timeLeft;
                chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
                    if (data.timerTimeLeft > 0) {
                        timeLeft = data.timerTimeLeft;
                        console.log("TimeLeft - ", timeLeft);

                        if (changeInfo.url && tabId === activeTabId) {
                            console.log('Tab URL changed in the active tab\nCurrent Url:', changeInfo.url);
                            var currentUrl = changeInfo.url;

                            if (prev_url != currentUrl && currentUrl.includes("www.youtube.com/watch")) {
                                console.log("prev_url -", prev_url, "\ncurrentUrl -", currentUrl);
                                query_url = "popup.html?new_url="+currentUrl + "&active_tab=" + activeTabId;
                                chrome.tabs.update(activeTabId, { url: query_url });

                            }else{
                                console.log("Going through else");
                            }
                            prev_url = currentUrl;
                        }
                    }else{
                        console.log("TimeLeft - ", timeLeft);
                    }
                });
            });
        }
    });
});

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
        updateTimerDisplay();
        chrome.storage.local.set({ timerTimeLeft: 0 });
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
