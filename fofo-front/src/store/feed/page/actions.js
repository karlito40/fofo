import action, { ActionAPI } from '../../api';

export function fetch(href) {
  return (new ActionAPI('GET', '/feed/page', {address: href }))
    .with({href})
    .export();
}

export function next(href, cursor) {
  return (new ActionAPI('GET', '/feed/page', {
      address: href, 
      cursor
    }))
    .with({href})
    .export();
}


export function sendMessage(href, message) {
  return (new ActionAPI('POST', '/comment', { 
      content: message,
      address: href
    }))
      .with({ href, content: message })
      .export();
}

export function refresh() {

}