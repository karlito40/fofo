import PanelScene from './scenes/PanelScene';
import main from './utils/main';

main(() => {
  const action = {
    cmd: 'setBadge',
    args: ['#'],
  };

  chrome.runtime.sendMessage(action, function(response) {
    console.log('content script', response);
  });

  const panelScene = new PanelScene({onload: () => {
    console.log('app.loaded');
  }});
  
  panelScene.select('bottom');
});
