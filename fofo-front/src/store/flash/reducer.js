import config from '../../config';
import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../api';
import { MESSAGE_SUCCESS, MESSAGE_ERROR } from './constants';

export default {
  _state: {
    messages: []
  },
  self: {
    add(state, payload) {
      return addMessage(state, payload);
    },
    shift(state, payload) {
      return { messages: state.messages.slice(1) };
    }
  },
  'form.auth': {
    login(state, payload) {
      return handleAuth(state, payload);
    },
    register(state, payload) {
      return handleAuth(state, payload);
    },  
  }
};

function handleAuth(state, payload) {
  if(payload.status === REQUEST_COMPLETE) {
    const { user } = payload.response.data;
    return addMessage(state, `We are happy to see you ${user.name}`); 
  }

  if(payload.status === REQUEST_ERROR) {
    return addMessage(state, { text: 'Something weird happened', type: MESSAGE_ERROR }); 
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