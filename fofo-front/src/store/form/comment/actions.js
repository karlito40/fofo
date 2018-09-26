import { ActionAPI } from '../../api';

export function create(href, content, user) {
  return (new ActionAPI('POST', '/comment', { 
      content,
      address: href
    }))
    .with({ href, content, user })
    .export();
}

// Action permettant de renseigner si le formulaire
// d'envoie est actif ou pas
export function activeCreation(active) {
  return { active };
}

export function update(commentId, body) {
  return (new ActionAPI('PUT', `/comment/${commentId}`, body))
    .with({id: commentId, ...body})
    .export();
}