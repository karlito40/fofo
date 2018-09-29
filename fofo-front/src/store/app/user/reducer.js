import { setToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { ucfirst } from '../../../lib/String';
import Visites from './visites';

const dependencies = {
  visites: Visites,
};
export default {
  _dependencies: dependencies,
  _state: {
    loading: false,
    isLogged: false,
  },
  self: {
    fetch(state, payload) {
      switch(payload.status) {
        case REQUEST_COMPLETE:
          return {...state, ...payload.response.data, loading: false, isLogged: true};

        case REQUEST_LOADING:
          return {...state, loading: true};
    
        case REQUEST_ERROR:
        default:
          return {...state, loading: false};

      }
    }
  },
  'form.auth': {
    login: handleLogin,
    register: handleLogin,
  }
};

function handleLogin(state, payload) {
  switch(payload.status) {
    case REQUEST_COMPLETE:
      const { user } = payload.response.data;

      setToken(payload.response.data.access_token);

      return {...state, ...user, loading: false, isLogged: true};
    
    case REQUEST_ERROR:
    default:
      return state;
  }
}