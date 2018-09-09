import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Component } from '../lib/store-component';
import { isDev } from '../config';
import thunkMiddleware from 'redux-thunk';

// Loadable components
import './app';

let store = null;
export default function() {
  store = createStore(
    combineReducers(Component.getCombineReducers()), 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  if(isDev()) {
    window.store = store;
  }

  return store;
}

export { store }; 

