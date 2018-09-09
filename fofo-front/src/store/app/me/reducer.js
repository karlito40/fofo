import { setToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';

export default {
  _state: {
    loading: false,
  },
  self: {
    restore(state, payload) {
      if(!payload) {
        console.log('Unable to restore myself');
        return state;
      }

      return handleFetch(state, payload);
    },
    login(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          const { user } = payload.response.data;
    
          setToken(payload.response.data.access_token);
    
          return {...state, ...user, loading: false};
        
        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};
      }
    },
    fetch(state, payload) {
      return handleFetch(state, payload);
    }
  }
};

function handleFetch(state, payload) {
  switch(payload.status) {
    case REQUEST_COMPLETE:
      return {...state, ...payload.response.data, loading: false};
    
    case REQUEST_LOADING:
      return {...state, loading: true};

    case REQUEST_ERROR:
    default:
      return {...state, loading: false};
  }
}