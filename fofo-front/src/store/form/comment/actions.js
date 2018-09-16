import { ActionAPI } from '../../api';

export function send(href, content, user) {
  return (new ActionAPI('POST', '/comment', { 
      content,
      address: href
    }))
    .with({ href, content, user })
    .export();
}

export function active(active) {
  return { active };
}
