import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerGlobalStyle from './themes/globalStyle';
import registerStore, { store } from './store';
import {actions as appActions} from './store/app';
import {actions as globalActions} from './store/global';
import {actions as totoActions} from './store/toto';
import {actions as userActions} from './store/app/user';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
registerGlobalStyle();
registerStore();

store.dispatch(appActions.test('.1'));
store.dispatch(appActions.helloWorld('.2'));
store.dispatch(appActions.otherEvent('.3'));
store.dispatch(totoActions.test('fefzef'));
store.dispatch(globalActions.simpleTest('.4'));
store.dispatch(userActions.test('user action send'));

window.addEventListener('message', (e) => {
  let action = (typeof e.data === 'string') ? JSON.parse(e.data) : e.data;
  if(action.source !== 'parallel-app') {
    return;
  }
  
  console.log('frame.app message received', action, e);

  if(action.type === 'INIT') {
    console.log('send message from app');
    chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
    });
  }
});