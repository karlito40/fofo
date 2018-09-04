import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import appModule from './app';
import { modules } from '../lib/ModuleStore';
import { isDev } from '../config';

let store = null;
export default function() {
  store = createStore(
    combineReducers(modules.getReducers()), 
    composeWithDevTools()
  );

  if(isDev()) {
    window.store = store;
  }

  return store;
}

export { store }; 

