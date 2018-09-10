import {store} from './store';
import { actions as app } from './store/app';

window.setAddress = (domain, uri) => {
  store.dispatch(app.setAddress({
    domain,
    uri
  }));
}

window.toAllocine = () => {
  store.dispatch(app.setAddress({
    domain: 'allocine.fr', 
    uri: '/'
  }));
}

window.toAllocineFilm = () => {
  store.dispatch(app.setAddress({
    domain: 'allocine.fr', 
    uri: '/film'
  }));
}

window.toMacron = () => {
  store.dispatch(app.setAddress({
    domain: 'fr.wikipedia.org', 
    uri: '/wiki/Emmanuel_Macron'
  }));
};
// https://fr.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon
window.toMelenchon = () => {
  store.dispatch(app.setAddress({
    domain: 'fr.wikipedia.org',
    uri: '/wiki/Jean-Luc_M%C3%A9lenchon'
  }));
};