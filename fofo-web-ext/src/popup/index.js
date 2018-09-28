import React from 'react';
import ReactDOM from 'react-dom';
import { createElement } from '../shared/dom';
import * as ipc from '../shared/ipc';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// console.log('popup.js');

// const buttonToogle = createElement('button', {}, {
//   backgroundColor: 'red',
//   color: 'green',
// });

// button.addEventListener('click', () => {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     ipc.send(tabs[0].id, 'setConfig', {panel: 'sidebar'});
//   });
// });

// button.appendChild(document.createTextNode('Button'));

// document.body.appendChild(button);