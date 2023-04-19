class VisualViewportShim {
  addEventListener(e, t, i) {
    "resize" === e && window.addEventListener(e, t, i);
  }
  removeEventListener(e, t, i) {
    "resize" === e && window.addEventListener(e, t, i);
  }
  get offsetTop() {
    return 0;
  }
  get offsetLeft() {
    return 0;
  }
  get pageTop() {
    return 0;
  }
  get pageLeft() {
    return 0;
  }
  get width() {
    return window.innerWidth;
  }
  get height() {
    return window.innerHeight;
  }
  get scale() {
    return 1;
  }
}
window.visualViewport = window.visualViewport || new VisualViewportShim();
