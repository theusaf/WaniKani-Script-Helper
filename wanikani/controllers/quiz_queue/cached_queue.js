export default class CachedQueue {
  #map;
  #key;
  constructor(key) {
    (this.#map = new Map(JSON.parse(sessionStorage.getItem(key) || "[]"))),
      (this.#key = key);
  }
  set = (e, t) => this.executeAndCache(() => this.#map.set(e, t));
  delete = (e) => this.executeAndCache(() => this.#map.delete(e));
  get size() {
    return this.#map.size;
  }
  toJSON = () => this.items;
  get items() {
    return Array.from(this.#map);
  }
  get hashes() {
    return this.items.map(([key, val]) => Object.assign({ id: key }, val));
  }
  reset = () => {
    this.executeAndCache(() => this.#map.clear());
  };
  executeAndCache = (callback) => {
    const data = callback();
    return sessionStorage.setItem(this.#key, JSON.stringify(this)), data;
  };
}
