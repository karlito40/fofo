// import api from '../../api';
import action, { ActionAPI } from '../../api';

export function fetch(href) {
  return (new ActionAPI('GET', `/feed/page/${href}`))
    .with({href})
    .export();

}
