function startTimer() {

}
chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Extension Activated");

    let prev_url;
    let activeTabId;
    let timerStarted = false;

    function updateTab(tabId, changeInfo, tab) {
        let timeLeft;

        chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
            if (data.timerTimeLeft > 0) {
                timeLeft = data.timerTimeLeft;
                console.log("Inside TimeLeft - ", timeLeft);
                
                if (changeInfo.url && tabId === activeTabId) {
                    console.log('Tab URL changed in the active tab\nCurrent Url:', changeInfo.url);
                    var currentUrl = changeInfo.url;

                    if (typeof prev_url === 'undefined' && currentUrl.includes("www.youtube.com/watch")){
                        prev_url = "www.youtube.com";
                        console.log("prev_url -", prev_url, "\ncurrentUrl -", currentUrl);
                    }
                    // update tab if conditional
                    if (prev_url != currentUrl && currentUrl.includes("www.youtube.com/watch")) {
                        console.log("second");
                        console.log("prev_url -", prev_url, "\ncurrentUrl -", currentUrl);
                        query_url = "popup.html?new_url="+currentUrl + "&active_tab=" + activeTabId;
                        chrome.tabs.update(activeTabId, { url: query_url });
                    } else {
                        console.log("Going through else");
                    }
                    prev_url = currentUrl;
                }
            } else {
                console.log("Outside TimeLeft - ", timeLeft);
            }
            
        });
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("tab length", tabs.length);
        if (tabs.length > 0) {
            activeTabId = tabs[0].id;
            console.log("activeTabId - ", activeTabId);

            chrome.tabs.onUpdated.addListener(updateTab);
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
