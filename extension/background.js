chrome.tabs.onCreated.addListener(function(tab) {
    console.log("Start");

    setTimeout(function() {
    console.log("Waited for 5 seconds");

    currentUrl = tab.url;
    console.log(currentUrl, tab.id);

    if (currentUrl.includes("www.youtube.com/watch")) {
        console.log("Inside");
    }

    chrome.tabs.update(tab.id, { url: "popup.html" });

    console.log("End");
    }, 5000);

});
    // I want to check if the url of this tab got updated

    // chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    //     if (changeInfo.url) {
    //         console.log('Tab URL changed Current Url:', changeInfo.url);
    //         var currentUrl = changeInfo.url;

    //         if (currentUrl.includes("www.youtube.com/watch")) {
    //             console.log("Inside");

    //             chrome.tabs.update(tabId, { url: "popup.html?newurl="+currentUrl });

    //         }else{
    //             console.log("Going through else");
    //         }
    //     }

    // });

