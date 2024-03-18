# Error 1
- Error in event handler: TypeError: Cannot read properties of undefined (reading 'local') at chrome-extension://jgiegleknnpngknadhodejnkmgdpfpnp/background.js:7:20

- `Resolution` -

# Error 2
- When the user already in YT and sets the timer, the new_url and activeTabId is appended in the url twice.
  The update tab conditional runs twice before the content.js could even notice the params changes in window.location.

- `Resolution` - Issue can be resolved temporarily with adding remove listener to the update tab if conditional but extension won't check category for another video. 
  - Resolved using an if conditional.