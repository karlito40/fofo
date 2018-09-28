import PanelScene from './scenes/PanelScene';
import main from './utils/main';
import * as ipc from '../shared/ipc';
import * as commands from './commands';

main(() => {
  ipc.listen({commands});

  ipc.send('setBadge', '#')

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  panelScene.select('bottom');
});
