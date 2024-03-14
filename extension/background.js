chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Extension Activated");

    // chrome.storage.local.get(["timerDuration", "timerTimeLeft"], function(data) {
    //     if (data.timerTimeLeft > 0) {
    //         timeLeft = data.timerTimeLeft;
    //         console.log("TimeLeft - ", timeLeft);
    //     }else{
    //         console.log("TimeLeft - ", timeLeft);
    //     }
    // });

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