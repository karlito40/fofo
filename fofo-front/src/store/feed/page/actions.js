import api from '../../api';

export function fetch(href) {
  return api.action('GET', `/feed/page/${href}`);
}
