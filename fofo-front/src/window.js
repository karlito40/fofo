import {store, getState, dispatch} from './store';
import { actions as app } from './store/app';
import { actions as pageActions } from './store/feed/page';

window.setAddress = (domain, uri) => {
  store.dispatch(app.setAddress({
    domain,
    uri
  }));
}

window.toDefault = () => {
  store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron')); 
}

window.toAllocine = () => {
  store.dispatch(app.setAddress('allocine.fr', '/'));
}

window.toAllocineFilm = () => {
  store.dispatch(app.setAddress('allocine.fr', '/film'));
}

window.toMacron = () => {
  store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron'));
};
// https://fr.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon
window.toMelenchon = () => {
  store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Jean-Luc_M%C3%A9lenchon'));
};

window.next = () => {
  dispatch(pageActions.next(getState().app.href, 0));
}