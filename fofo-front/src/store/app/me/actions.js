import api from '../../api';

export function fetch() {
  return api.action('GET', '/me');
}

export function login(email, password) {
  return api.action('POST', '/login', {
    email,
    password
  });
}