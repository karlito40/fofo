import { EventEmitter } from 'events';

const TIMEOUT = 5000;

const exposable = {
  _store: new Map(),
  async handleMessage(data) {
    const { cmdName, args, messageId } = JSON.parse(event.data);
    const func = this._store.get(cmdName);
    const response = (func)
      ? await func(...args)
      : { _error: { code: 'FUNCTION_NOT_FOUND' } };
    
    sendMessage(JSON.stringify({
      response,
      cmdName,
      messageId
    }));
  },
  add(cmdName, func) {
    if (typeof func !== 'function') {
      throw new Error('Only function are exposable');
    }

    if (this._store.has(cmdName)) {
      throw new Error('A function with same name is already defined');
    }

    this._store.set(cmdName, func);
    registerMessageListener();
  }
};


const _service = {
  emitter: new EventEmitter(),
  handleMessage(data) {
    const { cmdName, messageId, response } = JSON.parse(event.data);
    const channelResponse = createChannelResponse(cmdName, messageId);
    this.emitter.emit(channelResponse, response);
  },
  send(cmdName, ...argsSent) {
    registerMessageListener();

    const id = this._messageSent++;
    const responses = [];

    return new Promise((resolve, reject) => {
      const channelResponse = createChannelResponse(cmdName, id);
      
      const timeout = setTimeout(() => {
        this.emitter.removeListener(channelResponse, listener);
        reject(new Error('Request Timeout'));
      }, TIMEOUT);
      
      const listener = (event, response) => {
        this.emitter.removeListener(channelResponse, listener);
        clearTimeout(timeout);
        resolve(response);
      };

      this.emitter.on(channelResponse, listener);

      sendMessage(JSON.stringify({
        cmdName,
        messageId: id,
        args: argsSent
      }));
      
    });
  },
};

_service.cmd = new Proxy(_service, {
  get(obj, prop) {
    return (...args) => obj.send(prop, ...args);
  }
});

export default {
  service: _service.cmd,
  expose: exposable.add.bind(exposable),
  dispose: () => {}
};

function createChannelResponse(channel, id) {
  return `${channel}.response.${id}`;
}

function sendMessage(msg) {
  let targetWins = [window.parent];
  if (window.parent === window.top) {
    console.log('sendMessage from content script');
    targetWins = [...document.querySelectorAll('iframe')].map(frame => frame.contentWindow);
  } else {
    console.log('sendMessage from embeded frame');
  }

  targetWins.forEach(function(win) {
    win.postMessage(msg, '*');
  });
}

let hasStart = false;
function registerMessageListener() {
  if (hasStart) {
    return;
  }

  hasStart = true;

  window.addEventListener('message', async (event) => {
    console.log('received message', event);
    const data = JSON.parse(event.data);
    if(!data.response) {
      return exposable.handleMessage(data);
    }

    return _service.handleMessage(data);
  });
}