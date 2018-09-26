import { ActionAPI } from '../../api';

function request(type, id, bool) {
  return (new ActionAPI('POST', `/like/${type}/${id}`, { 
    like: bool
  }))
  .with({ id, like: bool })
  .export();
}
// TODO: handle server response
export function setComment(commentId, bool) {
  return request('comment', commentId, bool);
}

export function setHighlight(highlightId, bool) {
  return request('highlight', highlightId, bool);
}