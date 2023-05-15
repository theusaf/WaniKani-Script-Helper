import { Plugin } from "lib/answer_checker/plugins/plugin";
import {
  answerActionRetry,
  answerException,
} from "lib/answer_checker/utils/constants";
import { stripOkurigana } from "wanakana";
export class CheckThatVerbStartsWithTo extends Plugin {
  get shouldEvaluate() {
    return (
      !this.result.passed &&
      "meaning" === this.questionType &&
      this.item.meanings &&
      this.item.meanings.some((t) => t.toLowerCase().startsWith("to ")) &&
      !this.response.toLowerCase().startsWith("to ")
    );
  }
  evaluate() {
    const t = this.findMatchedMeaning();
    if (t && this.item.characters) {
      const e = this.item.characters.replace(
        stripOkurigana(this.item.characters),
        ""
      );
      let s = `Almost! It ends in ${
        e[e.length - 1]
      }, so it\u2019s a verb. Please type \u201c${t}\u201d.`;
      return {
        action: answerActionRetry,
        message: { type: answerException, text: s },
      };
    }
    return null;
  }
  findMatchedMeaning() {
    return this.item.meanings.find((t) => {
      const e = t.toLowerCase();
      return (
        e.startsWith("to ") &&
        e.replace("to ", "") === this.response.toLowerCase()
      );
    });
  }
}
