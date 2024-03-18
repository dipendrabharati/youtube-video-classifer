# Requirements
1. When the user creates a new tab and then goes to youtube and access the url/video in a step-wise process. - Completed
2. When the user directly opens the url link in the new tab. - Not Done
3. When the user updates the url in the new tab. - Done
4. When the user updates the url in the different tab. - Done
5. When the user stays in the new tab making it active while the url loads or is loading. - Done
6. When the user moves to a different tab making the newly opened tab inactive. - Done
7. When the user backs up, the user shouldn't able to play the video.
8. When the user clicks on already played video with certain time elapsed. For example - https://www.youtube.com/watch?v=WUvTyaaNkzM&t=4s  - extension loops one more time for this but works.
9. 

# Non-Functional Requirements
1. Retrieve set timer from button click and store in chrome.storage
2. Retrieve the value from chrome storage.

# Obstacles
  # Completed
    2. Pass tabId to content.js in the backend. - Completed

  # In Progress
    1. When the redirects occurs with .Onupdated, it is looping because .Onupdated notices the change in the url. How to prevent that? 
        - Redirection prevented using prev_url on background.js
        A. Issue - Upon clicking on new video in browser .Onupdated listener is not activated allowing access to the url.
            - fixed using if conditional equating prev_url with currentUrl
    
    3. Redirect tab with tabId. 
        - Resolved by sending the tabId using quering parameters.

    4. 