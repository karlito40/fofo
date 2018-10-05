import interact from 'interactjs';
import { createElement, setStyles } from '../../shared/dom';
import Body from '../elements/Body';
import SidebarPanel from '../panels/SidebarPanel';
import BottomPanel from '../panels/BottomPanel';

const APP_NAME = 'parallel-app';
const MIN_SIDEBAR_WIDTH = 450;
const MIN_BOTTOM_HEIGHT = 250;

export default class PanelScene {
  constructor(params = {}) {
    this.root = document.documentElement;
    this.body = Body;

    this.view = null;
    this.appView = null;
    this.previousPanel = null;
    this.selectedPanel = null,
    this.onload = params.onload;

    this.panels = new Map();
    this.panels.set('sidebar', new SidebarPanel(this, MIN_SIDEBAR_WIDTH));
    this.panels.set('bottom', new BottomPanel(this, MIN_BOTTOM_HEIGHT));
  }

  create() {
    this.view = createElement('div', {
      id: `root-${APP_NAME}`,
    }, {
      border: '0',
      position: 'fixed',
      bottom: '0',
      left: '0',
      zIndex: '9999999',
      backgroundColor: '#fbfbfb'
    });

    this.appView = createElement('iframe', {
      id: APP_NAME,
      src: chrome.runtime.getURL('/public/frame.csp.html?extid=' + chrome.runtime.id + '&theme=' + this.selectedPanel.theme)
    }, {
      width: '100%',
      height: '100%',
      border: '0',
    });
    this.appView.onload = this.onload;
    
    this.edges = createEdges();
    Object.values(this.edges).forEach((edge) => {
      this.view.append(edge);
    });

    this.view.append(this.appView);
    this.root.append(this.view);

    this.createResizable();

    window.addEventListener('load', (event) => {
      this.render();
    });
  }

  render() {
    if(!this.view) {
      this.create();
    }
    
    if(this.previousPanel) {
      this.previousPanel.clear();
    }
    
    this.selectedPanel.render();
  }

  select(panelIndex) {
    const targetedPanel = this.getPanel(panelIndex);
    if(targetedPanel === this.selectedPanel) {
      return;
    }

    if(this.selectedPanel) {
      this.previousPanel = this.selectedPanel;
    }

    this.selectedPanel = targetedPanel;
    if(this.selectedPanel) {
      this.render();
    } else {
      this.clear();
    }

    this.sendTheme();
  }

  clear() {
    if(this.previousPanel) {
      this.previousPanel.clear();
    }

    if(this.view) {
      this.view.parentElement.removeChild(this.view);
      this.view = null;
    }
  }

  sendTheme() {
    if(this.appView && this.selectedPanel) {
      const action = {
        source: APP_NAME,
        type: 'SET_THEME',
        data: {
          theme: this.selectedPanel.theme
        }
      };

      this.appView.contentWindow.postMessage(JSON.stringify(action), '*');
    }
  }

  createResizable() {
    interact(`#${this.view.id}`)
      .resizable({
        edges: this.edges,
        restrictEdges: {
          outer: 'parent',
          endOnly: true,
        },
        restrictSize: this.selectedPanel.restrict(),
      })
      .on('resizestart', this.resizeStart.bind(this))
      .on('resizeend', this.resizeEnd.bind(this))
      .on('resizemove', (e) => {
        this.resize(e.rect);
      });
  }

  resizeStart() {
    this.appView.style.pointerEvents = 'none';
    this.selectedPanel.resizing = true;
  }

  resizeEnd() {
    this.appView.style.pointerEvents = 'auto';
    this.selectedPanel.resizing = false;
    this.render();
  }

  resize(rect) {
    this.selectedPanel.setSize(rect);
  }

  getPanel(panelIndex) {
    return this.panels.get(panelIndex);
  }

}


function createEdges() {
  const baseStyle = {
    backgroundColor: 'transparent',
    position: 'absolute',
  };

  const templates = {
    right: {
      width: '3px',
      height: '100%',
      top: '0',
      right: '0',
    },
    top: {
      height: '4px',
      width: '100%',
      top: '0',
      left: '0',
    }
  };

  let isDragging = false;

  const edges = {};
  for (let [dir, style] of Object.entries(templates)){
    edges[dir] = createElement('div', {
      className: `edge-${dir}`,
    }, {...style, ...baseStyle});  

    edges[dir].addEventListener('mouseover', () => {
      if(!isDragging) {
        edges[dir].style.backgroundColor = 'yellow';
        edges[dir].dataset.hovering = 'hovering';
      } 
    }, false);

    edges[dir].addEventListener('mousedown', () => {
      isDragging = true;
      window.addEventListener('mouseup', function listener(event) {
        isDragging = false;
        window.removeEventListener('mouseup', listener);
        edges[dir].dispatchEvent(new MouseEvent('mouseout'));
      });
    });
    
    edges[dir].addEventListener('mouseout', () => {
      if(!isDragging) {
        edges[dir].style.backgroundColor = 'transparent';
      }
      
    }, false);
  }

  return edges;
}