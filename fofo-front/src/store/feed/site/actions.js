import { ActionAPI } from '../../api';

export function next(domain, size) {
  return (new ActionAPI('GET', `/feed/site`, {
      address: domain, 
      size
    }))
    .with({domain})
    .export();

}


export function refresh(domain, size) {
  return next(domain, size);
}
