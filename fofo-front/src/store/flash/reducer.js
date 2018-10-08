import config from '../../shared/config';
import {_} from '../../shared/i18n';
import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../api';
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from './constants';

export default {
  _state: {
    messages: []
  },
  self: {
    add: addMessage,
    next(state, payload) {
      return { messages: state.messages.slice(1) };
    }
  },
  'form.auth': {
    login: handleAuth,
    register: handleAuth,  
  },
  'api': {
    requestError(state, payload) {
      if(payload.fromType === 'APP.USER.RESTORE') {
        return state;
      }

      if(payload.error && payload.error.response.data) {
        const { message, code } = payload.error.response.data.error;

        if(message) {
          return addMessage(state, {text: _(message), type: MESSAGE_ERROR});
        } else if(typeof code === 'string') {
          return addMessage(state, {text: _(code), type: MESSAGE_ERROR});
        }
        
      }

      return state;
    }
  }
};

function handleAuth(state, payload) {
  if(payload.status === REQUEST_COMPLETE) {
    const { user } = payload.response.data;
    return addMessage(state, _(`We are happy to see you :name`, {
      ':name': user.name
    })); 
  }

  if(payload.status === REQUEST_ERROR) {
    const responseError = payload.response && payload.response.error;
    if (responseError && responseError.code === 'INVALID_CREDENTIALS') {
      return addMessage(state, { text: _('Login failed'), type: MESSAGE_ERROR });   
    }
    
    if (!responseError || responseError.code !== 'INVALID_INPUTS') {
      return addMessage(state, { text: _('Something weird happened'), type: MESSAGE_ERROR }); 
    }
    
  }

  return state;
}

let messageId = 1;
function addMessage(state, message) {
  if(typeof message === 'string') {
    message = { text: message };
  }

  const defaultAttrs = { type: MESSAGE_SUCCESS, timeout: config.flashTimeout };
  message = {...defaultAttrs, ...message, id: messageId++};

  return { messages: [...state.messages, message] }; 
}