import 'babel-polyfill';
import PanelScene from './scenes/PanelScene';
import main from './utils/main';
import serviceIPC, * as ipc from '../shared/ipc';
import * as commands from './commands';
import * as StorageSync from '../shared/storage-sync';
import config from './config';

main(async () => {
  ipc.listen({commands});

  serviceIPC.background.setBadge('#');

  const panel = (await StorageSync.get()).panel;
  
  const panelScene = new PanelScene();
  panelScene.select(
    (typeof panel !== 'undefined') ? panel : config.defaultPanel
  );

  StorageSync.events.on('sync', storage => {
    panelScene.select(storage.panel);
  });
});
