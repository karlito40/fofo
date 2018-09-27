export default class BasePanel {
  constructor(scene, minSize) {
    ensureAbstractMethods(this, [
      'restrict', 
      'clear',
      'render',
      'getRectTarget',
    ]);

    this.scene = scene;
    this.resizing = false;
    this.minSize = minSize;
    this.currentSize = minSize;
    this.restrictSize = this.restrict();
  }

  setSize(rect) {
    this.currentSize = parseInt(this.getRectTarget(rect), 10);
    this.render();
  }
}

function ensureAbstractMethods(scope, abstractMethods) {
  for(let method of abstractMethods) {
    if(!scope[method]) {
      throw new Error(`${method} must be override`);
    }
  }
}