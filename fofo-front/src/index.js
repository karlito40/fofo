import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerGlobalStyle from './themes/globalStyle';

window.addEventListener('message', (e) => {
  console.log('frame.app message received', e);
  const action = JSON.parse(e.data);
  if(action.type === 'INIT') {
    console.log('send message from app');
    chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
    });
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
registerGlobalStyle();
