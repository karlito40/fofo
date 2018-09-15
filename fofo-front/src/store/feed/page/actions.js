import action, { ActionAPI } from '../../api';

export function next(href, cursor) {
  return (new ActionAPI('GET', '/feed/page', {
      address: href, 
      cursor
    }))
    .with({href})
    .export();
}

export function refresh(href, cursor) {
  return (new ActionAPI('GET', '/feed/page', {
      address: href,
      cursor,
      prev: 'all',
    }))
    .with({href})
    .export();;
}