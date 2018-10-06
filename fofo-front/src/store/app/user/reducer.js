import { registerToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import visites from './visites';
import * as StorageAccess from '../../../shared/storage/access';
import { save } from '../../../shared/storage/background';

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
  },
  'api': {
    requestError(state, payload) {
      if(payload.fromType !== 'APP.USER.RESTORE') {
        return state;
      }

      if(payload.error && payload.error.response.data) {
        const { code } = payload.error.response.data.error;
        // Handle expiration token, bad token and no token
        if(code === 'UNAUTHENTICATED') {
          resetLogin();
        }

        return {...state, isLogged: false};
      }

      return state;
    }
  }
};

function handleLogin(state, payload) {
  switch(payload.status) {
    case REQUEST_COMPLETE:
      saveLogin(payload.response.data);

      const { user } = payload.response.data;
      return {...state, ...user, loading: false, isLogged: true};
    
    case REQUEST_ERROR:
    default:
      return state;
  }
}

function saveLogin({access_token, user} = {}) {
  registerToken(access_token);

  return StorageAccess.update({
    token: access_token,
    user,
  });
}

function resetLogin() {
  return saveLogin({access_token: null, user: null});
}