import React from 'react';
import ReactDOM from 'react-dom';
import { bootstrap } from './app';
import { actions as appActions } from './store/app';
import Root from './root/Root';

import './window';

const AppData = bootstrap();

ReactDOM.render(<Root/>, document.getElementById('root'));


window.addEventListener('message', (e) => {
  let action;
  
  try {
    action = JSON.parse(e.data);
  } catch (e) {
    return;
  }
  
  console.log('message frame', action);
  if(action.source !== AppData.name) {
    return;
  }

  console.log('frame.app message received', action, e);

  if(action.type === 'SET_THEME') {
    AppData.store.dispatch(appActions.setTheme(action.data.theme));
  }

});