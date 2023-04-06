const itemsWithMeaningsOnly = ["Radical", "KanaVocabulary"],
  newStat = (t) => ({
    meaning: { incorrect: 0, complete: !1 },
    reading: { incorrect: 0, complete: itemsWithMeaningsOnly.includes(t.type) },
  });
export default class CachedStats {
  constructor() {
    this.data = new Map();
  }
  delete(t) {
    this.data.delete(t.id);
  }
  get(t) {
    return this.data.get(t.id) || newStat(t);
  }
  set(t, e) {
    this.data.set(t.id, e);
  }
  toJSON() {
    return Array.from(this.data);
  }
}
