import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerStore from './store';

import { actions as me } from './store/app/me';
import { actions as app } from './store/app';

import './window'; // Simple test exportation

const store = registerStore();

// (async function() {
//   await store.dispatch(me.login('karlito40@gmail.com', 'toto'));
//   await store.dispatch(me.fetch());
// })();

// store.dispatch(me.login('karlito40@gmail.com', 'toto'));
// const domain = window.location.hostname;
// const uri = window.location.pathname;

store.dispatch(me.addVisite({
  // domain: 'fr.wikipedia.org', 
  domain: 'allocine.fr', 
}));

// Init address ---> it will be received from contentScript.js
store.dispatch(app.setAddress({
  domain: 'fr.wikipedia.org', 
  uri: '/wiki/Emmanuel_Macron'
})); 

// User restoration
store.dispatch(me.restore()); 

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

// registerServiceWorker();

window.addEventListener('message', (e) => {
  let action = (typeof e.data === 'string') ? JSON.parse(e.data) : e.data;
  if(action.source !== 'parallel-app') {
    return;
  }
  
  console.log('frame.app message received', action, e);

  if(action.type === 'APP.INIT') {
    console.log('send message from app');
    chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
    });
  }
});