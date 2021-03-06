import apiCall, { ActionAPI } from '../../api';

export function restore() {
  return apiCall('GET', '/me');
}

export function disconnect() {}

// export function login(email, password) {
//   return apiCall('POST', '/login', {
//     email,
//     password
//   });
// }

export function addVisite(address) {
  return (new ActionAPI('POST', `/visite`, { address: address.domain }))
      .with({ domain: address.domain })
      .export();
}