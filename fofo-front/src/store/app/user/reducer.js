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
      return FetchHandler.with(state, payload);
    },
  },
  'form.auth': {
    login(state, payload) {
      return handleLogin(state, payload);      
    },
    register(state, payload) {
      return handleLogin(state, payload);
    },
  }
};


const FetchHandler = {
  with(state, payload, relation) {
    const target = relation || '';
    
    const handler = this[`exec${ucfirst(target)}`];
    const res = handler ? handler(state, payload) : {};

    const loadingRelation = `loading${ucfirst(target)}`;
    return {
      ...res, 
      [loadingRelation]: (payload.status === REQUEST_LOADING)
    };

  },
  exec(state, payload) {
    switch(payload.status) {
      case REQUEST_COMPLETE:
        return {...state, ...payload.response.data, loading: false, isLogged: true};

      case REQUEST_LOADING:
        return {...state, loading: true};
  
      case REQUEST_ERROR:
      default:
        return {...state, loading: false};
    }
  },
}

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