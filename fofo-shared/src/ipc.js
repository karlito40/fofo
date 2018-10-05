import { EventEmitter } from 'events';

const events = new EventEmitter();

/* eslint-disable no-undef */
export function listen(options = {}) {
  const listenOn = getListenOn(options);
  chrome.runtime[listenOn].addListener(listener(options));
}

export function listenExternal(options = {}) {
  options = {...options, external: true};
  listen(options);
}

const serviceContent = {
  // Current tab
  current() {
    return new Proxy({}, {
      get(obj, cmd) {
        return async (...args) => {
          const tab = await getCurrentTab();
          if(!tab) {
            console.log('current tab does not exist');
          }
          
          return tab 
            ? callContent(tab.id, cmd, ...args)
            : null;
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

const platformConfig = { extensionId: null };
export function withExtension(extId) {
  platformConfig.isExternal = true;
  platformConfig.extensionId = extId;
}

export async function callContent(tabId, cmd, ...args) {
  return sendMessage(tabId, createAction(cmd, ...args));
}

export function callBackground(cmd, ...args) {
  return sendMessage(createAction(cmd, ...args));
}

export function sendMessage(...args) {
  return new Promise((resolve, reject) => {
    const close = reason => {
      reject(new Error(reason || 'Timeout exceed'));
      clearTimeout(running);
      running = null;
    };

    let running = setTimeout(close, 5000);

    const onReceipt = (response) => {
      if(running) {
        resolve(response);
        clearTimeout(running);
      }
    };

    if(typeof args[0] === 'number') {
      chrome.tabs.sendMessage(...args, onReceipt);
    } else if(platformConfig.isExternal) {
      if(!platformConfig.extensionId) {
        return close('Cannot call the background script from an external source without extensionId');
      }

      chrome.runtime.sendMessage(platformConfig.extensionId, ...args, onReceipt)  
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
        response.then(response => {
          events.emit(request.cmd, response);
          sendResponse(response);
        });

        return true;
      }

      events.emit(request.cmd, response);
    } 

    sendResponse(response);
  }
}

export { events };

function getListenOn(options = {}) {
  return (options.external) ? 'onMessageExternal' : 'onMessage';
}

