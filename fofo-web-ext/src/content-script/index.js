import PanelScene from './scenes/PanelScene';
import main from './utils/main';
import ServiceIPC, * as IPC from '../shared/ipc';
import * as commands from './commands';

main(() => {
  IPC.listen({commands});

  // ipc.send('setBadge', '#')
  ServiceIPC.background.setBadge('#');

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  panelScene.select('bottom');
});
