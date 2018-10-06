import { registerToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import visites from './visites';
import * as StorageAccess from '../../../shared/storage/access';

export default {
  _dependencies: { visites },
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
      saveLogin(payload.response.data);

      const { user } = payload.response.data;
      return {...state, ...user, loading: false, isLogged: true};
    
    case REQUEST_ERROR:
      // We remove token and user from the storage
      saveLogin(payload.response.data);
      return state;

    default:
      return state;
  }
}

function saveLogin({access_token, user} = {}) {
  registerToken(access_token);

  StorageAccess.update({
    token: access_token,
    user,
  });
}