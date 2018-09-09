import {store} from './store';
import { actions as app } from './store/app';

window.setAddress = (domain, uri) => {
  store.dispatch(app.setAddress({
    domain,
    uri
  }));
}
window.toPath1 = () => {
  store.dispatch(app.setAddress({
    domain: 'gmail.com',
    uri: '/path1.html'
  }));
};

window.toPath2 = () => {
  store.dispatch(app.setAddress({
    domain: 'gmail.com',
    uri: '/path2.html'
  }));
};