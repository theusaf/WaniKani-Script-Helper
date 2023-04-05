export default class CachedQueue {
  constructor(key) {
    (this.data = new Map(JSON.parse(sessionStorage.getItem(key) || "[]"))),
      (this.cacheKey = key);
  }
  set(e, t) {
    this.executeAndCache(() => this.data.set(e, t));
  }
  delete(e) {
    this.executeAndCache(() => this.data.delete(e));
  }
  get size() {
    return this.data.size;
  }
  toJSON() {
    return this.items;
  }
  get items() {
    return Array.from(this.data);
  }
  get hashes() {
    return this.items.map(([e, t]) => Object.assign({ id: e }, t));
  }
  reset() {
    this.executeAndCache(() => this.data.clear());
  }
  executeAndCache(callback) {
    const data = callback();
    return sessionStorage.setItem(this.cacheKey, JSON.stringify(this)), data;
  }
}
