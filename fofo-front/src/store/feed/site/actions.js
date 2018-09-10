import { ActionAPI } from '../../api';

export function fetch(domain) {
  return (new ActionAPI('GET', `/feed/site/${domain}`))
    .with({domain})
    .export();

}
