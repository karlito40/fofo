import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Component } from '../lib/store-component';
import { isDev } from '../config';

// Loadable components
import './app';
// import './toto';

let store = null;
export default function() {
  store = createStore(
    combineReducers(Component.getCombineReducers()), 
    composeWithDevTools()
  );

  if(isDev()) {
    window.store = store;
  }

  return store;
}

export { store }; 

