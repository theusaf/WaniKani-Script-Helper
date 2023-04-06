class KeyboardManager {
  constructor() {
    (this.hotKeys = {}),
      (this.modalKeys = {}),
      (this.modalMode = !1),
      (this.handleKeyPress = this.handleKeyPress.bind(this)),
      window.addEventListener("keydown", this.handleKeyPress);
  }
  setModalMode() {
    (this.modalMode = !0), (this.modalKeys = {});
  }
  clearModalMode() {
    (this.modalMode = !1), (this.modalKeys = {});
  }
  registerHotKey({ key: e, callback: t }) {
    const a = this.modalMode ? this.modalKeys : this.hotKeys;
    (a[e] = a[e] || []), a[e].push(t);
  }
  deregisterHotKey({ key: e, callback: t }) {
    this.removeHotKeyFromMap({ map: this.modalKeys, key: e, callback: t }),
      this.removeHotKeyFromMap({ map: this.hotKeys, key: e, callback: t });
  }
  handleHotKey(e, t) {
    (
      (Object.keys(this.modalKeys).length > 0 ? this.modalKeys : this.hotKeys)[
        t
      ] || []
    ).forEach((t) => {
      t(e);
    });
  }
  handleKeyPress(e) {
    /^(input|textarea)$/i.test(e.target.tagName) ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      this.handleHotKey(e, e.key);
  }
  removeHotKeyFromMap({ map: e, key: t, callback: a }) {
    const s = e[t] || [],
      o = s.indexOf(a);
    o > -1 && s.splice(o, 1), 0 === s.length && delete e[t];
  }
}
window.keyboardManager = new KeyboardManager();
