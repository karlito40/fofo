import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as StoreProvider } from 'react-redux';
import { bootstrap } from './app';
import { actions as appActions } from './store/app';
import App from './containers/App';

import './window';

const AppData = bootstrap();

ReactDOM.render((
  <StoreProvider store={AppData.store}>
    <App/>
  </StoreProvider>
), document.getElementById('root'));


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