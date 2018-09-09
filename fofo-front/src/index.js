import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import registerStore from './store';

import * as api from './store/api';
import { actions as meActions } from './store/app/me';

const store = registerStore();

api.setToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImI5MmI2NzJhYzRjZjUyMDYyMjU0ZmQwODI2NGEwNDE2YWVmMTZlMzVjMjQ2OTRhOTI3ODgzYmZhMWE5OTc5Mzg0Y2MxZDA1YjEwNmIxOTFmIn0.eyJhdWQiOiIzIiwianRpIjoiYjkyYjY3MmFjNGNmNTIwNjIyNTRmZDA4MjY0YTA0MTZhZWYxNmUzNWMyNDY5NGE5Mjc4ODNiZmExYTk5NzkzODRjYzFkMDViMTA2YjE5MWYiLCJpYXQiOjE1MzQ5NTgyMDYsIm5iZiI6MTUzNDk1ODIwNiwiZXhwIjoxNTY2NDk0MjA2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.m9Vst2hDEt7MSXYgtfhTO-TqeBQhz976eOJtMkdge8z0Y4FyOnSk1tnkRiu6AHiwIJ9RecBfLfy4AKyRlh3Jmq3lxmib9MR6IBOawKCJuGgHnAUmxii7qo7p4uNPUg1QwfF02hijhlujdHWjMxVXOVqLwWV5cXVQELD3PZD_4M1a7OsctheJDG5HTwDID3O2iFssLq6doj6vU7tnT5rfslBf7T06Z0Uj5vJ8mlkaoUpFzzj1pTqinPCZM7-j7hsQevPkz_g-Pl9D05dUsiFe434gWz1MFKosuOFEYZrkRrewJOVmXkbjQnAA6hCmPAxi8lgRBodz1wtBl5GjM6MucGXHXJUA_P_lkFLCLUXWpaPP4tRtEYTcqewQTG83Hyd3-Vk696gAsykm2BqoZgs5QHr00N_8fzJDfncQxRNHITXrSydy2KJoadY20peLYNxDJmsPcxawwvMUWSQ8KGOFQDkVhwVIAWk2z0gb18SqcMSYb1CWvtFlZUJI4L6xM6UyWO70_nMd5FQQgUCdyH54hVJei5_DCjzzNDhE_OSVQEMSCpkAB90M3aeCpxVKICCLnmYPI_LZDtnfdpK5o4LaA1wHEl1PEqJvZzwEwCMy-ClKY4zi9yDVeJ_QIEqFlRrQU1JACuymEbQBrdVdozjETscXPzGBtQ4x_vm_rb_nh6w');

(async function() {
  await store.dispatch(meActions.login('karlito40@gmail.com', 'toto'));
  await store.dispatch(meActions.fetch());
})();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root'));

registerServiceWorker();



window.addEventListener('message', (e) => {
  let action = (typeof e.data === 'string') ? JSON.parse(e.data) : e.data;
  if(action.source !== 'parallel-app') {
    return;
  }
  
  console.log('frame.app message received', action, e);

  if(action.type === 'APP.INIT') {
    console.log('send message from app');
    chrome.runtime.sendMessage(action.data.extid, {from: 'popup', method:'ping'}, function(response) { // eslint-disable-line
    
    });
  }
});