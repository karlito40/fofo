import PanelScene from './scenes/PanelScene';
import main from './utils/main';


main(() => {
  console.log('contentScript.js');

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  // panelScene.setSelected('sidebar');
  panelScene.setSelected('bottom');
});
