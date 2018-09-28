import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createElement } from '../shared/dom';
import serviceIPC, * as ipc from '../shared/ipc';
import App from './App';

console.log('popup.js');

ReactDOM.render(<App />, document.getElementById('root'));

const button = createElement('button', {}, {
  backgroundColor: 'red',
  color: 'green',
});

button.addEventListener('click', async () => {
  const tab = await ipc.getCurrentTab();
  console.log('tab.id', tab.id);
  const response = await serviceIPC.content.get(tab.id).setConfig({panel: 'sidebar', d: Date.now()});
  console.log('response', response);
});

button.appendChild(document.createTextNode('Button'));

document.body.appendChild(button);