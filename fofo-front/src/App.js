import registerStore, { getState } from './store';
import { registerI18n } from './shared/i18n';
import app from './store/app';
import user from './store/app/user';
import visites from './store/app/user/visites';
import { getToken } from './store/api';
import * as ipc from './shared/ipc';
import { importDefaults } from './utils/Context';

const AppData = {
  name: 'parallel-app',
  i18n: null,
  store: null,
};

export function bootstrap() {
  if(AppData.store || AppData.i18n) {
    return AppData;
  }

  const params = new URLSearchParams(window.location.search)
  const extid = params.get('extid');
  ipc.withExtension(extid);

  const translations = importDefaults(require.context('../translations', false, /\.js$/));
  AppData.i18n = registerI18n(translations);

  AppData.store = registerStore();

  loadCurrentAddress();
  loadUser();

  return AppData;
}

export default AppData;

function loadCurrentAddress() {
  // const domain = window.location.hostname;
  // const uri = window.location.pathname;

  AppData.store.dispatch(app.actions.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron')); 
}

async function loadUser() {
  if(getToken()) {
    await AppData.store.dispatch(user.actions.fetch()); 
    if(!getState('app.user.isLogged')) {
      AppData.store.dispatch(visites.actions.fetchByIp());   
    }
  } else {
    AppData.store.dispatch(visites.actions.fetchByIp()); 
  }
}