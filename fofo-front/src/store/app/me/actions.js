import apiCall, { getToken } from '../../api';

export function fetch() {
  return apiCall('GET', '/me');
}

export function login(email, password) {
  return apiCall('POST', '/login', {
    email,
    password
  });
}

export function restore() {
  if(!getToken()) {
    return false;
  }

  return fetch();
}