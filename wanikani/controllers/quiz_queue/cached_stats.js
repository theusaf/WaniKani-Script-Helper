const itemsWithMeaningsOnly = ["Radical", "KanaVocabulary"],
  newStat = (t) => ({
    meaning: { incorrect: 0, complete: !1 },
    reading: { incorrect: 0, complete: itemsWithMeaningsOnly.includes(t.type) },
  });
export default class CachedStats {
  #t;
  constructor() {
    this.#t = new Map();
  }
  delete = (t) => this.#t.delete(t.id);
  get = (t) => this.#t.get(t.id) || newStat(t);
  set = (t, a) => this.#t.set(t.id, a);
  toJSON = () => Array.from(this.#t);
}
