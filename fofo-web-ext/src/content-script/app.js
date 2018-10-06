import config from './config';
import * as StorageAccess from '../shared/storage/access';
import PanelScene from './scenes/PanelScene';

const AppData = {
  scene: null
};

export async function bootstrap() {
  const storage = await StorageAccess.get();
  const { panel, onDemand } = storage;
  
  AppData.scene = new PanelScene();
  
  if(!onDemand) {
    AppData.scene.select(
      (typeof panel !== 'undefined') ? panel : config.defaultPanel
    );
  }

  StorageAccess.events.on('sync', storage => {
    AppData.scene.select(storage.panel);
    AppData.scene.propagateMessage('SYNC_STORAGE', storage);
  });

  return AppData;
}

export default AppData;