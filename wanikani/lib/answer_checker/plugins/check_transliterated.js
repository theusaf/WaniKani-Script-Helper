function isIMEEquivalent(e, n) {
  return toHiragana(e) === toHiragana(addMissingNs(n), { IMEMode: !0 });
}
import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
import { toHiragana } from "wanakana";
const missingNRegEx = /[^n]n$/g,
  missingNReplacer = (e) => e.replace("n", "nn"),
  addMissingNs = (e) => e.replaceAll(missingNRegEx, missingNReplacer);
export class CheckTransliterated extends Plugin {
  get shouldEvaluate() {
    return !this.result.passed;
  }
  evaluate() {
    if (this.hasMatchedReading) {
      return {
        action: answerActionRetry,
        message: {
          type: answerException,
          text: "Oops, we want the meaning, not the reading.",
        },
      };
    }
    if (this.hasMatchedMeaning) {
      return {
        action: answerActionRetry,
        message: {
          type: answerException,
          text: "Oops, we want the reading, not the meaning.",
        },
      };
    }
    return null;
  }
  get hasMatchedReading() {
    return (
      "meaning" === this.questionType &&
      this.readings.some((e) => isIMEEquivalent(e, this.response))
    );
  }
  get hasMatchedMeaning() {
    const e = this.inputChars.toLowerCase(),
      n = this.item.meanings.concat(this.userSynonyms);
    return (
      "reading" === this.questionType && n.some((n) => e === n.toLowerCase())
    );
  }
}
