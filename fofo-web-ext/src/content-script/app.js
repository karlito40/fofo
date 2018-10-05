import config from './config';
import * as StorageSync from '../shared/storage-sync';
import PanelScene from './scenes/PanelScene';

const AppData = {
  scene: null
};

export async function bootstrap() {
  const storage = await StorageSync.get();
  const { panel, onDemand } = storage;
  
  AppData.scene = new PanelScene();
  
  if(!onDemand) {
    AppData.scene.select(
      (typeof panel !== 'undefined') ? panel : config.defaultPanel
    );
  }

  StorageSync.events.on('sync', storage => {
    AppData.scene.select(storage.panel);
  });

  return AppData;
}

export default AppData;