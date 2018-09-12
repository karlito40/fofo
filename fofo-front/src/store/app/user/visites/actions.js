import apiCall, { getToken, ActionAPI } from '../../../api';

export function fetch() {
  return apiCall('GET', '/visitor/visites');
}


export function add(address) {
  return (new ActionAPI('POST', `/visite`, { address: address.domain }))
      .with({ domain: address.domain })
      .export();
}