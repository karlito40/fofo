import registerStore, { getState } from './store';
import { registerI18n } from './shared/i18n';
import app from './store/app';
import user from './store/app/user';
import visites from './store/app/user/visites';
import { getToken } from './store/api';
import * as ipc from './shared/ipc';
import { importDefaults } from './shared/utils/Context';
import * as StorageAccess from './shared/storage/access';
import config from './shared/config';

const AppData = {
  name: 'parallel-app',
  i18n: null,
  store: null,
};

export function bootstrap() {
  if(AppData.store || AppData.i18n) {
    return AppData;
  }

  StorageAccess.setDefault({
    panel: config.defaultPanel,
    onDemand: config.defaultOnDemand,
  });

  const params = new URLSearchParams(window.location.search)
  const extid = params.get('extid');
  ipc.withExtension(extid);

  const translations = importDefaults(require.context('./shared/translations', false, /\.js$/));
  AppData.i18n = registerI18n(translations);

  AppData.store = registerStore();

  loadAddress();
  loadUser();
  loadPanel();

  StorageAccess.events.addListener('sync', (storage, oldStorage) => {
    dispatchPanelChange(storage.panel);
    
    if(!storage.token && oldStorage.token) {
      AppData.store.dispatch(user.actions.disconnect()); 
    }
    
  });

  return AppData;
}

export default AppData;

function loadAddress() {
  // const domain = window.location.hostname;
  // const uri = window.location.pathname;

  AppData.store.dispatch(app.actions.setAddress('fr.wikipedia.org', '/wiki/Emmanuel_Macron')); 
}

async function loadPanel() {
  const { panel } = await StorageAccess.get();
  dispatchPanelChange(panel);
}

async function loadUser() {
  if(getToken()) {
    await AppData.store.dispatch(user.actions.restore()); 
    if(!getState('app.user.isLogged')) {
      AppData.store.dispatch(visites.actions.fetchByIp());   
    }
  } else {
    AppData.store.dispatch(visites.actions.fetchByIp()); 
  }
}

function dispatchPanelChange(panel) {
  AppData.store.dispatch(app.actions.setPanel(panel)); 
}