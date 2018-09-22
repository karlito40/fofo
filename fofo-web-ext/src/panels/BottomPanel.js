import BasePanel from './BasePanel';
import { setStyles, getFixedNode } from '../utils/dom';

export default class BottomPanel extends BasePanel {
  restrict() {
    return { height: this.minSize };
  }

  getBaseStyle() {
    return {
      width: '100%',
      top: 'auto',
      border: 'O',
      borderTop: 'rgba(0, 0, 0, 0.04)',
    }
  }

  render() {
    this.scene.view.style.height  = `${this.currentSize}px`;
    this.scene.root.style.paddingBottom = `${this.currentSize}px`;

    if(!this.resizing) {
      this.moveFixedNode(); 
    }
  }

  clear() {
    this.scene.root.style.paddingBottom = '0';
    this.moveFixedNode(0);
  }

  moveFixedNode(forceSize) {
    const size = (typeof forceSize === 'undefined') ? this.currentSize : forceSize;
    const nodes = getFixedNode((node, style) => node !== this.scene.view);
  
    nodes.forEach(node => {
      if(!node.getAttribute('data-ori-y')) {
        const style = window.getComputedStyle(node);
        node.setAttribute('data-ori-y', parseInt(style.bottom, 10) || 0);
      }

      const oriY = parseInt(node.getAttribute('data-ori-y'), 10);
      node.style.bottom = `${oriY + size}px`; 
    });
  }

  getRectTarget(rect) {
    return rect.height;
  }
}