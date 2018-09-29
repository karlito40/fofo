import { setToken, REQUEST_COMPLETE, REQUEST_ERROR, REQUEST_LOADING } from '../../api';
import { response } from '../../../lib/store-component';
import visites from './visites';

export default {
  _dependencies: { visites },
  _state: {
    loading: false,
    isLogged: false,
  },
  self: {
    fetch(state, payload) {
      return response({
        [REQUEST_COMPLETE]: () => ({...payload.response.data, loading: false, isLogged: true}),
        [REQUEST_LOADING]:  () => ({loading: true}),
        default:            () => ({loading: false})
      });
    }
  },
  'form.auth': {
    login: handleLogin,
    register: handleLogin,
  }
};

function handleLogin(state, payload) {
  if(payload.status === REQUEST_COMPLETE) {
    setToken(payload.response.data.access_token);

    const { user } = payload.response.data;
    return {...state, ...user, loading: false, isLogged: true};
  }

  return null;
}