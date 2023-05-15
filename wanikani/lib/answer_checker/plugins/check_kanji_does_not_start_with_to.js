import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
export class CheckKanjiDoesNotStartWithTo extends Plugin {
  get shouldEvaluate() {
    return (
      !this.result.passed &&
      "meaning" === this.questionType &&
      "Kanji" === this.item.type &&
      this.response.toLowerCase().startsWith("to ")
    );
  }
  evaluate() {
    if (this.hasMatchedMeaning) {
      return {
        action: answerActionRetry,
        message: {
          type: answerException,
          text: 'This is a kanji, so it doesn\u2019t start with "to".',
        },
      };
    }
    return null;
  }
  get hasMatchedMeaning() {
    const t = this.response.substring(3).toLowerCase();
    return this.item.meanings.some((e) => t === e.toLowerCase());
  }
}
