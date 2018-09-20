import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerStore, { getState } from './store';

import { actions as user } from './store/app/user';
import { actions as visites } from './store/app/user/visites';
import { actions as app } from './store/app';
import { getToken } from './store/api';

import './window'; // Simple test exportation

const store = registerStore();

// (async function() {
//   await store.dispatch(me.login('karlito40@gmail.com', 'toto'));
//   await store.dispatch(me.fetch());
// })();

// store.dispatch(me.login('karlito40@gmail.com', 'toto'));
// const domain = window.location.hostname;
// const uri = window.location.pathname;


// Init address ---> it will be received from contentScript.js
store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron')); 
// store.dispatch(app.setAddress('allocine.fr', '/')); 

// User restoration
async function restoreState() {
  if(getToken()) {
    await store.dispatch(user.fetch()); 
    if(!getState('app.user.isLogged')) {
      store.dispatch(visites.fetchByIp());   
    }
  } else {
    store.dispatch(visites.fetchByIp()); 
  }
  
  
}

restoreState();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

// registerServiceWorker();
// console.log('search --->', window.location.search);

window.addEventListener('message', (e) => {
  let action;
  
  try {
    action = JSON.parse(e.data);
  } catch (e) {
    return;
  }

  if(action.source !== 'parallel-app') {
    return;
  }
  
  console.log('frame.app message received', action, e);

  // if(action.type === 'APP.INIT') {
  //   console.log('send message from app');
  //   chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
  //   });
  // }
});