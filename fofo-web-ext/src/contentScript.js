
import interact from 'interactjs';

console.log('contentScript.js');

function onAppLoad() {
  console.log('onAppLoad');
  const action = {
    type: 'INIT',
    data: {
      extid: chrome.runtime.id
    }
  };

  panels.appView.contentWindow.postMessage(JSON.stringify(action), '*');
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('contentscript message received', msg);
  // if (msg.from === 'event' && msg.method == 'ping') {
  //   sendResponse({ data: 'pong' });
  // }
});

const APP_NAME = 'ext-parallel';
// const PANEL_DEFAULT = 'bottom';
const PANEL_DEFAULT = 'sidebar';
const MIN_SIDEBAR_WIDTH = 300;
const MIN_BOTTOM_HEIGHT = 250;

const Body = {
  originalPosition: null,
  restorePosition() {
    if(this.originalPosition) {
      this.setPosition(this.originalPosition);
    }
  },
  setPosition(position) {
    this._keepPosition();
    if(document.body) {
      document.body.style.position = position;
    }
  },
  _keepPosition() {
    if(document.body && !this.originalPosition) {
      this.originalPosition = window.getComputedStyle(document.body).position;
    }
  },
};
const panels = {
  containerView: null,
  appView: null,
  previous: null,
  selected: null,
  onload: null,
  sidebar: {
    resizing: false,
    view: null,
    currentSize: MIN_SIDEBAR_WIDTH,
    restrictSize: {
      width: MIN_SIDEBAR_WIDTH
    },
    getBaseStyle() {
      return {
        width: `${this.currentSize}px`,
        top: '0',
        height: 'auto',
        boxShadow: '10px 0px 30px rgba(211, 215, 221, 0.4)',
      }
    },
    clear() {
      document.documentElement.style.marginLeft = '0';
      this.moveFixedNode(0);
      Body.restorePosition();
    },
   
    update() {
      Body.setPosition('relative');
      
      this.view.style.width  = `${this.currentSize}px`;
      document.documentElement.style.marginLeft = `${this.currentSize}px`;
      if(!this.resizing) {
        this.moveFixedNode();
      }
      
    },
    moveFixedNode(forceSize) {
      const size = (typeof forceSize === 'undefined') ? this.currentSize : forceSize;
      const nodes = getFixedNode((node, style) => node !== this.view);
    
      nodes.forEach(node => {
        if(!node.getAttribute('data-pll-x')) {
          const style = window.getComputedStyle(node);
          node.setAttribute('data-pll-x', parseInt(style.left, 10) || 0);
        }

        const oriX = parseInt(node.getAttribute('data-pll-x'), 10);
        node.style.left = `${oriX + size}px`;
      });
    },
    setSize(rect, optimizePerf) {
      this.currentSize = parseInt(rect.width, 10);
      this.update(optimizePerf);
    },
    setView(v) {
      this.view = v;
    }
  },
  bottom: {
    resizing: false,
    view: null,
    currentSize: MIN_BOTTOM_HEIGHT,
    restrictSize: {
      height: MIN_BOTTOM_HEIGHT
    },
    getBaseStyle() {
      return {
        width: '100%',
        top: 'auto',
        boxShadow: '0px -10px 30px rgba(211, 215, 221, 0.4)',
      };
    },
    clear() {
      document.documentElement.style.paddingBottom = '0';
      this.moveFixedNode(0);
    },
    update() {
      this.view.style.height  = `${this.currentSize}px`;

      document.documentElement.style.paddingBottom = `${this.currentSize}px`;

      if(!this.resizing) {
        this.moveFixedNode(); // opti debounce
      }
    },
    moveFixedNode(forceSize) {
      const size = (typeof forceSize === 'undefined') ? this.currentSize : forceSize;
      const nodes = getFixedNode((node, style) => node !== this.view);
    
      nodes.forEach(node => {
        if(!node.getAttribute('data-pll-y')) {
          const style = window.getComputedStyle(node);
          node.setAttribute('data-pll-y', parseInt(style.bottom, 10) || 0);
        }

        const oriY = parseInt(node.getAttribute('data-pll-y'), 10);
        node.style.bottom = `${oriY + size}px`; 
        // node.style.transform = `translateY(-${size}px)`;
      });
    },
    setSize(rect) {
      this.currentSize = parseInt(rect.height, 10);
      this.update();
    },
    setView(v) {
      this.view = v;
    }
  },
  ensureView() {
    if(!this.containerView) {
      this.create();
    }
  },
  resizeStart() {
    this.appView.style.pointerEvents = 'none';
    this.getSelected().resizing = true;
  },
  resizeEnd() {
    this.appView.style.pointerEvents = 'auto';
    this.getSelected().resizing = false;
    this.getSelected().update();
  },
  resize(rect) {
    this.getSelected().setSize(rect);
  },
  create() {
    this.containerView = createElement('div', {
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
      src: chrome.runtime.getURL('/public/frame.csp.html')
    }, {
      width: '100%',
      height: '100%',
      border: '0',
    });
    this.appView.onload = this.onload;
    
    this.containerView.append(this.appView);

    this.sidebar.setView(this.containerView);
    this.bottom.setView(this.containerView);
  },
  update() {
    this.ensureView();

    setStyles(this.containerView, this.getSelected().getBaseStyle());
    if(this.previous) {
      this.getPanel(this.previous).clear();
    }
    
    this.getSelected().update();
  },
  togglePanel() {
    const type = (!this.selected || this.selected == 'bottom') ? 'sidebar' : 'bottom';
    this.setSelected(type);
  },
  getPanel(panel) {
    return this[panel];
  },
  getSelected() {
    return this[this.selected];
  },
  setSelected(panel) {
    if(this.selected) {
      this.previous = this.selected;
    }

    this.selected = panel;
    this.update();
  }
};


