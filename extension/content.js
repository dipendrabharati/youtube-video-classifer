//make a request to the backend
let params = new URLSearchParams(window.location.search);
let currentUrl = params.get('new_url');
let activeTabId = parseInt(params.get("active_tab"));
let new_url;
console.log("Making Request");
console.log("url - ", currentUrl, " active tab - ", activeTabId);
const p = document.getElementById("output");

fetch_url = "http://127.0.0.1:5000/summary?url=" + currentUrl;

const options = { method: "GET" };
async function fetchData(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    } finally {
        console.log('Fetching data completed.'); 
    }
}
fetchData(fetch_url, options)
    .then(data => {
        console.log(data.category);
        if (data.category === "NOT STEM"){
            new_url = "https://www.youtube.com";
            p.innerHTML = "Redirecting to homepage......"
            console.log("new_url - ", new_url);
        } else {
            new_url = currentUrl;
            console.log("new_url - ", new_url);
            p.innerHTML = "Continuing to requested page......"
        }
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            let currentTab = tabs[0].id;
            console.log("currentTab - ", typeof(currentTab), "activeTab -", typeof(activeTabId));
            console.log("new_url ", new_url);

            if (currentTab === activeTabId){
                console.log("True");
                chrome.tabs.update(tabs[0].id, { url: new_url });
            }else{
                console.log("False");
            }
        });
    })
    .catch(error => {
        console.error(error);
    });








