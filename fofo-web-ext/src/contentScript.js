
// import ipc from '../../shared/ipc';

console.log('---> content script');
const appName = 'ext-parallel';

function onAppLoad() {
  console.log('onAppLoad');
  const action = {
    type: 'INIT',
    data: {
      extid: chrome.runtime.id
    }
  };

  appIsolation.contentWindow.postMessage(JSON.stringify(action), '*');
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('contentscript message received', msg);
  // if (msg.from === 'event' && msg.method == 'ping') {
  //   sendResponse({ data: 'pong' });
  // }
});

let appIsolation;
(() => {
  if (window != top){ 
    return;
  }
  /* TO THE LEFT */

  const panelWidth = 300;

  document.body.style.transition = '0.38s margin-left ease-out';
  document.body.style.marginLeft = `${panelWidth}px`;

  appIsolation = createElement("iframe", {
    src: chrome.runtime.getURL("/public/frame.csp.html")
  }, {
    width: `${panelWidth}px`,
    height: "100%",
    border: "0",
    position: "fixed",
    top: "0",
    left: `-${panelWidth}px`,
    zIndex: "9999999",
    backgroundColor: "red"
  });
  appIsolation.onload = onAppLoad;

  document.body.append(appIsolation);
  appIsolation.animate([
    // keyframes
    { transform: 'translateX(0px)' },
    { transform: `translateX(${panelWidth}px)` }
  ], {
    duration: 380,
    easing: "ease-out",
    fill: "forwards"
  });

})();

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


  // const panelWidth = 300;

  // // Test minimal size
  // const oriWidth = document.body.scrollWidth;
  // document.body.style.marginRight = `${panelWidth}px`;
  // let newWidth = document.body.scrollWidth;
  // const diffWidth = oriWidth - newWidth;
  // // Minimal size reached
  // if(diffWidth != panelWidth) {
  //   console.log('min size reached');
  //   newWidth = newWidth + panelWidth;
  //   document.body.style.width = `${newWidth}px`;
  // }

  // const appIsolation = document.createElement("iframe");
  // appIsolation.id = findAvailableId();
  // appIsolation.src = chrome.runtime.getURL("/index.html"); // eslint-disable-line
  // appIsolation.style.width = `${panelWidth}px`;
  // appIsolation.style.height = "100%";
  // appIsolation.style.border = "none";
  // appIsolation.style.position = "fixed";
  // appIsolation.style.top = "0";
  // appIsolation.style.right = "0";
  // appIsolation.style.zIndex = "9999999";
  // appIsolation.style.backgroundColor = "red";

   // const panelWidth = 300;

  // // Test minimal size
  // const oriWidth = document.body.scrollWidth;
  // document.body.style.marginRight = `${panelWidth}px`;
  // let newWidth = document.body.scrollWidth;
  // const diffWidth = oriWidth - newWidth;
  // // Minimal size reached
  // if(diffWidth != panelWidth) {
  //   console.log('min size reached');
  //   newWidth = newWidth + panelWidth;
  //   document.body.style.width = `${newWidth}px`;
  // }

  /* TO BOTTOM */
  // const panelHeight = 300;
  // const oriPaddingBottom = parseInt(window.getComputedStyle(document.body).paddingBottom, 10);
  // document.body.style.paddingBottom = `${panelHeight + oriPaddingBottom}px`;

  // const appIsolation = document.createElement("iframe");
  // appIsolation.id = findAvailableId();
  // appIsolation.src = chrome.runtime.getURL("/index.html"); // eslint-disable-line
  // appIsolation.style.width = `100%`;
  // appIsolation.style.height = `${panelHeight}px`;
  // appIsolation.style.border = "none";
  // appIsolation.style.position = "fixed";
  // appIsolation.style.bottom = "0";
  // appIsolation.style.left = "0";
  // appIsolation.style.zIndex = "9999999";
  // appIsolation.style.backgroundColor = "red";
