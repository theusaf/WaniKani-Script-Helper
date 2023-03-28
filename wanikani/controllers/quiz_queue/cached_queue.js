export default class CachedQueue {
  #e;
  #t;
  constructor(e) {
    (this.#e = new Map(JSON.parse(sessionStorage.getItem(e) || "[]"))),
      (this.#t = e);
  }
  set = (e, t) => this.executeAndCache(() => this.#e.set(e, t));
  delete = (e) => this.executeAndCache(() => this.#e.delete(e));
  get size() {
    return this.#e.size;
  }
  toJSON = () => this.items;
  get items() {
    return Array.from(this.#e);
  }
  get hashes() {
    return this.items.map(([e, t]) => Object.assign({ id: e }, t));
  }
  reset = () => {
    this.executeAndCache(() => this.#e.clear());
  };
  executeAndCache = (e) => {
    const t = e();
    return sessionStorage.setItem(this.#t, JSON.stringify(this)), t;
  };
}
