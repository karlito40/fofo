import 'babel-polyfill';
import PanelScene from './scenes/PanelScene';
import main from './utils/main';
import serviceIPC, * as ipc from '../shared/ipc';
import * as commands from './commands';

main(() => {
  ipc.listen({commands});

  // ipc.send('setBadge', '#')
  serviceIPC.background.setBadge('#');

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  panelScene.select('bottom');
});
