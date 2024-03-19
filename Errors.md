# Error 1
- Error in event handler: TypeError: Cannot read properties of undefined (reading 'local') at chrome-extension://jgiegleknnpngknadhodejnkmgdpfpnp/background.js:7:20

- `Resolution` -

# Error 2
- When the user already in YT and sets the timer, the new_url and activeTabId is appended in the url twice.
  The update tab conditional runs twice before the content.js could even notice the params changes in window.location.

- `Resolution` - Issue can be resolved temporarily with adding remove listener to the update tab if conditional but extension won't check category for another video. 
  - Resolved using an if conditional.

# Error 3
- When the user backs up, the user shouldn't able to play the video.
- `Resolution` - Issue is resolved after inserting prev_url var inside the updateTab function.

# Error 4 Redirection
- # stage 1
  - prev_url outside updateTab - prev_url != currentUrl and prev_url = currentUrl
  - 1. Redirection to homepage - Good
  - 2. Redirection to played_video_page - Good
  - 3. Redirection works for playing different videos-

    Issue with solution:
    1. If you click back after redirected to homepage, you will be able to play the video.
    - It could be solved using getting rid of prev_url
    - Use chrome.storage to store a variable status