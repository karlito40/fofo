import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Component } from '../lib/store-component';
import { isDev } from '../config';
import thunkMiddleware from 'redux-thunk';

// Loadable components
import './app';
import './feed';
import './form';
import './flash';

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

export function getStore() {
  return store;
}

export function getState(subject) {
  return (!subject) 
    ? store.getState()
    : getDeepValue(subject, store.getState());
}

export function dispatch(action) {
  return store.dispatch(action);
}


function getDeepValue(subject, source) {
  subject = subject || [];
  if(!Array.isArray(subject)) {
    subject = subject.split('.');
  }

  if(!source || !subject.length) {
    return source;
  }
  
  const key = subject.shift();
  return getDeepValue(subject, source[key]);
}

