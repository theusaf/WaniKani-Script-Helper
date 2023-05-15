import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
const niceEmphasis = {
    onyomi: "on\u2019yomi",
    kunyomi: "kun\u2019yomi",
    nanori: "nanori",
  },
  readingTypes = ["kunyomi", "onyomi", "nanori"];
export class CheckKanjiReadings extends Plugin {
  get shouldEvaluate() {
    return (
      !this.result.passed &&
      "reading" === this.questionType &&
      "Kanji" === this.item.type
    );
  }
  evaluate() {
    if (this.answeredAlternateReading) {
      const e = `WaniKani is looking for the ${
        niceEmphasis[this.item.primary_reading_type]
      } reading.`;
      return {
        action: answerActionRetry,
        message: { type: answerException, text: e },
      };
    }
    return null;
  }
  get answeredAlternateReading() {
    return (
      -1 !==
      readingTypes
        .filter((e) => e !== this.item.primary_reading_type)
        .reduce((e, n) => e.concat(this.item[n]), [])
        .indexOf(this.response)
    );
  }
}
