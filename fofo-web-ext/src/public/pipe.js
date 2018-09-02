// console.log('send message');
// chrome.runtime.sendMessage({from: 'popup', method:'ping'}, function(response) {
    
// });

window.addEventListener('message', (e) => {
  console.log('frame.csp message received', e.data);
  document.querySelector('iframe').contentWindow.postMessage(e.data, '*');
});