import action, { ActionAPI } from '../../api';

export function fetch(href) {
  return (new ActionAPI('GET', `/feed/page`, {
      query: { address: href }
    }))
    .with({href})
    .export();
}

export function sendMessage(href, message) {
  return (new ActionAPI('POST', '/comment', { 
      content: message,
      address: href
    }))
      .with({ href, message })
      .export();
}