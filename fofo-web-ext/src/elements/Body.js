export default {
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