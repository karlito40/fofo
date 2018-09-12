import apiCall, { getToken, ActionAPI } from '../../api';

export function fetch() {
  return apiCall('GET', '/me');
}

export function login(email, password) {
  return apiCall('POST', '/login', {
    email,
    password
  });
}

export function addVisite(address) {
  return (new ActionAPI('POST', `/visite`, { address: address.domain }))
      .with({ domain: address.domain })
      .export();
}