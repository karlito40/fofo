import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import appModule from './app';
import { isDev } from '../config';

let store = null;
export default function() {
  store = createStore(combineReducers({
    ...appModule.getReducer(),
  }), composeWithDevTools());

  if(isDev()) {
    window.store = store;
  }

  return store;
}

export { store }; 

