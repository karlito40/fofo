import React, { Component, Fragment } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import App from './App';
import AppData from '../app';

export default class Fofo extends Component {
  render() {
    return (
      <StoreProvider store={AppData.store}>
        <App/>
      </StoreProvider>
    );
  } 
}

