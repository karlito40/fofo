import {store} from './store';
import { actions as app } from './store/app';

window.setAddress = (domain, uri) => {
  store.dispatch(app.setAddress({
    domain,
    uri
  }));
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