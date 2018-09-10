import { ActionAPI } from '../../api';

export function fetch(domain) {
  return (new ActionAPI('GET', `/feed/site`, {
    query: { address: domain }
  }))
    .with({domain})
    .export();

}
