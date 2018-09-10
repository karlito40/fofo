import apiCall from '../../api';

export function fetch(domain) {
  return apiCall('GET', '/feed/world');

}
