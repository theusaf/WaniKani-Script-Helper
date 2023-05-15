import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
import { toHiragana } from "wanakana";
const normalize = (a, n) =>
    "reading" === n ? toHiragana(a.trim()) : a.trim().toLowerCase(),
  extractMeanings = (a, n) => ((a && a[n]) || []).flatMap((a) => a.meanings),
  extractReadings = (a, n) => ((a && a[n]) || []).flatMap((a) => a.readings),
  normalizeArray = (a, n) => a.map((a) => normalize(a, n)),
  hasMatchingAnswers = (a, n, e) => -1 !== normalizeArray(a, n).indexOf(e),
  hasMatchingMeanings = (a, n, e) =>
    hasMatchingAnswers(extractMeanings(a, n), "meaning", e),
  hasMatchingReadings = (a, n, e) =>
    hasMatchingAnswers(extractReadings(a, n), "reading", e),
  messages = {
    Radical: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "kanji", n) &&
        "Oops, we want the radical meaning, not the kanji meaning.",
      reading: () => null,
    },
    Kanji: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "radicals", n)
          ? "Oops, we want the kanji meaning, not the radical meaning."
          : hasMatchingMeanings(a, "vocabulary", n) &&
            "Oops, we want the kanji meaning, not the vocabulary meaning.",
      reading: () => null,
    },
    Vocabulary: {
      meaning: (a, n) =>
        hasMatchingMeanings(a, "kanji", n) &&
        "Oops, we want the vocabulary meaning, not the kanji meaning.",
      reading: (a, n) =>
        hasMatchingReadings(a, "kanji", n) &&
        "Oops, we want the vocabulary reading, not the kanji reading.",
    },
  };
export class CheckRelatedMeaningsAndReadings extends Plugin {
  get shouldEvaluate() {
    return (
      this.hasPopulatedArray("radicals") ||
      this.hasPopulatedArray("kanji") ||
      this.hasPopulatedArray("vocabulary")
    );
  }
  evaluate() {
    const a = normalize(this.response, this.questionType),
      n = messages[this.item.type][this.questionType](this.item, a);
    return n
      ? {
          action: answerActionRetry,
          message: { type: answerException, text: n },
        }
      : null;
  }
  hasPopulatedArray(a) {
    return this.item[a] && this.item[a].length > 0;
  }
}
