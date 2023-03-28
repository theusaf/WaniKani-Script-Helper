class KeyboardManager {
  #data1;
  #data2;
  #modalMode = !1;
  constructor() {
    (this.#data1 = {}),
      (this.#data2 = {}),
      window.addEventListener("keydown", this.#onKeyDown);
  }
  setModalMode = () => {
    (this.#modalMode = !0), (this.#data2 = {});
  };
  clearModalMode = () => {
    (this.#modalMode = !1), (this.#data2 = {});
  };
  registerHotKey = ({ key, callback }) => {
    const dataStorage = this.#modalMode ? this.#data2 : this.#data1;
    (dataStorage[key] = dataStorage[key] || []),
      dataStorage[key].push(callback);
  };
  deregisterHotKey = ({ key: e, callback: a }) => {
    this.#removeCallback({ map: this.#data2, key: e, callback: a }),
      this.#removeCallback({ map: this.#data1, key: e, callback: a });
  };
  handleHotKey = (event, key) => {
    (
      (Object.keys(this.#data2).length > 0 ? this.#data2 : this.#data1)[key] ||
      []
    ).forEach((callback) => {
      callback(event);
    });
  };
  #onKeyDown = (e) => {
    /^(input|textarea)$/i.test(e.target.tagName) ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      this.handleHotKey(e, e.key);
  };
  #removeCallback = ({ map: e, key: a, callback: t }) => {
    const o = e[a] || [],
      s = o.indexOf(t);
    s > -1 && o.splice(s, 1), 0 === o.length && delete e[a];
  };
}
window.keyboardManager = new KeyboardManager();
