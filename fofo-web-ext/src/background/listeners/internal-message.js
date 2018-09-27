import * as commands from '../commands';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let response = null;

  // onMessage.addListener n'accepte pas l'utilisation d'async comme param 
  // donc on se doit d'utiliser le bon vieux then à la place d'await
  if(request.cmd && commands[request.cmd]) {
    console.log(`executing ${request.cmd}...`);
    response = commands[request.cmd](...request.args, sender);
    if(response instanceof Promise) {
      response.then(sendResponse);
      return true;
    }
  } 

  sendResponse(response)
});


