export class Plugin {
  constructor({
    questionType: e,
    response: t,
    item: s,
    result: i,
    inputChars: r,
    userSynonyms: n,
  }) {
    (this.questionType = e),
      (this.response = t),
      (this.item = s),
      (this.result = i),
      (this.inputChars = r),
      (this.userSynonyms = n);
  }
  get shouldEvaluate() {
    return !1;
  }
  evaluate() {
    return null;
  }
  get readings() {
    switch (this.item.type) {
      case "Kanji":
        return this.item[this.item.primary_reading_type];
      case "Vocabulary":
        return this.item.readings.map((e) => e.reading);
      default:
        return [];
    }
  }
}
