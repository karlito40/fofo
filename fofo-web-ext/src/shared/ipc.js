export function listen(options = {}) {
  console.log('listen options', options);
  const listenOn = getListenOn(options);
  chrome.runtime[listenOn].addListener(listener(options));
}

const serviceContent = {
  // Current tab
  current() {
    return new Proxy({}, {
      get(obj, cmd) {
        return async (...args) => {
          const tab = await getCurrentTab();
          return callContent(tab.id, cmd, ...args);
        }
      }
    });
  },
  // Target tab
  get(tabId) {
    return new Proxy({}, {
      get(obj, cmd) {
        return (...args) => callContent(tabId, cmd, ...args);
      }
    });
  }  
};

const serviceBackground = new Proxy({}, {
  get(obj, cmd) {
    return (...args) => callBackground(cmd, ...args);
  }
});

export const service = {
  content: serviceContent,
  background: serviceBackground,
};

export default service;

export async function callContent(tabId, cmd, ...args) {
  return sendMessage(tabId, createAction(cmd, ...args));
}

export function callBackground(cmd, ...args) {
  return sendMessage(createAction(cmd, ...args));
}

export function sendMessage(...args) {
  return new Promise((resolve, reject) => {
    let running = setTimeout(() => {
      reject(new Error('Timeout exceed'));
      running = null;
    }, 5000);

    const onReceipt = (response) => {
      if(running) {
        resolve(response);
        clearTimeout(running);
      }
    };

    if(typeof args[0] === 'number') {
      chrome.tabs.sendMessage(...args, onReceipt);
    } else {
      chrome.runtime.sendMessage(...args, onReceipt)  
    }
  }); 
}

export function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      resolve(tabs[0]);
    });
  });
}

function createAction(cmd, ...args) {
  return { cmd, args };
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

