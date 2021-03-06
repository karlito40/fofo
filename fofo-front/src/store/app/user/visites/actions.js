import apiCall, { ActionAPI } from '../../../api';

export function fetchByIp() {
  return apiCall('GET', '/visitor/visites');
}

export function add(address, onlySetActive) {
  return (new ActionAPI('PATCH', `/visite`, { address: address.domain + address.uri }))
      .with({ address, onlySetActive })
      .export();
}