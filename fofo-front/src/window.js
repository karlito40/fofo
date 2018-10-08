import { isDev } from './shared/config';
import { store, getStore, getState, dispatch } from './store';
import { actions as app } from './store/app';
import { actions as pageActions } from './store/feed/page';
import { actions as flashActions } from './store/flash';

if(isDev()) {

  window.addFlash = (text, type, timeout) => {
    store.dispatch(flashActions.add(text, type, timeout));
  }

  window.shiftFlash = () => {
    store.dispatch(flashActions.shift());
  }

  window.setAddress = (domain, uri) => {
    store.dispatch(app.setAddress(domain, uri));
  }

  window.refresh = () => {
    dispatch(pageActions.refresh(getState('app.href')))
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

  window.toGoogle = () => {
    store.dispatch(app.setAddress('google.com', '/_channel:#general'));
  }

  window.toMacron = () => {
    store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron'));
  };
  // https://fr.wikipedia.org/wiki/Jean-Luc_M%C3%A9lenchon
  window.toMelenchon = () => {
    store.dispatch(app.setAddress('fr.wikipedia.org', '/wiki/Jean-Luc_M%C3%A9lenchon'));
  };

}