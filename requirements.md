# Requirements
1. When the user creates a new tab and then goes to the url in two step process.
2. When the user directly opens the url link in the new tab.
3. When the user updates the url in the new tab.
4. When the user updates the url in the different tab.
5. When the user stays in the new tab making it active while the url loads or is loading.
6. When the user moves to a different tab making the newly opened tab inactive.

# Obstacles
1. When the redirects occurs with .Onupdated, it is looping because .Onupdated notices the change in the url. How to prevent that
2. Pass tabId to content.js in the backend.
3. Redirect tab with tabId.