(() => {
  if (window != top){ 
    return;
  }

  panels.onload = onAppLoad;
  panels.setSelected(PANEL_DEFAULT);

  const edges = createEdges();
  Object.values(edges).forEach((edge) => {
    panels.containerView.append(edge);
  });

  document.documentElement.append(panels.containerView);
  
  window.addEventListener("load", function(event) {
    console.log("All resources finished loading!");
    const button = createElement('button', {}, {
      position: 'fixed',
      left: '20px',
      top: '200px',
      zIndex: '10',
    });
    button.innerHTML = 'TOGGLE';
    button.addEventListener('click', panels.togglePanel.bind(panels));
    document.body.append(button);

    
    panels.getSelected().update();
    
  });

  interact(`#${panels.containerView.id}`)
    .resizable({
      edges: edges,

      restrictEdges: {
        outer: 'parent',
        endOnly: true,
      },

      restrictSize: panels.getSelected().restrictSize,
    })
    .on('resizestart', panels.resizeStart.bind(panels))
    .on('resizeend', panels.resizeEnd.bind(panels))
    .on('resizemove', (e) => {
      panels.resize(e.rect);
    });
})();

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

function getFixedNode(filter) {
  const cond = filter || (() => true); 
  const nodes = [...document.querySelectorAll('*')];
  const list = [];
  nodes.forEach(node => {
    const style = window.getComputedStyle(node);
    if(style.position === 'fixed' && cond(node, style)) {
      list.push(node);
    }
  });
  return list;
}

function createElement(tag, attributes = {}, styles = {}) {
  const element = document.createElement(tag);
  setAttributes(element, attributes);
  setStyles(element, styles);
  return element;
}

function setAttributes(element, attrs = {}) {
  for(const [prop, value] of Object.entries(attrs)) {
    element.setAttribute(prop, value);
  };
  return element;
}

function setStyles(element, css = {}) {
  for(const [prop, value] of Object.entries(css)) {
    element.style[prop] = value;
  };
  return element;
}

function findAvailableId(i = 0) {
  const id = `${appName}-${i}`;
  if(document.getElementById(id)) {
    return findAvailableId(++i);
  }
  return id;
}

  /* TO BOTTOM */
  // const panelHeight = 300;
  // const oriPaddingBottom = parseInt(window.getComputedStyle(document.body).paddingBottom, 10);
  // document.body.style.paddingBottom = `${panelHeight + oriPaddingBottom}px`;

  // const appIsolation = document.createElement('iframe');
  // appIsolation.id = findAvailableId();
  // appIsolation.src = chrome.runtime.getURL('/index.html'); // eslint-disable-line
  // appIsolation.style.width = `100%`;
  // appIsolation.style.height = `${panelHeight}px`;
  // appIsolation.style.border = 'none';
  // appIsolation.style.position = 'fixed';
  // appIsolation.style.bottom = '0';
  // appIsolation.style.left = '0';
  // appIsolation.style.zIndex = '9999999';
  // appIsolation.style.backgroundColor = 'red';
