export function listen(options = {}) {
  console.log('listen options', options);
  const listenOn = getListenOn(options);
  chrome.runtime[listenOn].addListener(listener(options));
}

function createAction(cmd, ...args) {
  return { cmd, args };
}

export function send(...args) {
  return (typeof args[0] === 'number')
    ? sendToContent(...args)
    : sendToBackground(...args);
}

export function sendToContent(tabId, cmd, ...args) {
  return executeMessage(clean => 
    chrome.tabs.sendMessage(tabId, createAction(cmd, ...args), clean)
  );
  
}

export function sendToBackground(cmd, ...args) {
  return executeMessage(clean => 
    chrome.runtime.sendMessage(createAction(cmd, ...args), clean)
  );
}

function executeMessage(toScript) {
  return new Promise((resolve, reject) => {
    // On envoi une erreur lorsque la réponse prend trop de temps
    let running = setTimeout(() => {
      reject(new Error('Timeout exceed'));
      running = null;
    }, 5000);

    toScript((response) => {
      if(running) {
        resolve(response);
        clearTimeout(running);
      }
    });

  });
}

function listener(options = {}) {
  const commands = options.commands || {};
  const listenOn = getListenOn(options);
  return function onMessage(request, sender, sendResponse) {
    console.log(`Received message ${listenOn}`, request);

    let response = null;
    
    if(request.cmd && commands[request.cmd]) {
      response = commands[request.cmd](...request.args, sender);
      if(response instanceof Promise) {
        response.then(sendResponse);
        return true;
      }
    } 

    sendResponse(response);
  }
}

function getListenOn(options = {}) {
  return (options.external) ? 'onMessageExternal' : 'onMessage';
}

