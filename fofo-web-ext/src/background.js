console.log('background.js')
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('tab changed', changeInfo);
  chrome.tabs.get(tabId, function(tab) {
    console.log('event tab updated sent', changeInfo);
    chrome.tabs.sendMessage(tabId, {
      message: 'tab.updated',
      status: changeInfo.status,
      data: {
        url: tab.url
      }
    });
  });
});
