const itemsWithMeaningsOnly = ["Radical", "KanaVocabulary"],
  newStat = (t) => ({
    meaning: { incorrect: 0, complete: !1 },
    reading: { incorrect: 0, complete: itemsWithMeaningsOnly.includes(t.type) },
  });
export default class CachedStats {
  #map;
  constructor() {
    this.#map = new Map();
  }
  delete = (t) => this.#map.delete(t.id);
  get = (t) => this.#map.get(t.id) || newStat(t);
  set = (t, a) => this.#map.set(t.id, a);
  toJSON = () => Array.from(this.#map);
}
