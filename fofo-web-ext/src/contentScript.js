import PanelScene from './scenes/PanelScene';
import main from './utils/main';


main(() => {
  console.log('contentScript.js');

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  // panelScene.select('sidebar');
  panelScene.select('bottom');
});
