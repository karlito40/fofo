const abstractMethods = [
  'restrict', 
  'getBaseStyle', 
  'clear',
  'render',
  'getRectTarget',
];

export default class BasePanel {
  constructor(scene, minSize) {
    this.scene = scene;
    this.resizing = false;
    this.minSize = minSize;
    this.currentSize = minSize;
    this.restrictSize = this.restrict();

    this.ensureAbstractMethods();
  }

  ensureAbstractMethods() {
    for(let method of abstractMethods) {
      if(!this[method]) {
        throw new Error(`BasePanel::${method} must be override`);
      }
    }
  }

  setSize(rect) {
    this.currentSize = parseInt(this.getRectTarget(rect), 10);
    this.render();
  }

}