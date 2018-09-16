import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    active: false,
    loading: false,
  },
  self: {
    active(state, payload) {
      return {...state, active: payload.active};
    },
    login(state, payload) {
      return handleRequest(state, payload);
    },
    register(state, payload) {
      return handleRequest(state, payload);
    },
  },
  
};


function handleRequest(state, payload) {
  switch(payload.status) {
    case REQUEST_LOADING:
      return {...state,  loading: true};

    case REQUEST_COMPLETE:
    case REQUEST_ERROR:
    default:
      return {...state, loading: false};
  }
}