import apiCall, { getToken, ActionAPI } from '../../../api';

export function fetchByIp() {
  return apiCall('GET', '/visitor/visites');
}

export function add(address, onlySetActive) {
  return (new ActionAPI('POST', `/visite`, { address: address.domain }))
      .with({ domain: address.domain, onlySetActive })
      .export();
}