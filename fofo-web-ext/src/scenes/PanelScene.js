import interact from 'interactjs';
import { createElement, setStyles } from '../utils/dom';
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

  resizeStart() {
    this.appView.style.pointerEvents = 'none';
    this.getPanelSelected().resizing = true;
  }

  resizeEnd() {
    this.appView.style.pointerEvents = 'auto';
    this.getPanelSelected().resizing = false;
    this.render();
  }

  resize(rect) {
    this.getPanelSelected().setSize(rect);
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
      src: chrome.runtime.getURL('/public/frame.csp.html?extid=' + chrome.runtime.id)
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
    this.ensureCreate();
    
    if(this.previous) {
      this.getPanel(this.previous).clear();
    }
    
    this.getPanelSelected().render();
  }

  ensureCreate() {
    if(!this.view) {
      this.create();
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
        restrictSize: this.getPanelSelected().restrict(),
      })
      .on('resizestart', this.resizeStart.bind(this))
      .on('resizeend', this.resizeEnd.bind(this))
      .on('resizemove', (e) => {
        this.resize(e.rect);
      });
  }

  togglePanel() {
    const type = (!this.selected || this.selected == 'bottom') ? 'sidebar' : 'bottom';
    this.setSelected(type);
  }

  getPanel(panel) {
    return this.panels.get(panel);
  }

  getPanelSelected() {
    return this.getPanel(this.selected);
  }

  setSelected(panel) {
    if(this.selected) {
      this.previous = this.selected;
    }

    this.selected = panel;
    this.render();
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