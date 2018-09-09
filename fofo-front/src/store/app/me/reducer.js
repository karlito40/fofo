import { setToken } from '../../api';

import { REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../constants';

export default {
  _state: {},
  self: {
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
  }
};

