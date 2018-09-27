import BasePanel from './BasePanel';
import { setStyles, getFixedNode } from '../utils/dom';

export default class SidebarPanel extends BasePanel {
  restrict() {
    return { width: this.minSize };
  }

  getBaseStyle() {
    return {
      width: `${this.currentSize}px`,
      top: '0',
      height: 'auto',
      border: 'O',
      borderRight: '1px solid rgba(0, 0, 0, 0.04)',
    }
  }

  render() {
    setStyles(this.scene.view, this.getBaseStyle());

    this.scene.body.setPosition('relative');
    this.scene.root.style.marginLeft = `${this.currentSize}px`;

    if(!this.resizing) {
      this.moveFixedNode();
    }
  }

  clear() {
    this.scene.root.style.marginLeft = '0';

    this.moveFixedNode(0);
    this.scene.body.restorePosition();
  }

  moveFixedNode(forceSize) {
    const size = (typeof forceSize === 'undefined') ? this.currentSize : forceSize;
    const nodes = getFixedNode((node, style) => node !== this.scene.view);
  
    nodes.forEach(node => {
      if(!node.getAttribute('data-ori-x')) {
        const style = window.getComputedStyle(node);
        node.setAttribute('data-ori-x', parseInt(style.left, 10) || 0);
      }

      const oriX = parseInt(node.getAttribute('data-ori-x'), 10);
      node.style.left = `${oriX + size}px`;
    });
  }

  getRectTarget(rect) {
    return rect.width;
  }
}