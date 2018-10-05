import 'babel-polyfill';
import PanelScene from './scenes/PanelScene';
import main from './utils/main';
import * as commands from './commands';
import config from './config';
import serviceIPC, * as ipc from '../shared/ipc';
import * as StorageSync from '../shared/storage-sync';
import { createElement } from '../shared/dom';

main(async () => {
  ipc.listen({commands});

  serviceIPC.background.setBadge('#');

  const storage = await StorageSync.get();
  const { panel, onDemand } = storage;
  
  const panelScene = new PanelScene();
  
  if(!onDemand) {
    panelScene.select(
      (typeof panel !== 'undefined') ? panel : config.defaultPanel
    );
  }

  StorageSync.events.on('sync', storage => {
    console.log('select', storage.panel);
    panelScene.select(storage.panel);
  });

  ipc.events.on('show', async () => {
    const { panel } = await StorageSync.get();
    // We dont need to check for the panel status as we want to display something
    panelScene.select(panel || config.defaultPanel);
  })

});
