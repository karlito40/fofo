export function createElement(tag, attributes = {}, styles = {}) {
  const element = document.createElement(tag);
  setAttributes(element, attributes);
  setStyles(element, styles);
  return element;
}

export function setAttributes(element, attrs = {}) {
  for(const [prop, value] of Object.entries(attrs)) {
    element.setAttribute(prop, value);
  };
  return element;
}

export function setStyles(element, css = {}) {
  for(const [prop, value] of Object.entries(css)) {
    element.style[prop] = value;
  };
  return element;
}

export function getFixedNode(filter) {
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