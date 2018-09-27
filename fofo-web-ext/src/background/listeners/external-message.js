chrome.runtime.onMessageExternal.addListener(function(msg, sender, sendResponse) {
  console.log('background.js onMessageExternal received', msg);
  if(!sender.tab) {
    console.log('invalid sender', sender);
    return;
  }
  console.log('sender', sender);
  // if (msg.from === 'popup' && msg.method === 'ping') {
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(sender.tab.id, msg, function(response) {
        // sendResponse(response.data);
      });
    // });
    // return true; // <-- Indicate that sendResponse will be async
  // }
});
