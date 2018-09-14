import apiCall, { ActionAPI } from '../api';
import { actions as visites } from './user/visites';

export function setTheme(theme) {
  return { theme };
}

export function toggleTheme() {}

export function setAddress(domain, uri) {
  
  const address = { domain, uri };
  
  return async (dispatch, getState, extras, createPayload) => {
    dispatch(createPayload(address));
    dispatch(visites.add(address));
  }
}

