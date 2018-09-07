import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerStore from './store';

// import registerStore, { store } from './store';
// import {actions as appActions} from './store/app';
// import {actions as globalActions} from './store/global';
// import {actions as totoActions} from './store/toto';
// import {actions as userActions} from './store/app/user';

import {actions as appActions} from './store/app';

const store = registerStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();

// store.dispatch(appActions.test('.1'));
// store.dispatch(appActions.helloWorld('.2'));
// store.dispatch(appActions.otherEvent('.3'));
// store.dispatch(totoActions.test('fefzef'));
// store.dispatch(globalActions.simpleTest('.4'));
// store.dispatch(userActions.test('user action send'));

// setInterval(() => {
//   store.dispatch(appActions.toggleTheme());
// }, 1000);

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